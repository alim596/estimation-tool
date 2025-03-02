import PlatformCard from "./PlatformCard";

interface PlatformsSectionProps {
  selectedPlatforms: string[];
  onTogglePlatform: (platformName: string) => void;
}

export default function PlatformsSection({
  selectedPlatforms,
  onTogglePlatform
}: PlatformsSectionProps) {
  return (
    <section>
      <h2 className="text-[#020833] text-3xl font-semibold my-8">
        What platforms do you need?
      </h2>

      <div className="grid grid-cols-4 gap-4 mt-6 mb-24">
        {/* Web */}
        <PlatformCard
          title="Web"
          description="A web app"
          iconLight="/icons/web-light.svg"
          iconDark="/icons/web-dark.svg"
          // Card is selected if "Web" is in the array
          selected={selectedPlatforms.includes("Web")}
          onSelect={() => onTogglePlatform("Web")}
        />

        {/* Apple */}
        <PlatformCard
          title="Apple"
          description="An iPhone / iPad app"
          iconLight="/icons/apple-light.svg"
          iconDark="/icons/apple-dark.svg"
          selected={selectedPlatforms.includes("Apple")}
          onSelect={() => onTogglePlatform("Apple")}
        />

        {/* Android */}
        <PlatformCard
          title="Android"
          description="An Android Phone / Tablet app"
          iconLight="/icons/android-light.svg"
          iconDark="/icons/android-dark.svg"
          selected={selectedPlatforms.includes("Android")}
          onSelect={() => onTogglePlatform("Android")}
        />

        {/* Mobile */}
        <PlatformCard
          title="Mobile"
          description="An iOS and an Android App"
          iconLight="/icons/mobile-light.svg"
          iconDark="/icons/mobile-dark.svg"
          selected={selectedPlatforms.includes("Mobile")}
          onSelect={() => onTogglePlatform("Mobile")}
        />
      </div>
    </section>
  );
}
