"use client";

import {
  useCallback,
  useId,
  useMemo,
  useState,
  useEffect as useEffectReact,
} from "react";
import { differenceInCalendarDays, format, formatDate } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
  useExpandableScreen,
} from "@/components/ui/expandable-screen";
// import BrandLogo from "@/components/BrandLogo.astro"
import { cn } from "@/lib/utils";

type RoomType = "standard" | "villa";
type SeasonKey = "low" | "high" | "festive";

const EXTRA_BED_RATES = {
  adult: 2500,
  child: 1500,
};

const SEASON_CONFIG: Record<
  SeasonKey,
  {
    months: number[];
    roomRates: Record<RoomType, number>;
  }
> = {
  low: {
    months: [2, 3, 5, 6, 7, 9, 10, 11],
    roomRates: {
      standard: 6500,
      villa: 13000,
    },
  },
  high: {
    months: [1, 4, 8, 12],
    roomRates: {
      standard: 8500,
      villa: 15000,
    },
  },
  festive: {
    months: [],
    roomRates: {
      standard: 12500,
      villa: 25000,
    },
  },
};

function getSeasonForDate(date: Date): SeasonKey {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 12 && day >= 22) || (month === 1 && day <= 3)) {
    return "festive";
  }

  if (SEASON_CONFIG.low.months.includes(month)) {
    return "low";
  }

  return "high";
}

type RoomSelection = {
  type: RoomType;
  extraAdults: number;
  extraChildren: number;
};

function formatMzn(value: number) {
  return `${new Intl.NumberFormat("pt-MZ").format(value)} MZN`;
}

