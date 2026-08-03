import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Utensils,
  Store,
  Wine,
  ChefHat,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = React.useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-lg sm:aspect-video md:aspect-[4/3]">
      <motion.img
        key={images[current]}
        src={images[current]}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
      />

      <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  current === i
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const getDiningFeatures = (lang: "en" | "pt") => ({
  badge: lang === "pt" ? "Gastronomia & Comodidades" : "Dining & Amenities",
  title: lang === "pt" ? "Sinta-se em Casa" : "Feel Right at Home",
  desc:
    lang === "pt"
      ? "De marisco fresco a churrascos feitos por si, oferecemos várias formas de satisfazer o seu paladar e desfrutar da sua estadia."
      : "From fresh seafood to self-catered BBQs, we offer multiple ways to satisfy your palate and enjoy your stay.",
  features: [
    {
      id: "onsite-chef",
      title:
        lang === "pt" ? "Chef no Local & Marisco" : "Onsite Chef & Seafood",
      desc:
        lang === "pt"
          ? "O nosso chef no local atende a vários requisitos, incluindo eventos. Desfrute de marisco fresco pescado localmente, comida portuguesa e outra culinária local e internacional."
          : "Our onsite chef caters to various requirements, including functions. Enjoy tasty fresh seafood caught locally, Portuguese food, and other local and international cuisine.",
      icon: ChefHat,
      images: [
        "/IMG_2365.jpeg",
        "/dji_fly_20230429_100842_525_1682785036764_photo.jpeg",

        "/IMG_9042.jpeg",
        "/seafood_wine.jpeg",
      ],
      reverse: false,
    },
    {
      id: "bar-beverages",
      title: lang === "pt" ? "Bar & Coquetéis" : "Bar & Beverages",
      desc:
        lang === "pt"
          ? "O Lodge também inclui um bar e restaurante que se orgulha de oferecer um serviço da mais alta qualidade e uma variedade de bebidas, incluindo cocktails."
          : "The Lodge also includes a restaurant & bar, which prides itself on providing the highest quality service and a variety of beverages, including cocktails.",
      icon: Wine,
      images: ["/bar.jpeg", "/IMG_4569.jpeg"],
      reverse: true,
    },
  ],
});

export default function DiningSection({ lang = "en" }: { lang?: "en" | "pt" }) {
  const content = getDiningFeatures(lang);

  return (
    <section id="dining" className="overflow-hidden py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="text-muted-foreground mb-4">
            <Utensils className="mr-1.5 h-3.5 w-3.5" />
            {content.badge}
          </Badge>
          <h2 className="font-heading text-foreground text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
            {content.desc}
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {content.features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
                feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Image side */}
              <motion.div
                initial={{ opacity: 0, x: feature.reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative w-full md:w-1/2"
              >
                <div className="border-border relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-lg sm:aspect-video md:aspect-[4/3]">
                  <ImageCarousel images={feature.images} alt={feature.title} />
                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />
                </div>
                {/* Decorative blob/bg can be added here if needed */}
              </motion.div>

              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, x: feature.reverse ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex w-full flex-col justify-center md:w-1/2"
              >
                <div className="mb-6 inline-flex w-fit items-center justify-center rounded-2xl bg-amber-100 p-3.5 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
