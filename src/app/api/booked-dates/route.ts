import { NextResponse } from "next/server";

export interface BookedRange {
  start: string;
  end: string;
}

const ICAL_ENV_KEYS = [
  "ICAL_AIRBNB_URL",
  "ICAL_BOOKING_URL",
  "ICAL_VRBO_URL",
] as const;

function parseIcalDate(value: string): string | null {
  const clean = value.replace(/[^\d]/g, "");
  if (clean.length < 8) return null;
  return `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
}

function parseVEvents(text: string): BookedRange[] {
  const ranges: BookedRange[] = [];
  const events = text.split("BEGIN:VEVENT");

  for (let i = 1; i < events.length; i++) {
    const block = events[i].split("END:VEVENT")[0];

    let dtstart: string | null = null;
    let dtend: string | null = null;

    for (const line of block.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.startsWith("DTSTART")) {
        const val = trimmed.split(":").pop();
        if (val) dtstart = parseIcalDate(val);
      } else if (trimmed.startsWith("DTEND")) {
        const val = trimmed.split(":").pop();
        if (val) dtend = parseIcalDate(val);
      }
    }

    if (dtstart && dtend) {
      const lastNight = new Date(dtend + "T00:00:00");
      lastNight.setDate(lastNight.getDate() - 1);
      ranges.push({ start: dtstart, end: lastNight.toISOString().slice(0, 10) });
    }
  }

  return ranges;
}

function mergeRanges(ranges: BookedRange[]): BookedRange[] {
  if (ranges.length === 0) return [];

  const sorted = ranges
    .slice()
    .sort((a, b) => a.start.localeCompare(b.start));

  const merged: BookedRange[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    if (current.start <= last.end) {
      last.end = current.end > last.end ? current.end : last.end;
    } else {
      merged.push(current);
    }
  }

  return merged;
}

export async function GET() {
  const urls = ICAL_ENV_KEYS.map((key) => process.env[key]).filter(
    (url): url is string => Boolean(url)
  );

  if (urls.length === 0) {
    return NextResponse.json([], {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  }

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
  );

  const allRanges: BookedRange[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      allRanges.push(...parseVEvents(result.value));
    }
  }

  const merged = mergeRanges(allRanges);

  return NextResponse.json(merged, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
