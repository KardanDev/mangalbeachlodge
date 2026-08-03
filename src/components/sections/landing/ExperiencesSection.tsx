import React from "react";
import { Badge } from "@/components/ui/badge";
import HoverVideoPlayer from "@/components/ui/hover-video-player";
import { Loader2, Play, Map, Fish, Sailboat, Sunset } from "lucide-react";
import { motion } from "framer-motion";

const getExperiences = (lang: "en" | "pt") => ({
  badge: lang === "pt" ? "Aventuras e Passeios" : "Adventures & Tours",
  title:
    lang === "pt" ? "Experiências Inesquecíveis" : "Unforgettable Experiences",
  desc:
    lang === "pt"
      ? "Explore o arquipélago, desfrute do oceano ou passeie a cavalo pelas dunas vermelhas."
      : "Explore the archipelago, enjoy the ocean, or ride horseback along the red dunes.",
  activities: [
    {
      id: "canoe",
      title:
        lang === "pt"
          ? "Passeio de Canoa no Rio Govuro"
          : "Govuro River Canoe Tour",
      desc:
        lang === "pt"
          ? "Explore as águas calmas do Rio Govuro de canoa, rodeado por zonas húmidas, aves e paisagens tranquilas."
          : "Explore the tranquil Govuro River by canoe, surrounded by wetlands, birdlife, and beautiful scenery.",
      icon: Sailboat,
      video: "/canoe_ride_video.mov",
      thumbnail: "/canoe_ride.jpeg",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-2",
    },
    {
      id: "horse_riding",
      title: lang === "pt" ? "Passeios a Cavalo" : "Horse Riding",
      desc:
        lang === "pt"
          ? "Passeios guiados por praias, dunas e trilhos naturais."
          : "Guided rides along beaches, dunes, and scenic nature trails.",
      icon: Map,
      image: "/horse_riding.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: "island_trips",
      title: lang === "pt" ? "Passeios às Ilhas" : "Island Trips",
      desc:
        lang === "pt"
          ? "Descubra as ilhas de Santa Carolina, Bazaruto, Benguerra, Magaruque e Bangue com praias paradisíacas e águas cristalinas."
          : "Discover Santa Carolina, Bazaruto, Benguerra, Magaruque, and Bangue Islands, known for pristine beaches and crystal-clear waters.",
      icon: Sunset,
      image: "/reserve_now_coast.jpeg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
  ],
});

export default function ExperiencesSection({
  lang = "en",
}: {
  lang?: "en" | "pt";
}) {
  const content = getExperiences(lang);

  return (
    <section
      id="experiences"
      className="bg-neutral-50/50 py-16 md:py-24 dark:bg-neutral-900/50"
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="text-muted-foreground mb-4">
            <Sailboat className="mr-1.5 h-3.5 w-3.5" />
            {content.badge}
          </Badge>
          <h2 className="font-heading text-foreground text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
            {content.desc}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {content.activities.map((activity, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={activity.id}
              className={`group border-border relative overflow-hidden rounded-2xl border bg-white shadow-sm md:rounded-3xl dark:bg-neutral-900 ${activity.colSpan} ${activity.rowSpan}`}
            >
              {/* Media Background */}
              <div className="absolute inset-0 z-0">
                {activity.video ? (
                  <HoverVideoPlayer
                    videoSrc={activity.video}
                    thumbnailSrc={activity.thumbnail}
                    className="h-full w-full object-cover"
                    loop
                    muted
                    preload="auto"
                    pausedOverlay={
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-500 group-hover:bg-transparent">
                        <div className="rounded-full bg-white/20 p-3 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                          <Play className="h-8 w-8 fill-white text-white" />
                        </div>
                      </div>
                    }
                    loadingOverlay={
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    }
                  />
                ) : (
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />
              </div>

              {/* Content Overlay */}
              <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <div className="mb-3 inline-flex w-fit items-center justify-center rounded-full bg-white/20 p-2.5 backdrop-blur-md">
                  <activity.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {activity.title}
                </h3>
                <p className="max-w-lg text-sm leading-relaxed text-neutral-200 md:text-base">
                  {activity.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
