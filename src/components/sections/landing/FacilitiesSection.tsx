import { Badge } from "@/components/ui/badge";
import HoverVideoPlayer from "@/components/ui/hover-video-player";
import { Loader2, Play } from "lucide-react";

export default function FacilitiesSection({ lang = "en" }: { lang?: "en" | "pt" }) {
  const t = {
    en: {
      badge: "* Offering the Most Complete Facilities",
      title1: "Offering the Most",
      title2: "Complete Facilities",
      desc: "Experience world-class amenities designed to make your stay unforgettable, from oceanfront dining to relaxing by the pool.",
      facilities: [
        { label: "Bar & Restaurant", active: false },
        { label: "Swimming Pool", active: false },
        { label: "Cleaning Services", active: false },
        { label: "Breakfast Included", active: false },
        { label: "Wi-Fi Access", active: false },
      ]
    },
    pt: {
      badge: "* Oferecemos as Instalações Mais Completas",
      title1: "Oferecemos as Mais",
      title2: "Completas Instalações",
      desc: "Experimente comodidades de classe mundial projetadas para tornar a sua estadia inesquecível, desde refeições à beira-mar até relaxar na piscina.",
      facilities: [
        { label: "Bar & Restaurante", active: false },
        { label: "Piscina", active: false },
        { label: "Serviço de Limpeza", active: false },
        { label: "Pequeno-almoço Incluído", active: false },
        { label: "Acesso Wi-Fi", active: false },
      ]
    }
  }[lang];

  return (
    <section id="facilities" className="py-14 md:py-20 lg:py-24">
      <div className="grid z-0 items-center gap-8 md:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="group relative z-0 overflow-hidden rounded-xl border border-border shadow-sm">
          <HoverVideoPlayer
            videoSrc='https://res.cloudinary.com/dlsbn4qfy/video/upload/v1777919730/website-video_a446pl.mp4'
            thumbnailSrc='/couple-coast.jpg'
            pausedOverlay={
              <div className="bg-neutral-50/50 backdrop-blur-2xl rounded-full p-2">
                <Play className="size-10 fill-white text-white" />
              </div>
            }
            loadingOverlay={
              <Loader2 className="animate-spin" />
            }
            enableControls
            preload="auto"
            style={{
              width: "100%",
              maxWidth: "100vw",
              aspectRatio: "16/9",
            }}
          />
        </div>

        {/* ─── Right: Copy + Badges ─── */}
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit text-muted-foreground">
            {t.badge}
          </Badge>

          <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {t.title1}
            <br className="hidden sm:block" />
            {t.title2}
          </h2>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.938rem]">
            {t.desc}
          </p>

          <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
            {t.facilities.map((f) => (
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
          </div>
        </div>
      </div>
    </section>
  );
}
