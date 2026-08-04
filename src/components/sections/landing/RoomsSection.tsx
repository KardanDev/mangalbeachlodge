import React, { useState, useCallback, useEffect } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Coffee,
  Users,
  Waves,
  Sparkles,
  Home,
  UtensilsCrossed,
  ShieldCheck,
  Wifi,
  Droplets,
  Wind,
  Snowflake,
  Bed,
} from "lucide-react";

/* ─── Room Data ─── */
const getRooms = (lang: "en" | "pt") => [
  {
    id: "standard",
    name: lang === "pt" ? "Quarto Standard" : "Standard Room",
    subtitle: "Quartos",
    description:
      lang === "pt"
        ? "Um quarto aconchegante e bem equipado com teto de palha e decoração artesanal — o refúgio perfeito para casais ou viajantes individuais."
        : "A cozy, beautifully appointed room with a thatched roof and artisan décor — the perfect retreat for couples or solo travellers seeking comfort by the coast.",
    price: "6,500",
    priceSuffix: "MZN / night",
    priceNote:
      lang === "pt"
        ? "Preços por noite para 2 hóspedes"
        : "Prices per night for 2 guests",
    heroImage: "/standard_room/IMG_1512.png",
    gallery: [
      "/standard_room/IMG_1512.png",
      "/standard_room/IMG_1912.jpeg",
      "/standard_room/IMG_2342.jpeg",
      "/standard_room/IMG_2344.jpeg",
      "/standard_room/IMG_4081.jpeg",
      "/standard_room/321CD89F-4052-456B-B337-C54A2CA68C76.jpeg",
      "/standard_room/IMG_4093.jpeg",
      "/standard_room/IMG_4079.jpeg",
      "/standard_room/IMG_4080.jpeg",
    ],
    benefits: [
      {
        icon: BedDouble,
        label: lang === "pt" ? "Cama de casal" : "Double bed",
      },
      {
        icon: Users,
        label: lang === "pt" ? "Até 2 hóspedes" : "Up to 2 guests",
      },
      {
        icon: Waves,
        label: lang === "pt" ? "Vista para o jardim" : "Garden view",
      },
      { icon: Wifi, label: lang === "pt" ? "Wi-Fi Gratuito" : "Free Wi-Fi" },
      { icon: Droplets, label: lang === "pt" ? "Água Quente" : "Hot Water" },
      {
        icon: Wind,
        label: lang === "pt" ? "Ar Condicionado" : "Air Conditioning",
      },
      {
        icon: Snowflake,
        label: lang === "pt" ? "Geleirinha de bar" : "Mini-fridge",
      },
    ],
    pricing: [
      {
        season: lang === "pt" ? "Baixa Temporada" : "Low Season",
        price: "6,500",
      },
      {
        season: lang === "pt" ? "Alta Temporada" : "High Season",
        price: "8,500",
      },
      {
        season: lang === "pt" ? "Época Festiva" : "Festive Season",
        price: "12,500",
      },
    ],
    extras: [
      lang === "pt"
        ? "Cama Extra Adulto: 2,500 MZN"
        : "Extra Adult Bed: 2,500 MZN",
      lang === "pt"
        ? "Cama Extra Criança (5–12 anos): 1,500 MZN"
        : "Extra Child Bed (5–12 yrs): 1,500 MZN",
      lang === "pt"
        ? "Pequeno-almoço incluído nestes preços"
        : "Breakfast included in these prices",
    ],
    accentFrom: "from-amber-500/80",
    accentTo: "to-orange-600/80",
    badge: lang === "pt" ? "Mais Popular" : "Most Popular",
  },
  {
    id: "house",
    name: lang === "pt" ? "Casa Privada" : "Private House",
    subtitle: "Casas",
    description:
      lang === "pt"
        ? "Uma casa espaçosa com vários quartos, perfeita para famílias ou grupos que desejam uma experiência íntima com total privacidade."
        : "A spacious private house with multiple bedrooms, perfect for families or groups wanting an intimate lodge experience with full privacy.",
    price: "13,000",
    priceSuffix: "MZN / night",
    priceNote:
      lang === "pt"
        ? "Acomoda 4 em privado, 2 em beliche"
        : "Sleeps up to 6 (4 in private rooms, 2 in bunkbed)",
    heroImage: "/private_house/exterior.jpg",
    gallery: [
      "/private_house/exterior.jpg",
      "/private_house/exterior2.png",
      "/standard_room/IMG_4329.jpeg",
      "/standard_room/IMG_4333.jpeg",
      "/standard_room/IMG_4351.jpeg",
      "/shared_room/IMG_4337.jpeg",
      "/shared_room/75EDE070-7165-41DC-ACA4-B95484D8A54C.png",
      "/shared_room/IMG_0366.jpeg",
      "/shared_room/IMG_0368.jpeg",
      "/shared_room/IMG_0375.jpeg",
      "/shared_room/IMG_0386.jpeg",
      "/shared_room/IMG_0387.jpeg",
      "/shared_room/IMG_0390.jpeg",
      "/shared_room/IMG_3589.jpeg",
      "/shared_room/IMG_7245.jpeg",
      "/shared_room/IMG_9045.jpeg",
      "/shared_room/IMG_9046.jpeg",
      "/shared_room/IMG_9051.jpeg",
      "/shared_room/IMG_9054.jpeg",
      "/shared_room/IMG_9055.jpeg",
      "/shared_room/IMG_9083.jpeg",
      "/shared_room/IMG_9088.jpeg",
    ],
    benefits: [
      {
        icon: Home,
        label: lang === "pt" ? "Casa inteira" : "Full private house",
      },
      {
        icon: Users,
        label: lang === "pt" ? "Até 6 hóspedes" : "Up to 6 guests",
      },
      {
        icon: UtensilsCrossed,
        label: lang === "pt" ? "Cozinha equipada" : "Self-catering kitchen",
      },
      { icon: Wifi, label: lang === "pt" ? "Wi-Fi Gratuito" : "Free Wi-Fi" },
      { icon: Droplets, label: lang === "pt" ? "Água Quente" : "Hot Water" },
      {
        icon: Wind,
        label: lang === "pt" ? "Ar Condicionado" : "Air Conditioning",
      },
      { icon: Bed, label: lang === "pt" ? "Cama beliche" : "Bunk bed" },
    ],
    pricing: [
      {
        season: lang === "pt" ? "Baixa Temporada" : "Low Season",
        price: "13,000",
      },
      {
        season: lang === "pt" ? "Alta Temporada" : "High Season",
        price: "15,000",
      },
      {
        season: lang === "pt" ? "Época Festiva" : "Festive Season",
        price: "25,000",
      },
    ],
    extras: [
      lang === "pt" ? "Refeições não incluídas" : "Meals not included",
      lang === "pt"
        ? "Acomoda 4 em quartos privados"
        : "Type 2 house — sleeps 4 in private rooms",
    ],
    accentFrom: "from-emerald-600/80",
    accentTo: "to-teal-700/80",
    badge: lang === "pt" ? "Melhor para Grupos" : "Best for Groups",
  },
];

