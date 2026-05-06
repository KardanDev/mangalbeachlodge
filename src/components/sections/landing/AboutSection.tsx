import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wine, Waves, UtensilsCrossed } from "lucide-react";

/* ─── Gallery images for the scrolling strip ─── */
const galleryImages = [
  { src: "/bar.jpeg", alt: "Beach bar with thatched roof" },
  { src: "/couple-coast.jpg", alt: "Crystal clear Inhambane coast" },
  { src: "/poolside.jpg", alt: "Poolside cabanas at Mangal" },
  { src: "/seafood_wine.png", alt: "Fresh seafood and wine" },
  { src: "/sea.jpeg", alt: "Underwater marine life" },
  // duplicate for seamless infinite scroll
  { src: "/bar.jpeg", alt: "Beach bar with thatched roof" },
  { src: "/couple-coast.jpg", alt: "Crystal clear Inhambane coast" },
  { src: "/poolside.jpg", alt: "Poolside cabanas at Mangal" },
  { src: "/seafood_wine.png", alt: "Fresh seafood and wine" },
  { src: "/sea.jpeg", alt: "Underwater marine life" },
];

/* ─── Highlight cards ─── */
const getHighlights = (lang: "en" | "pt") => [
  {
    image: "/bar.jpeg",
    icon: Wine,
    title: lang === "pt" ? "Bar na Praia" : "Beach Bar",
    description: lang === "pt"
      ? "Tome uma bebida no nosso bar com teto de colmo, com cocktails artesanais, cerveja local gelada e vistas panorâmicas sobre o oceano."
      : "Sip sundowners at our thatched-roof bar with handcrafted cocktails, cold local beer, and panoramic ocean views.",
  },
  {
    image: "/poolside.jpg",
    icon: Waves,
    title: lang === "pt" ? "Refúgio à beira da piscina" : "Poolside Retreat",
    description: lang === "pt"
      ? "Relaxe à beira da piscina sob as cabanas drapeadas, cercado por jardins tropicais e pela brisa suave de Moçambique."
      : "Unwind by the pool under draped cabanas, surrounded by tropical gardens and the gentle Mozambican breeze.",
  },
  {
    image: "/seafood_wine.png",
    icon: UtensilsCrossed,
    title: lang === "pt" ? "Frutos do Mar e Jantar" : "Seafood & Dining",
    description: lang === "pt"
      ? "Saboreie frutos do mar recém-pescados combinados com vinhos finos no nosso restaurante ao ar livre, a poucos passos da costa."
      : "Savour freshly caught seafood paired with fine wines in our open-air restaurant, steps from the shore.",
  },
];

/* ─── Fade-up animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ════════════════════════════════════════════════════════════════════════ */
/*  ABOUT SECTION                                                         */
/* ════════════════════════════════════════════════════════════════════════ */
export default function AboutSection({ lang = "en" }: { lang?: "en" | "pt" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const highlights = getHighlights(lang);

  const t = {
    en: {
      badge: "About Us",
      title: "A coastal escape where the ocean",
      titleBreak: "meets authentic Mozambican warmth.",
      desc: "Nestled on the shores of Vilankulos, Inhambane — Mangal Beach Lodge blends rustic charm with modern comfort. From the turquoise waters of the Bazaruto Archipelago to our open-air kitchen, every detail is crafted for relaxation and discovery.",
      learnMore: "Learn more about us"
    },
    pt: {
      badge: "Sobre Nós",
      title: "Um refúgio costeiro onde o oceano",
      titleBreak: "encontra o autêntico calor moçambicano.",
      desc: "Situado nas margens de Vilankulos, Inhambane — o Mangal Beach Lodge combina charme rústico com conforto moderno. Das águas azul-turquesa do Arquipélago de Bazaruto à nossa cozinha ao ar livre, cada detalhe é criado para relaxamento e descoberta.",
      learnMore: "Saiba mais sobre nós"
    }
  }[lang];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28"
    >
      {/* ─── Header ─── */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0}
      >
        <Badge variant="secondary" className="mb-5 text-muted-foreground">
          {t.badge}
        </Badge>

        <h2 className="font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {t.title}
          <br className="hidden sm:block" />
          {t.titleBreak}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.938rem]">
          {t.desc}
        </p>

        <a
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-amber-600"
        >
          {t.learnMore}
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* ─── Infinite-scroll gallery strip ─── */}
      <div className="relative mt-14 overflow-hidden">
        {/* soft edge masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-neutral-50 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-neutral-50 to-transparent sm:w-24" />

        <div className="flex w-max animate-[scroll_35s_linear_infinite] gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="h-48 w-72 flex-shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Highlight cards ─── */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3 md:mt-20">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            className="group relative overflow-hidden rounded-2xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={i + 1}
          >
            {/* Background image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={h.image}
                alt={h.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content over image */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                <h.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{h.title}</h3>
              <p className="text-sm leading-relaxed text-white/80">
                {h.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
