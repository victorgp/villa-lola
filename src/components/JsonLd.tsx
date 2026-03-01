import { SITE_URL, getOgImageUrl } from "@/lib/seo";

export default function JsonLd({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Villa Lola",
    description:
      "A charming Menorcan style coastal villa in Cap d'Artrutx, Menorca with sea views, private pool, and stunning sunsets.",
    url: `${SITE_URL}/${locale}`,
    image: getOgImageUrl(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cap d'Artrutx, Menorca",
      addressRegion: "Balearic Islands",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9242,
      longitude: 3.8255,
    },
    numberOfRooms: 3,
    petsAllowed: false,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Garden", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: "Terrace", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fully Equipped Kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    ],
    containsPlace: {
      "@type": "Accommodation",
      "@id": `${SITE_URL}/#accommodation`,
      name: "Villa Lola",
      description:
        "3-bedroom Menorcan style villa accommodating up to 6 guests",
      bed: [
        { "@type": "BedDetails", numberOfBeds: 3, typeOfBed: "Double" },
      ],
      numberOfBathroomsTotal: 2,
      numberOfBedrooms: 3,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: 6,
      },
      floorSize: {
        "@type": "QuantitativeValue",
        unitCode: "MTK",
      },
    },
    tourBookingPage: `${SITE_URL}/${locale}#booking`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