function MobileReservationEmail({ lang }: { lang: "en" | "pt" }) {
  const t = {
    en: {
      reserveNow: "Reserve now",
      heroTitle: "Your coastal escape",
      heroSubtitle: "Mangal Beach Lodge",
      title: "Reserve your stay",
      subtitle: "Request availability based on the information below.",
      checkIn: "Check-in",
      checkInPlaceholder: "Select check-in",
      checkOut: "Check-out",
      checkOutPlaceholder: "Select check-out",
      adults: "Adults",
      children: "Children",
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      observation: "Observation",
      observationPlaceholder: "Observation",
      staySummary: "Stay summary",
      breakfastIncluded: "Breakfast included",
      rooms: "Rooms",
      addRoom: "+ Add room",
      room: "Room",
      remove: "Remove",
      extraAdults: "Extra adults",
      extraChildren: "Extra children",
      extraAdultsPrice: "2.500 MZN / adult",
      extraChildrenPrice: "1.500 MZN / child",
      capacityWarning:
        "Capacity is {totalCapacity} guests, but you selected {guestCount}. Add another room.",
      capacityInfo: "Total capacity:",
      guests: "guests",
      summary: "Summary",
      guestsLabel: "Guests",
      nights: "Nights",
      nightlyTotal: "Nightly total",
      totalStay: "Total stay",
      requestSent: "Request sent successfully. We’ll get back to you shortly.",
      sending: "Sending...",
      submit: "Send availability request",
      adultsSummary: "adults",
      childrenSummary: "children",
      roomStandardLabel: "Standard Room",
      roomStandardDescription: "Double bed · breakfast included",
      roomStandardLayout: "Sleeps 2",
      roomVillaLabel: "Villa",
      roomVillaDescription:
        "Type 2 house · self catering · breakfast included on request flow",
      roomVillaLayout: "Sleeps 6 · 4 in rooms + 2 in bunk near common area",
    },
    pt: {
      reserveNow: "Reservar agora",
      heroTitle: "A sua escapadinha costeira",
      heroSubtitle: "Mangal Beach Lodge",
      title: "Reserve a sua estadia",
      subtitle: "Solicite disponibilidade com base nas informações abaixo.",
      checkIn: "Check-in",
      checkInPlaceholder: "Selecione o check-in",
      checkOut: "Check-out",
      checkOutPlaceholder: "Selecione o check-out",
      adults: "Adultos",
      children: "Crianças",
      fullName: "Nome completo",
      email: "Email",
      phone: "Telefone",
      observation: "Observação",
      observationPlaceholder: "Observação",
      staySummary: "Resumo da estadia",
      breakfastIncluded: "Pequeno-almoço incluído",
      rooms: "Quartos",
      addRoom: "+ Adicionar quarto",
      room: "Quarto",
      remove: "Remover",
      extraAdults: "Adultos extra",
      extraChildren: "Crianças extra",
      extraAdultsPrice: "2.500 MZN / adulto",
      extraChildrenPrice: "1.500 MZN / criança",
      capacityWarning:
        "A capacidade é de {totalCapacity} hóspedes, mas selecionou {guestCount}. Adicione outro quarto.",
      capacityInfo: "Capacidade total:",
      guests: "hóspedes",
      summary: "Resumo",
      guestsLabel: "Hóspedes",
      nights: "Noites",
      nightlyTotal: "Total por noite",
      totalStay: "Total da estadia",
      requestSent:
        "Pedido enviado com sucesso. Entraremos em contacto em breve.",
      sending: "A enviar...",
      submit: "Enviar pedido de disponibilidade",
      adultsSummary: "adultos",
      childrenSummary: "crianças",
      roomStandardLabel: "Quarto Standard",
      roomStandardDescription: "Cama de casal · pequeno-almoço incluído",
      roomStandardLayout: "Acomoda 2",
      roomVillaLabel: "Villa",
      roomVillaDescription:
        "Casa tipo 2 · self catering · pequeno-almoço incluído mediante pedido",
      roomVillaLayout:
        "Acomoda 6 · 4 nos quartos + 2 em beliche perto da área comum",
    },
  }[lang];

  const ROOM_CONFIG: Record<
    RoomType,
    {
      label: string;
      capacity: number;
      description: string;
      layout: string;
    }
  > = {
    standard: {
      label: t.roomStandardLabel,
      capacity: 2,
      description: t.roomStandardDescription,
      layout: t.roomStandardLayout,
    },
    villa: {
      label: t.roomVillaLabel,
      capacity: 6,
      description: t.roomVillaDescription,
      layout: t.roomVillaLayout,
    },
  };

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const specialRequestsId = useId();

  const [roomSelections, setRoomSelections] = useState<RoomSelection[]>([
    { type: "standard", extraAdults: 0, extraChildren: 0 },
  ]);

  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [checkInDate, setCheckInDate] = useState<Date | undefined>();

  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [roomType, setRoomType] = useState<RoomType>("standard");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const adultsCount = Number(adults);
  const childrenCount = Number(children);
  const guestCount = adultsCount + childrenCount;

  const activeDate = checkInDate ?? new Date();
  const activeSeasonKey = getSeasonForDate(activeDate);
  const room = ROOM_CONFIG[roomType];
  const nightlyRate = SEASON_CONFIG[activeSeasonKey].roomRates[roomType];

  const nights =
    checkInDate && checkOutDate
      ? Math.max(1, differenceInCalendarDays(checkOutDate, checkInDate))
      : 1;

  const suggestedRoomType: RoomType = guestCount <= 2 ? "standard" : "villa";
  const suggestedRoomLabel = ROOM_CONFIG[suggestedRoomType].label;
  const suggestedCapacity = ROOM_CONFIG[suggestedRoomType].capacity;

  // const extraAdultBeds =
  //     roomType === "standard" ? Math.max(adultsCount - room.capacity, 0) : 0

  // const extraChildBeds = roomType === "standard" ? childrenCount : 0

  // const extraBedCost =
  //     extraAdultBeds * EXTRA_BED_RATES.adult +
  //     extraChildBeds * EXTRA_BED_RATES.child

  // const estimatedTotal = nightlyRate * nights + extraBedCost

  const roomFitsSelectedType = guestCount <= room.capacity;
  const roomFitsSuggestedType = guestCount <= suggestedCapacity;

  const roomRequestCount = useMemo(() => {
    if (guestCount <= room.capacity) return 1;
    return Math.ceil(guestCount / room.capacity);
  }, [guestCount, room.capacity]);

  // const totalCapacity = roomSelections.reduce(
  //     (acc, type) => acc + ROOM_CONFIG[type].capacity,
  //     0
  // )

  // const needsMoreRooms = guestCount > totalCapacity
  const totalCapacity = roomSelections.reduce((acc, room) => {
    const base = ROOM_CONFIG[room.type].capacity;

    if (room.type === "standard") {
      return acc + base + room.extraAdults + room.extraChildren;
    }

    return acc + base;
  }, 0);
  const needsMoreRooms = guestCount > totalCapacity;

  // auto-expand room selectors if needed
  useMemo(() => {
    if (!needsMoreRooms) return;

    setRoomSelections((prev) => {
      const next = [...prev];
      let capacity = totalCapacity;

      while (capacity < guestCount) {
        next.push({
          type: "standard",
          extraAdults: 0,
          extraChildren: 0,
        }); // default fallback
        capacity += ROOM_CONFIG["standard"].capacity;
      }

      return next;
    });
  }, [guestCount]);

  const updateRoomType = (index: number, type: RoomType) => {
    setRoomSelections((prev) => {
      const next = [...prev];
      next[index].type = type;

      // reset extras if switching to villa
      if (type === "villa") {
        next[index].extraAdults = 0;
        next[index].extraChildren = 0;
      }

      return next;
    });
  };

  const updateExtras = (
    index: number,
    field: "extraAdults" | "extraChildren",
    value: number,
  ) => {
    setRoomSelections((prev) => {
      const next = [...prev];
      next[index][field] = value;
      return next;
    });
  };

  const addRoom = () => {
    setRoomSelections((prev) => [
      ...prev,
      { type: "standard", extraAdults: 0, extraChildren: 0 },
    ]);
  };

  const removeRoom = (index: number) => {
    setRoomSelections((prev) => prev.filter((_, i) => i !== index));
  };

  // pricing per room selection
  const totalNightly = roomSelections.reduce((sum, room) => {
    const base = SEASON_CONFIG[activeSeasonKey].roomRates[room.type];

    let extras = 0;

    if (room.type === "standard") {
      extras =
        room.extraAdults * EXTRA_BED_RATES.adult +
        room.extraChildren * EXTRA_BED_RATES.child;
    }

    return sum + base + extras;
  }, 0);

  const estimatedTotal = totalNightly * nights;

  const recommendationText =
    guestCount <= 2
      ? "Standard Room fits this request best."
      : guestCount <= 6
        ? "Villa is the better fit for this guest count."
        : `You will likely need more than one room request.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/send-reservation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          checkInDate: formatDate(checkInDate!, "  dd/MM/yyyy"),
          checkOutDate: formatDate(checkOutDate!, "dd/MM/yyyy"),
          adults: adultsCount,
          children: childrenCount,
          guestCount,
          roomSelections,
          nights,
          total: estimatedTotal,
          specialRequests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send request");
      }

      setSuccess(true);

      // optional: reset form
      // reset everything if you want
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ExpandableScreen
      layoutId="mobile-reservation-email"
      triggerRadius="999px"
      contentRadius="24px"
    >
      {/* Listens for external "open-reservation" events */}
      <ExternalTriggerListener
        onRoomTypeChange={setRoomType}
        onRoomSelectionsReset={setRoomSelections}
      />
      <div className="w-full">
        <ExpandableScreenTrigger>
          <Button size="lg" className="w-full rounded-full">
            {t.reserveNow}
          </Button>
        </ExpandableScreenTrigger>
      </div>

      <ExpandableScreenContent
        className={cn(
          "z-[100] border bg-neutral-50 text-neutral-800 shadow-lg md:overflow-hidden dark:bg-neutral-200 dark:text-neutral-700",
        )}
      >
        <div className="z-[40] flex h-full w-full flex-col lg:flex-row">
          <div className="relative hidden h-full lg:block lg:w-1/2">
            <img
              src="/reserve_now_coast.jpeg"
              alt="Resort"
              className="h-full w-full object-cover"
            />

            {/* optional overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* optional text overlay */}
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-bold shadow-black/50 drop-shadow-md">
                {t.heroSubtitle}
              </p>
              <p className="text-xl font-medium shadow-black/50 drop-shadow-md">
                {t.heroTitle}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="h-full w-full overflow-y-auto overscroll-none pb-24 lg:w-1/2">
            <div className="flex w-full flex-col gap-5 p-4">
              <img
                src="/logo_updated.png"
                alt="Mangal Beach Lodge Logo"
                className="aspect-square h-14 w-56 object-contain"
              />

              <div className="space-y-2 pb-4">
                <h2 className="text-2xl font-medium tracking-[-0.03em] text-neutral-900">
                  {t.title}
                </h2>
                <p className="text-sm text-neutral-600">{t.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pb-3">
                <FieldGroup className="w-full flex-col gap-4">
                  <Field>
                    <FieldLabel htmlFor="check-in-date">{t.checkIn}</FieldLabel>
                    <Popover
                      open={checkInOpen}
                      onOpenChange={setCheckInOpen}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="check-in-date"
                          className="w-full justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-normal text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300"
                        >
                          {checkInDate
                            ? format(checkInDate, "PPP")
                            : t.checkInPlaceholder}
                          <ChevronDownIcon className="h-4 w-4 opacity-70" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="z-[9999] w-auto p-0"
                        align="start"
                        sideOffset={8}
                      >
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          captionLayout="dropdown"
                          defaultMonth={checkInDate}
                          onSelect={(date) => {
                            setCheckInDate(date);
                            setCheckInOpen(false);

                            if (date && checkOutDate && checkOutDate < date) {
                              setCheckOutDate(undefined);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="check-out-date">
                      {t.checkOut}
                    </FieldLabel>
                    <Popover
                      open={checkOutOpen}
                      onOpenChange={setCheckOutOpen}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="check-out-date"
                          className="w-full justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-normal text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300"
                        >
                          {checkOutDate
                            ? format(checkOutDate, "PPP")
                            : t.checkOutPlaceholder}
                          <CalendarIcon className="h-4 w-4 opacity-70" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="z-[9999] w-auto p-0"
                        align="start"
                        sideOffset={8}
                      >
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          captionLayout="dropdown"
                          defaultMonth={checkOutDate ?? checkInDate}
                          disabled={(date) =>
                            checkInDate ? date < checkInDate : false
                          }
                          onSelect={(date) => {
                            setCheckOutDate(date);
                            setCheckOutOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="adults">{t.adults}</FieldLabel>
                      <Select value={adults} onValueChange={setAdults}>
                        <SelectTrigger
                          id="adults"
                          className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300"
                        >
                          <SelectValue placeholder={t.adults} />
                        </SelectTrigger>
                        <SelectContent className="z-[9999]" position="popper">
                          {Array.from({ length: 8 }, (_, index) => {
                            const value = String(index + 1);
                            return (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="children">{t.children}</FieldLabel>
                      <Select value={children} onValueChange={setChildren}>
                        <SelectTrigger
                          id="children"
                          className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300"
                        >
                          <SelectValue placeholder={t.children} />
                        </SelectTrigger>
                        <SelectContent className="z-[9999]" position="popper">
                          {Array.from({ length: 7 }, (_, index) => {
                            const value = String(index);
                            return (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </FieldGroup>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor={fullNameId} className="sr-only">
                      {t.fullName}
                    </Label>
                    <Input
                      id={fullNameId}
                      type="text"
                      placeholder={t.fullName}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:ring-0 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={emailId} className="sr-only">
                      {t.email}
                    </Label>
                    <Input
                      id={emailId}
                      type="email"
                      placeholder={t.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:ring-0 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={phoneId} className="sr-only">
                    {t.phone}
                  </Label>
                  <Input
                    id={phoneId}
                    type="tel"
                    placeholder={t.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:ring-0 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                  />
                </div>

                <div>
                  <Label htmlFor={specialRequestsId} className="sr-only">
                    {t.observation}
                  </Label>
                  <Textarea
                    id={specialRequestsId}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={t.observationPlaceholder}
                    rows={4}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:ring-0 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                  />
                </div>

                <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {t.staySummary}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {recommendationText}
                      </p>
                    </div>
                    <Badge variant="secondary" className="rounded-full">
                      {t.breakfastIncluded}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-neutral-900">
                        {t.rooms}
                      </p>

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={addRoom}
                        className="rounded-full"
                      >
                        {t.addRoom}
                      </Button>
                    </div>

                    {/* ROOM LIST */}
                    {roomSelections.map((roomSelection, index) => {
                      const selectedType = roomSelection.type;

                      return (
                        <div key={index} className="space-y-3">
                          {/* ROOM HEADER */}
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-neutral-900">
                              {t.room} {index + 1}
                            </p>

                            {roomSelections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRoom(index)}
                                className="text-xs text-red-500"
                              >
                                {t.remove}
                              </button>
                            )}
                          </div>

                          {/* ROOM TYPES */}
                          <div className="space-y-2">
                            {(Object.keys(ROOM_CONFIG) as RoomType[]).map(
                              (type) => {
                                const room = ROOM_CONFIG[type];
                                const isSelected = selectedType === type;

                                return (
                                  <label
                                    key={type}
                                    className={`flex cursor-pointer items-start gap-3 rounded-xl px-3 py-3 transition ${isSelected ? "bg-neutral-100" : "bg-white hover:bg-neutral-50"}`}
                                  >
                                    <input
                                      type="radio"
                                      name={`room-${index}`}
                                      checked={isSelected}
                                      onChange={() =>
                                        updateRoomType(index, type)
                                      }
                                      className="mt-1"
                                    />

                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <p className="font-medium text-neutral-900">
                                          {room.label}
                                        </p>
                                        <span className="text-sm text-neutral-600">
                                          {formatMzn(
                                            SEASON_CONFIG[activeSeasonKey]
                                              .roomRates[type],
                                          )}
                                          /night
                                        </span>
                                      </div>

                                      <p className="mt-1 text-xs text-neutral-500">
                                        {room.layout}
                                      </p>
                                      <p className="text-xs text-neutral-500">
                                        {room.description}
                                      </p>
                                    </div>
                                  </label>
                                );
                              },
                            )}
                          </div>

                          {/* EXTRA BEDS */}
                          {selectedType === "standard" && (
                            <div className="flex gap-4 pt-2">
                              <div className="flex-1">
                                <Label className="text-xs">
                                  {t.extraAdults}
                                </Label>
                                <Input
                                  type="number"
                                  min={0}
                                  max={2}
                                  value={roomSelection.extraAdults}
                                  onChange={(e) =>
                                    updateExtras(
                                      index,
                                      "extraAdults",
                                      Math.min(Number(e.target.value), 2),
                                    )
                                  }
                                  className="h-9"
                                />
                                <p className="mt-1 text-[10px] text-neutral-500">
                                  {t.extraAdultsPrice}
                                </p>
                              </div>

                              <div className="flex-1">
                                <Label className="text-xs">
                                  {t.extraChildren}
                                </Label>
                                <Input
                                  type="number"
                                  min={0}
                                  max={2}
                                  value={roomSelection.extraChildren}
                                  onChange={(e) =>
                                    updateExtras(
                                      index,
                                      "extraChildren",
                                      Math.min(Number(e.target.value), 2),
                                    )
                                  }
                                  className="h-9"
                                />
                                <p className="mt-1 text-[10px] text-neutral-500">
                                  {t.extraChildrenPrice}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* CAPACITY WARNING */}
                    {needsMoreRooms && (
                      <div className="text-sm text-amber-700">
                        {t.capacityWarning
                          .replace("{totalCapacity}", String(totalCapacity))
                          .replace("{guestCount}", String(guestCount))}
                      </div>
                    )}

                    {/* CAPACITY INFO */}
                    <div className="text-sm text-neutral-600">
                      {t.capacityInfo}{" "}
                      <span className="font-medium text-neutral-900">
                        {totalCapacity} {t.guests}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-neutral-900">
                    {t.summary}
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-neutral-700">
                    <div className="flex justify-between">
                      <span>{t.guestsLabel}</span>
                      <span className="font-medium">
                        {adultsCount} {t.adultsSummary} · {childrenCount}{" "}
                        {t.childrenSummary}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>{t.nights}</span>
                      <span className="font-medium">{nights}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>{t.rooms}</span>
                      <span className="font-medium">
                        {roomSelections.length}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>{t.nightlyTotal}</span>
                      <span className="font-medium">
                        {formatMzn(totalNightly)}
                      </span>
                    </div>

                    {/* {extraBedCost > 0 && (
                  <div className="flex justify-between">
                    <span>Extra beds</span>
                    <span className="font-medium">
                      {formatMzn(extraBedCost)}
                    </span>
                  </div>
                )} */}

                    <div className="flex justify-between border-t border-neutral-200 pt-3">
                      <span className="font-medium text-neutral-900">
                        {t.totalStay}
                      </span>
                      <span className="text-base font-semibold text-neutral-900">
                        {formatMzn(estimatedTotal)}
                      </span>
                    </div>
                  </div>
                </section>

                {success && (
                  <p className="text-sm text-green-600">{t.requestSent}</p>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button
                  type="submit"
                  disabled={isSubmitting || needsMoreRooms}
                  className="mb-6 w-full rounded-full bg-neutral-900 text-white hover:bg-black disabled:opacity-50"
                >
                  {isSubmitting ? t.sending : t.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}

/**
 * Inner component that lives inside the ExpandableScreen context.
 * Listens for the custom DOM event "open-reservation" and programmatically
 * expands the reservation form, optionally pre-selecting a room type.
 */
function ExternalTriggerListener({
  onRoomTypeChange,
  onRoomSelectionsReset,
}: {
  onRoomTypeChange: (type: RoomType) => void;
  onRoomSelectionsReset: (selections: RoomSelection[]) => void;
}) {
  const { expand } = useExpandableScreen();

  useEffectReact(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.roomType) {
        const rt = detail.roomType as RoomType;
        onRoomTypeChange(rt);
        // Reset the room selections array so the radio buttons match
        onRoomSelectionsReset([{ type: rt, extraAdults: 0, extraChildren: 0 }]);
      }
      expand();
    };
    window.addEventListener("open-reservation", handler);
    return () => window.removeEventListener("open-reservation", handler);
  }, [expand, onRoomTypeChange, onRoomSelectionsReset]);

  return null;
}

export default MobileReservationEmail;
