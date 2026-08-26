export const ROOM_TYPES = ["standard", "villa"] as const;

export type RoomType = (typeof ROOM_TYPES)[number];
export type SeasonKey = "low" | "high" | "festive";

export interface RoomSelection {
  type: RoomType;
  extraAdults: number;
  extraChildren: number;
}

export const EXTRA_BED_RATES = {
  adult: 2_500,
  child: 1_500,
} as const;

export const ROOM_CAPACITY: Record<RoomType, number> = {
  standard: 2,
  villa: 6,
};

export const SEASON_CONFIG: Record<
  SeasonKey,
  {
    months: number[];
    roomRates: Record<RoomType, number>;
  }
> = {
  low: {
    months: [2, 3, 5, 6, 7, 9, 10, 11],
    roomRates: {
      standard: 6_500,
      villa: 13_000,
    },
  },
  high: {
    months: [1, 4, 8, 12],
    roomRates: {
      standard: 8_500,
      villa: 15_000,
    },
  },
  festive: {
    months: [],
    roomRates: {
      standard: 12_500,
      villa: 25_000,
    },
  },
};

export function createRoomSelection(
  type: RoomType = "standard",
): RoomSelection {
  return { type, extraAdults: 0, extraChildren: 0 };
}

export function isRoomType(value: unknown): value is RoomType {
  return typeof value === "string" && ROOM_TYPES.includes(value as RoomType);
}

export function clampExtraBedCount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(Math.trunc(value), 0), 2);
}

export function getSeasonForDate(date: Date): SeasonKey {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 12 && day >= 22) || (month === 1 && day <= 3)) {
    return "festive";
  }

  return SEASON_CONFIG.low.months.includes(month) ? "low" : "high";
}

export function getRoomCapacity(selection: RoomSelection): number {
  const baseCapacity = ROOM_CAPACITY[selection.type];

  if (selection.type === "villa") return baseCapacity;

  return (
    baseCapacity +
    clampExtraBedCount(selection.extraAdults) +
    clampExtraBedCount(selection.extraChildren)
  );
}

export function getTotalCapacity(selections: RoomSelection[]): number {
  return selections.reduce(
    (capacity, selection) => capacity + getRoomCapacity(selection),
    0,
  );
}

export function getNightCount(checkIn?: Date, checkOut?: Date): number {
  if (!checkIn || !checkOut) return 1;

  const millisecondsPerDay = 86_400_000;
  const checkInUtc = Date.UTC(
    checkIn.getFullYear(),
    checkIn.getMonth(),
    checkIn.getDate(),
  );
  const checkOutUtc = Date.UTC(
    checkOut.getFullYear(),
    checkOut.getMonth(),
    checkOut.getDate(),
  );

  return Math.max(
    1,
    Math.round((checkOutUtc - checkInUtc) / millisecondsPerDay),
  );
}

export function calculateReservationPricing(
  selections: RoomSelection[],
  checkIn?: Date,
  checkOut?: Date,
) {
  const season = getSeasonForDate(checkIn ?? new Date());
  const nights = getNightCount(checkIn, checkOut);

  const nightlyTotal = selections.reduce((total, selection) => {
    const roomRate = SEASON_CONFIG[season].roomRates[selection.type];
    const extras =
      selection.type === "standard"
        ? clampExtraBedCount(selection.extraAdults) * EXTRA_BED_RATES.adult +
          clampExtraBedCount(selection.extraChildren) * EXTRA_BED_RATES.child
        : 0;

    return total + roomRate + extras;
  }, 0);

  return {
    season,
    nights,
    nightlyTotal,
    total: nightlyTotal * nights,
  };
}

export function formatMzn(value: number): string {
  return `${new Intl.NumberFormat("pt-MZ").format(value)} MZN`;
}
