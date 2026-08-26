import { Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ROOM_TYPES,
  SEASON_CONFIG,
  formatMzn,
  type RoomType,
} from "@/lib/reservation";
import { cn } from "@/lib/utils";

import type { ReservationCopy } from "./reservation-copy";
import type { ReservationFormState } from "./use-reservation-form";

interface ReservationRoomsProps {
  copy: ReservationCopy;
  form: ReservationFormState;
}

export function ReservationRooms({ copy, form }: ReservationRoomsProps) {
  const recommendation =
    form.guestCount <= 2
      ? copy.recommendationStandard
      : form.guestCount <= 6
        ? copy.recommendationVilla
        : copy.recommendationMultiple;

  return (
    <section
      aria-labelledby="reservation-rooms-heading"
      className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            id="reservation-rooms-heading"
            className="text-sm font-semibold text-neutral-900"
          >
            {copy.staySummary}
          </h3>
          <p className="mt-1 max-w-lg text-xs leading-relaxed text-neutral-500">
            {recommendation}
          </p>
        </div>
        <Badge
          variant="secondary"
          className="shrink-0 rounded-full px-3 py-1 text-[10px]"
        >
          {copy.breakfastIncluded}
        </Badge>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-neutral-900">{copy.rooms}</p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={form.addRoom}
          className="min-h-11 rounded-full border-neutral-300 px-4"
        >
          <Plus className="size-4" />
          {copy.addRoom}
        </Button>
      </div>

      <div className="mt-4 space-y-5">
        {form.roomSelections.map((selection, index) => (
          <fieldset
            key={`${index}-${selection.type}`}
            className="min-w-0 space-y-3 border-t border-neutral-100 pt-5 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center justify-between gap-3">
              <legend className="text-sm font-medium text-neutral-900">
                {copy.room} {index + 1}
              </legend>
              {form.roomSelections.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => form.removeRoom(index)}
                  className="min-h-11 rounded-full px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                  {copy.remove}
                </Button>
              )}
            </div>

            <div className="grid min-w-0 gap-2">
              {ROOM_TYPES.map((type) => (
                <RoomOption
                  key={type}
                  type={type}
                  index={index}
                  selected={selection.type === type}
                  copy={copy}
                  season={form.pricing.season}
                  onSelect={() => form.updateRoomType(index, type)}
                />
              ))}
            </div>

            {selection.type === "standard" && (
              <div className="grid min-w-0 gap-3 pt-1 sm:grid-cols-2">
                <ExtraBedInput
                  id={`room-${index}-extra-adults`}
                  label={copy.extraAdults}
                  hint={copy.extraAdultsPrice}
                  value={selection.extraAdults}
                  onChange={(value) =>
                    form.updateExtras(index, "extraAdults", value)
                  }
                />
                <ExtraBedInput
                  id={`room-${index}-extra-children`}
                  label={copy.extraChildren}
                  hint={copy.extraChildrenPrice}
                  value={selection.extraChildren}
                  onChange={(value) =>
                    form.updateExtras(index, "extraChildren", value)
                  }
                />
              </div>
            )}
          </fieldset>
        ))}
      </div>

      <div
        className={cn(
          "mt-5 rounded-xl px-3 py-2.5 text-sm",
          form.needsMoreRooms
            ? "bg-amber-50 text-amber-800"
            : "bg-neutral-50 text-neutral-600",
        )}
        role={form.needsMoreRooms ? "alert" : undefined}
      >
        {form.needsMoreRooms
          ? copy.capacityWarning
              .replace("{totalCapacity}", String(form.totalCapacity))
              .replace("{guestCount}", String(form.guestCount))
          : `${copy.capacityInfo}: ${form.totalCapacity} ${copy.guests}`}
      </div>
    </section>
  );
}

function RoomOption({
  type,
  index,
  selected,
  copy,
  season,
  onSelect,
}: {
  type: RoomType;
  index: number;
  selected: boolean;
  copy: ReservationCopy;
  season: ReservationFormState["pricing"]["season"];
  onSelect: () => void;
}) {
  const room =
    type === "standard"
      ? {
          label: copy.roomStandardLabel,
          description: copy.roomStandardDescription,
          layout: copy.roomStandardLayout,
        }
      : {
          label: copy.roomVillaLabel,
          description: copy.roomVillaDescription,
          layout: copy.roomVillaLayout,
        };

  return (
    <label
      className={cn(
        "grid min-w-0 cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border p-3.5 transition-colors sm:p-4",
        selected
          ? "border-amber-600 bg-amber-50/60"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50",
      )}
    >
      <input
        type="radio"
        name={`reservation-room-${index}`}
        value={type}
        checked={selected}
        onChange={onSelect}
        className="mt-1 size-4 border-neutral-300 text-amber-700 focus:ring-amber-600"
      />
      <span className="min-w-0">
        <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <span className="font-medium text-neutral-900">{room.label}</span>
          <span className="shrink-0 text-xs font-semibold text-neutral-700 sm:text-right">
            {formatMzn(SEASON_CONFIG[season].roomRates[type])}
            <span className="ml-1 font-normal text-neutral-500">
              {copy.perNight}
            </span>
          </span>
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
          {room.layout}
        </span>
        <span className="block text-xs leading-relaxed text-neutral-500">
          {room.description}
        </span>
      </span>
    </label>
  );
}

function ExtraBedInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={2}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-11 rounded-xl bg-neutral-50"
      />
      <p className="text-[11px] leading-relaxed text-neutral-500">{hint}</p>
    </div>
  );
}

export function ReservationSummary({ copy, form }: ReservationRoomsProps) {
  const rows = [
    {
      label: copy.guestsLabel,
      value: `${form.adultsCount} ${copy.adultsSummary} · ${form.childrenCount} ${copy.childrenSummary}`,
    },
    { label: copy.nights, value: String(form.pricing.nights) },
    { label: copy.rooms, value: String(form.roomSelections.length) },
    { label: copy.nightlyTotal, value: formatMzn(form.pricing.nightlyTotal) },
  ];

  return (
    <section
      aria-labelledby="reservation-summary-heading"
      className="rounded-2xl bg-neutral-900 p-4 text-white shadow-sm sm:p-5"
    >
      <h3 id="reservation-summary-heading" className="text-sm font-semibold">
        {copy.summary}
      </h3>
      <dl className="mt-4 space-y-3 text-sm">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 text-white/75"
          >
            <dt>{row.label}</dt>
            <dd className="text-right font-medium text-white">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
          <dt className="font-medium">{copy.totalStay}</dt>
          <dd className="text-right text-lg font-semibold">
            {formatMzn(form.pricing.total)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