/* ─── How It Works Steps ─── */
const getSteps = (lang: "en" | "pt") => [
  {
    number: "01",
    title: lang === "pt" ? "Escolha o seu quarto" : "Choose your room",
    desc:
      lang === "pt"
        ? "Navegue pelos nossos Quartos Standard ou Casas Privadas e escolha a melhor opção."
        : "Browse our Standard Rooms or Private Houses and pick the best fit.",
  },
  {
    number: "02",
    title: lang === "pt" ? "Faça uma reserva" : "Send a reservation",
    desc:
      lang === "pt"
        ? "Preencha o formulário de reserva ou envie-nos um email com as datas pretendidas."
        : "Fill out the enquiry form or email us with your preferred dates.",
  },
  {
    number: "03",
    title: lang === "pt" ? "Aproveite a sua estadia" : "Enjoy your stay",
    desc:
      lang === "pt"
        ? "Chegue através do nosso serviço de transfer e deixe a magia começar."
        : "Arrive via our transfer service and let the beach-lodge magic begin.",
  },
];

/* ════════════════════════════════════════════════════════════════════════ */
/*  CAROUSEL MODAL                                                        */
/* ════════════════════════════════════════════════════════════════════════ */
/** Maps RoomsSection room IDs → MobileReservationEmail room types */
const ROOM_TYPE_MAP: Record<string, string> = {
  standard: "standard",
  house: "villa",
};

