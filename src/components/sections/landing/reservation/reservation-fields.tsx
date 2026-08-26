import { useId, useState } from "react";
import { format, isAfter, isBefore, startOfToday } from "date-fns";
import { enUS, pt } from "date-fns/locale";
import { CalendarDays, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { ReservationCopy, ReservationLanguage } from "./reservation-copy";
import type { ReservationFormState } from "./use-reservation-form";

const controlClass =
  "h-12 rounded-xl border-neutral-200 bg-white px-4 text-left text-sm font-normal tracking-normal text-neutral-800 normal-case shadow-xs hover:bg-neutral-50 focus-visible:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-600/15";

interface ReservationFieldsProps {
  copy: ReservationCopy;
  lang: ReservationLanguage;
  form: ReservationFormState;
}

export function StayFields({ copy, lang, form }: ReservationFieldsProps) {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const locale = lang === "pt" ? pt : enUS;
  const today = startOfToday();

  return (
    <section aria-labelledby="reservation-stay-heading" className="space-y-4">
      <div>
        <h3
          id="reservation-stay-heading"
          className="text-sm font-semibold text-neutral-900"
        >
          {copy.stayDetails}
        </h3>
        <p className="mt-1 text-xs text-neutral-500">{copy.requiredHint}</p>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="reservation-check-in" className="text-xs font-medium">
            {copy.checkIn} <span aria-hidden="true">*</span>
          </Label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                id="reservation-check-in"
                type="button"
                variant="outline"
                className={cn(controlClass, "w-full justify-between")}
                aria-label={copy.checkIn}
              >
                <span className="truncate">
                  {form.checkInDate
                    ? format(form.checkInDate, "PPP", { locale })
                    : copy.checkInPlaceholder}
                </span>
                <ChevronDown className="size-4 shrink-0 text-neutral-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              data-lenis-prevent
              align="start"
              sideOffset={8}
              className="z-[70] max-w-[calc(100vw-2rem)] overflow-auto rounded-2xl p-0 [-webkit-overflow-scrolling:touch]"
            >
              <Calendar
                mode="single"
                selected={form.checkInDate}
                defaultMonth={form.checkInDate ?? today}
                captionLayout="dropdown"
                locale={locale}
                disabled={(date) => isBefore(date, today)}
                onSelect={(date) => {
                  form.selectCheckIn(date);
                  setCheckInOpen(false);
                  if (date) setCheckOutOpen(true);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="min-w-0 space-y-2">
          <Label
            htmlFor="reservation-check-out"
            className="text-xs font-medium"
          >
            {copy.checkOut} <span aria-hidden="true">*</span>
          </Label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                id="reservation-check-out"
                type="button"
                variant="outline"
                className={cn(controlClass, "w-full justify-between")}
                aria-label={copy.checkOut}
                disabled={!form.checkInDate}
              >
                <span className="truncate">
                  {form.checkOutDate
                    ? format(form.checkOutDate, "PPP", { locale })
                    : copy.checkOutPlaceholder}
                </span>
                <CalendarDays className="size-4 shrink-0 text-neutral-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              data-lenis-prevent
              align="start"
              sideOffset={8}
              className="z-[70] max-w-[calc(100vw-2rem)] overflow-auto rounded-2xl p-0 [-webkit-overflow-scrolling:touch]"
            >
              <Calendar
                mode="single"
                selected={form.checkOutDate}
                defaultMonth={form.checkOutDate ?? form.checkInDate ?? today}
                captionLayout="dropdown"
                locale={locale}
                disabled={(date) =>
                  !form.checkInDate || !isAfter(date, form.checkInDate)
                }
                onSelect={(date) => {
                  form.setCheckOutDate(date);
                  setCheckOutOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-4">
        <GuestSelect
          id="reservation-adults"
          label={copy.adults}
          value={form.adults}
          values={Array.from({ length: 8 }, (_, index) => String(index + 1))}
          onValueChange={form.setAdults}
        />
        <GuestSelect
          id="reservation-children"
          label={copy.children}
          value={form.children}
          values={Array.from({ length: 7 }, (_, index) => String(index))}
          onValueChange={form.setChildren}
        />
      </div>
    </section>
  );
}

function GuestSelect({
  id,
  label,
  value,
  values,
  onValueChange,
}: {
  id: string;
  label: string;
  value: string;
  values: string[];
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className={cn(controlClass, "w-full")}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent
          data-lenis-prevent
          position="popper"
          className="z-[70] rounded-xl [-webkit-overflow-scrolling:touch]"
        >
          {values.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ContactFields({
  copy,
  form,
}: Omit<ReservationFieldsProps, "lang">) {
  const id = useId();

  return (
    <section aria-labelledby={`${id}-heading`} className="space-y-4">
      <h3
        id={`${id}-heading`}
        className="text-sm font-semibold text-neutral-900"
      >
        {copy.contactDetails}
      </h3>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <FormInput
          id={`${id}-name`}
          label={copy.fullName}
          value={form.fullName}
          onChange={form.setFullName}
          autoComplete="name"
          required
        />
        <FormInput
          id={`${id}-email`}
          label={copy.email}
          value={form.email}
          onChange={form.setEmail}
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <FormInput
        id={`${id}-phone`}
        label={copy.phone}
        value={form.phone}
        onChange={form.setPhone}
        type="tel"
        autoComplete="tel"
        required
      />

      <div className="space-y-2">
        <Label htmlFor={`${id}-notes`} className="text-xs font-medium">
          {copy.observation}
        </Label>
        <Textarea
          id={`${id}-notes`}
          value={form.specialRequests}
          onChange={(event) => form.setSpecialRequests(event.target.value)}
          placeholder={copy.observationPlaceholder}
          rows={3}
          maxLength={1_500}
          className="min-h-24 resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm shadow-xs placeholder:text-neutral-400 focus-visible:border-amber-600"
        />
      </div>
    </section>
  );
}

function FormInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {label} {required && <span aria-hidden="true">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        maxLength={type === "email" ? 254 : 120}
        className={controlClass}
      />
    </div>
  );
}
