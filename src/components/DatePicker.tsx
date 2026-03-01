"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import "react-day-picker/style.css";

export interface BookedRange {
  start: string;
  end: string;
}

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
  label: string;
  placeholder?: string;
  bookedRanges: BookedRange[];
  minDate?: Date;
  maxDate?: Date;
  error?: string;
}

function rangesToDisabledMatchers(ranges: BookedRange[]) {
  return ranges.map((r) => ({
    from: new Date(r.start + "T00:00:00"),
    to: new Date(r.end + "T00:00:00"),
  }));
}

function formatDisplayDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DatePicker({
  value,
  onChange,
  label,
  bookedRanges,
  minDate,
  maxDate,
  error,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDate = value ? new Date(value + "T00:00:00") : undefined;

  const disabledMatchers = [
    { before: minDate ?? new Date() },
    ...rangesToDisabledMatchers(bookedRanges),
    ...(maxDate ? [{ after: maxDate }] : []),
  ];

  function handleSelect(day: Date | undefined) {
    if (day) {
      const str = day.toISOString().slice(0, 10);
      onChange(str);
    } else {
      onChange(undefined);
    }
    setOpen(false);
  }

  const displayValue = value ? formatDisplayDate(value, "en") : "";

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-navy-light mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 bg-pearl border rounded-lg text-left text-sm transition-all duration-300 ${
          error
            ? "border-red-400 ring-2 ring-red-200"
            : open
              ? "border-ocean ring-2 ring-ocean/30"
              : "border-sand"
        }`}
      >
        <CalendarDays size={16} className="text-navy-light/60 shrink-0" />
        <span className={displayValue ? "text-navy" : "text-navy-light/50"}>
          {displayValue || label}
        </span>
      </button>

      {error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}

      {open && (
        <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-lg border border-sand/50 p-3 left-0 sm:left-auto sm:right-0">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={disabledMatchers}
            defaultMonth={selectedDate ?? minDate ?? new Date()}
            style={
              {
                "--rdp-accent-color": "#1B4965",
                "--rdp-accent-background-color": "#1B496520",
              } as React.CSSProperties
            }
            classNames={{
              disabled: "rdp-disabled opacity-30 line-through cursor-not-allowed",
              today: "font-bold",
            }}
          />
        </div>
      )}
    </div>
  );
}