interface ModalProps {
  room: ReturnType<typeof getRooms>[0];
  onClose: () => void;
  lang: "en" | "pt";
}

function RoomModal({ room, onClose, lang }: ModalProps) {
  const handleReserve = useCallback(() => {
    // 1. Close the gallery modal
    onClose();
    // 2. After a short delay (let exit animation finish), open the reservation form
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("open-reservation", {
          detail: { roomType: ROOM_TYPE_MAP[room.id] ?? "standard" },
        }),
      );
    }, 350);
  }, [onClose, room.id]);
  const [current, setCurrent] = useState(0);
  const total = room.gallery.length;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* panel */}
      <motion.div
        className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ─── LEFT: Carousel ─── */}
        <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-neutral-900 md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.img
              key={room.gallery[current]}
              src={room.gallery[current]}
              alt={`${room.name} photo ${current + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>

          {/* arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {room.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Details ─── */}
        <div className="flex w-full flex-col gap-5 overflow-y-auto p-6 md:w-1/2 md:p-8">
          <div>
            <Badge
              variant="secondary"
              className="text-muted-foreground mb-2 text-xs"
            >
              {room.badge}
            </Badge>
            <h3 className="text-foreground text-2xl font-semibold tracking-tight">
              {room.name}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {room.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3">
            {room.benefits.map((b) => (
              <div
                key={b.label}
                className="border-border text-foreground flex items-center gap-2 rounded-xl border bg-neutral-50 px-3 py-2.5 text-sm"
              >
                <b.icon className="h-4 w-4 shrink-0 text-amber-600" />
                {b.label}
              </div>
            ))}
          </div>

          {/* Pricing table */}
          <div className="border-border rounded-xl border bg-neutral-50 p-4">
            <h4 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              {lang === "pt"
                ? "Preços Sazonais (MZN)"
                : "Seasonal Pricing (MZN)"}
            </h4>
            <div className="space-y-2 text-sm">
              {room.pricing.map((p) => (
                <div
                  key={p.season}
                  className="flex items-center justify-between"
                >
                  <span className="text-foreground">{p.season}</span>
                  <span className="text-foreground font-medium">
                    {"price" in p ? p.price : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Extras */}
          <ul className="text-muted-foreground space-y-1 text-xs">
            {room.extras.map((e) => (
              <li key={e} className="flex items-start gap-1.5">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                {e}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleReserve}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.97]"
          >
            {lang === "pt" ? "Reservar Este Quarto" : "Reserve This Room"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  ROOM CARD                                                             */
/* ════════════════════════════════════════════════════════════════════════ */

function RoomCard({
  room,
  onOpen,
  lang,
}: {
  room: ReturnType<typeof getRooms>[0];
  onOpen: () => void;
  lang: "en" | "pt";
}) {
  return (
    <CardContainer containerClassName="py-8 md:py-10">
      <CardBody className="group/card border-border relative h-auto w-full max-w-[520px] rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-xl dark:bg-neutral-900">
        {/* Image */}
        <CardItem translateZ={50} className="w-full">
          <div
            className="relative cursor-pointer overflow-hidden rounded-xl"
            onClick={onOpen}
          >
            <img
              src={room.heroImage}
              alt={room.name}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${room.accentFrom} ${room.accentTo} opacity-0 transition-opacity duration-300 group-hover/card:opacity-40`}
            />
            {/* badge */}
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-neutral-800 shadow backdrop-blur-md">
              {room.badge}
            </span>
            {/* click hint */}
            <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover/card:opacity-100">
              <Sparkles className="h-3.5 w-3.5" />
              {lang === "pt" ? "Ver Galeria" : "View Gallery"}
            </span>
          </div>
        </CardItem>

        {/* Title + price */}
        <CardItem translateZ={30} className="mt-5 w-full">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-foreground text-lg font-semibold tracking-tight">
                {room.name}
              </h3>
              <p className="text-muted-foreground text-xs">{room.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-foreground text-lg font-bold">{room.price}</p>
              <p className="text-muted-foreground text-[0.65rem]">
                {room.priceSuffix}
              </p>
            </div>
          </div>
        </CardItem>

        {/* Description */}
        <CardItem translateZ={20} className="mt-3 w-full">
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {room.description}
          </p>
        </CardItem>

        {/* Benefits pills */}
        <CardItem translateZ={15} className="mt-4 w-full">
          <div className="flex flex-wrap gap-2">
            {room.benefits.map((b) => (
              <span
                key={b.label}
                className="border-border text-foreground inline-flex items-center gap-1.5 rounded-full border bg-neutral-50 px-3 py-1.5 text-xs dark:bg-neutral-800"
              >
                <b.icon className="h-3.5 w-3.5 text-amber-600" />
                {b.label}
              </span>
            ))}
          </div>
        </CardItem>

        {/* CTA */}
        <CardItem translateZ={40} className="mt-5 w-full">
          <button
            onClick={onOpen}
            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.98]"
          >
            {lang === "pt" ? "Explorar & Reservar →" : "Explore & Book →"}
          </button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  SECTION                                                               */
