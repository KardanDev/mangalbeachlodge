import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";

const facilities = [
  { label: "Surfing Equipment", active: true },
  { label: "Private Pool" },
  { label: "Bar" },
  { label: "SCUBA Diving" },
  { label: "WiFi / Internet" },
  { label: "Spa & Sauna" },
  { label: "Restaurant" },
  { label: "Cleaning Services" },
  { label: "CCTV" },
  { label: "24 Hrs Security" },
];

export default function FacilitiesSection() {
  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ─── Left: Video Card ─── */}
        <div className="group relative overflow-hidden rounded-xl border border-border shadow-sm">
          <div className="relative aspect-4/3 w-full sm:aspect-16/10">
            {/* Placeholder poster image — swap with <video> later */}
            <img
              src="/availability-form-bg.png"
              alt="Aerial view of Mangal Beach Lodge"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent" />

            {/* Play button */}
            <Button
              variant="ghost"
              size="lg"
              className="absolute bottom-5 left-5 gap-3 border-0 bg-transparent px-0 hover:bg-transparent sm:bottom-7 sm:left-7"
              aria-label="Play tour video"
            >
              <span className="flex h-13 w-13 items-center justify-center rounded-full border-[1.5px] border-white/50 bg-white/12 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white/22">
                <Play className="ml-0.5 size-5 fill-white text-white" />
              </span>
              <span className="text-sm font-medium normal-case tracking-wide text-white/90">
                Play tour video
              </span>
            </Button>
          </div>

          {/* Thumbnail strip (desktop only) */}
          <div
            className="absolute right-5 bottom-5 hidden items-center gap-2 sm:right-7 sm:bottom-7 lg:flex"
            aria-hidden="true"
          >
            <div className="h-15 w-22 overflow-hidden rounded-lg border-2 border-white/65 shadow-lg">
              <img
                src="/mangal-entrance.png"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="h-15 w-22 overflow-hidden rounded-lg border-2 border-white/65 shadow-lg">
              <img
                src="/availability-form-bg.png"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* ─── Right: Copy + Badges ─── */}
        <div className="flex flex-col">
          {/* Overline */}
          <Badge variant="secondary" className="w-fit text-muted-foreground">
            * Offering the Most Complete Facilities
          </Badge>

          {/* Heading */}
          <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Offering the Most
            <br className="hidden sm:block" />
            Complete Facilities
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.938rem]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean
            commodo ligula eget dolor.
          </p>

          {/* Facility badge pills */}
          <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
            {facilities.map((f) => (
              <Badge
                key={f.label}
                variant={f.active ? "default" : "outline"}
                className={`rounded-full px-3.5 py-1.5 text-xs normal-case tracking-normal sm:px-4 sm:py-2 sm:text-[0.8125rem] ${f.active
                    ? "bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-ring"
                  }`}
              >
                {f.label}
              </Badge>
            ))}

            {/* "More" icon button */}
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              aria-label="Show more facilities"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
