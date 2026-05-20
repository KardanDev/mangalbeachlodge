import React from "react";
import { Badge } from "@/components/ui/badge";
import HoverVideoPlayer from "@/components/ui/hover-video-player";
import { Loader2, Play, Map, Fish, Sailboat, Sunset } from "lucide-react";
import { motion } from "framer-motion";

const getExperiences = (lang: "en" | "pt") => ({
  badge: lang === "pt" ? "Aventuras e Passeios" : "Adventures & Tours",
  title: lang === "pt" ? "Experiências Inesquecíveis" : "Unforgettable Experiences",
  desc: lang === "pt" ? "Explore o arquipélago, desfrute do oceano ou passeie a cavalo pelas dunas vermelhas." : "Explore the archipelago, enjoy the ocean, or ride horseback along the red dunes.",
  activities: [
    {
      id: "snorkeling",
      title: lang === "pt" ? "Passeios às Ilhas e Snorkeling" : "Island Trips & Snorkeling",
      desc: lang === "pt" ? "Visite as Ilhas Santa Carolina, Bazaruto, Benguerra, Magaruque ou Bangue. Mergulho com tartarugas e raias majestosas." : "Visit Santa Carolina, Bazaruto, Benguerra, Magaruque, or Bangue Islands. Snorkel with turtles and majestic manta rays.",
      icon: Fish,
      video: "/canoe_ride_video.mov",
      thumbnail: "/canoe_ride.jpeg",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-2",
    },
    {
      id: "horse_riding",
      title: lang === "pt" ? "Passeios a Cavalo" : "Horse Riding",
      desc: lang === "pt" ? "Liderado por guias locais experientes no interior ou na água junto à praia." : "Led by expert local guides inland or on the water by the beach.",
      icon: Map,
      image: "/horse_riding.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: "sunset",
      title: lang === "pt" ? "Dunas Vermelhas e Pôr do Sol" : "Red Dunes & Sunset",
      desc: lang === "pt" ? "Passeio pelas dunas vermelhas (inclui música ao vivo e bebidas) e passeio de moto-quatro." : "Sunset tour by road in the red dunes (including live music and beverages) and quad bike drives.",
      icon: Sunset,
      image: "/reserve_now_coast.jpeg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    }
  ]
});

export default function ExperiencesSection({ lang = "en" }: { lang?: "en" | "pt" }) {
  const content = getExperiences(lang);

  return (
    <section id="experiences" className="py-16 md:py-24 bg-neutral-50/50 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 text-muted-foreground">
            <Sailboat className="mr-1.5 h-3.5 w-3.5" />
            {content.badge}
          </Badge>
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {content.desc}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {content.activities.map((activity, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={activity.id}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-white dark:bg-neutral-900 shadow-sm ${activity.colSpan} ${activity.rowSpan}`}
            >
              {/* Media Background */}
              <div className="absolute inset-0 z-0">
                {activity.video ? (
                  <HoverVideoPlayer
                    videoSrc={activity.video}
                    thumbnailSrc={activity.thumbnail}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    preload="auto"
                    pausedOverlay={
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    }
                    loadingOverlay={
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    }
                  />
                ) : (
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 pointer-events-none">
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 backdrop-blur-md w-fit">
                  <activity.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-200 leading-relaxed max-w-lg">
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