/* ════════════════════════════════════════════════════════════════════════ */

export default function RoomsSection({ lang = "en" }: { lang?: "en" | "pt" }) {
  const rooms = getRooms(lang);
  const steps = getSteps(lang);
  const [openRoom, setOpenRoom] = useState<
    ReturnType<typeof getRooms>[0] | null
  >(null);

  const t = {
    en: {
      badge: "Our Accommodations",
      title: "Choose Your Perfect Stay",
      desc: "From intimate rooms to spacious private houses — find the ideal getaway at Mangal Beach Lodge, right on the coast of Inhambane.",
      howItWorks: "How It Works",
      transferNote:
        "Transfer service available at 2,500 MZN per trip (max 4 guests). All prices in Mozambican Metical (MZN) per night.",
    },
    pt: {
      badge: "Nossas Acomodações",
      title: "Escolha a Sua Estadia Perfeita",
      desc: "De quartos íntimos a casas privadas espaçosas — encontre o refúgio ideal no Mangal Beach Lodge, mesmo na costa de Inhambane.",
      howItWorks: "Como Funciona",
      transferNote:
        "Serviço de transfer disponível por 2.500 MZN por viagem (máx. 4 pessoas). Todos os preços em Metical Moçambicano (MZN) por noite.",
    },
  }[lang];

  return (
    <section id="rooms" className="py-16 md:py-24">
      {/* ─── Header ─── */}
      <div className="mx-auto mb-4 max-w-2xl text-center">
        <Badge variant="secondary" className="text-muted-foreground mb-4">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          {t.badge}
        </Badge>
        <h2 className="font-heading text-foreground text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t.title}
        </h2>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
          {t.desc}
        </p>
      </div>

      {/* ─── Cards grid ─── */}
      <div className="mx-auto grid max-w-5xl gap-2 md:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onOpen={() => setOpenRoom(room)}
            lang={lang}
          />
        ))}
      </div>

      {/* ─── How It Works ─── */}
      <div className="mx-auto mt-16 max-w-4xl">
        <h3 className="text-foreground mb-8 text-center text-lg font-semibold tracking-tight sm:text-xl">
          {t.howItWorks}
        </h3>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.number}
              className="group border-border relative rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg dark:bg-neutral-900"
            >
              <span className="font-heading mb-3 block text-3xl font-bold text-amber-500/30">
                {s.number}
              </span>
              <h4 className="text-foreground text-sm font-semibold">
                {s.title}
              </h4>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                {s.desc}
              </p>
              {/* decorative line */}
              <div className="absolute right-6 -bottom-px left-6 h-[2px] rounded-full bg-amber-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Transfer note ─── */}
      <p className="text-muted-foreground mx-auto mt-10 max-w-md text-center text-xs">
        {t.transferNote}
      </p>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {openRoom && (
          <RoomModal
            room={openRoom}
            onClose={() => setOpenRoom(null)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
