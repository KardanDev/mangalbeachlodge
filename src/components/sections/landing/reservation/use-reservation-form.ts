import { useCallback, useEffect, useMemo, useState } from "react";
import type { SubmitEvent as ReactSubmitEvent } from "react";
import { format, isAfter } from "date-fns";

import {
  calculateReservationPricing,
  clampExtraBedCount,
  createRoomSelection,
  getTotalCapacity,
  type RoomSelection,
  type RoomType,
} from "@/lib/reservation";

import type { ReservationLanguage } from "./reservation-copy";

export function useReservationForm(lang: ReservationLanguage) {
  const [roomSelections, setRoomSelections] = useState<RoomSelection[]>([
    createRoomSelection(),
  ]);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const adultsCount = Number(adults);
  const childrenCount = Number(children);
  const guestCount = adultsCount + childrenCount;
  const totalCapacity = getTotalCapacity(roomSelections);
  const needsMoreRooms = guestCount > totalCapacity;

  const pricing = useMemo(
    () =>
      calculateReservationPricing(roomSelections, checkInDate, checkOutDate),
    [checkInDate, checkOutDate, roomSelections],
  );

  // Preserve the existing convenience behavior: when guest count increases,
  // add enough Standard rooms to make an immediately valid starting quote.
  useEffect(() => {
    setRoomSelections((current) => {
      let capacity = getTotalCapacity(current);
      if (capacity >= guestCount) return current;

      const next = [...current];
      while (capacity < guestCount) {
        const room = createRoomSelection();
        next.push(room);
        capacity += getTotalCapacity([room]);
      }

      return next;
    });
  }, [guestCount]);

  const selectCheckIn = useCallback(
    (date?: Date) => {
      setCheckInDate(date);

      if (date && checkOutDate && !isAfter(checkOutDate, date)) {
        setCheckOutDate(undefined);
      }
    },
    [checkOutDate],
  );

  const updateRoomType = useCallback((index: number, type: RoomType) => {
    setRoomSelections((current) =>
      current.map((room, roomIndex) =>
        roomIndex === index
          ? {
              ...room,
              type,
              ...(type === "villa" ? { extraAdults: 0, extraChildren: 0 } : {}),
            }
          : room,
      ),
    );
  }, []);

  const updateExtras = useCallback(
    (index: number, field: "extraAdults" | "extraChildren", value: number) => {
      setRoomSelections((current) =>
        current.map((room, roomIndex) =>
          roomIndex === index
            ? { ...room, [field]: clampExtraBedCount(value) }
            : room,
        ),
      );
    },
    [],
  );

  const addRoom = useCallback(() => {
    setRoomSelections((current) => [...current, createRoomSelection()]);
  }, []);

  const removeRoom = useCallback((index: number) => {
    setRoomSelections((current) =>
      current.length === 1
        ? current
        : current.filter((_, roomIndex) => roomIndex !== index),
    );
  }, []);

  const preselectRoom = useCallback((type: RoomType) => {
    setRoomSelections([createRoomSelection(type)]);
    setSuccess(false);
    setError(null);
  }, []);

  const clearStatus = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: ReactSubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (
        !checkInDate ||
        !checkOutDate ||
        !isAfter(checkOutDate, checkInDate)
      ) {
        setError("invalid-dates");
        return;
      }

      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await fetch("/api/send-reservation-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            lang,
            fullName,
            email,
            phone,
            checkInDate: format(checkInDate, "dd/MM/yyyy"),
            checkOutDate: format(checkOutDate, "dd/MM/yyyy"),
            adults: adultsCount,
            children: childrenCount,
            guestCount,
            roomSelections,
            nights: pricing.nights,
            total: pricing.total,
            specialRequests,
            website: "",
          }),
        });

        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(data.error || "request-failed");
        }

        setSuccess(true);
      } catch (submitError) {
        setError(
          submitError instanceof Error ? submitError.message : "request-failed",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      adultsCount,
      checkInDate,
      checkOutDate,
      childrenCount,
      email,
      fullName,
      guestCount,
      lang,
      phone,
      pricing.nights,
      pricing.total,
      roomSelections,
      specialRequests,
    ],
  );

  return {
    roomSelections,
    checkInDate,
    checkOutDate,
    adults,
    children,
    fullName,
    email,
    phone,
    specialRequests,
    isSubmitting,
    success,
    error,
    adultsCount,
    childrenCount,
    guestCount,
    totalCapacity,
    needsMoreRooms,
    pricing,
    setAdults,
    setChildren,
    setFullName,
    setEmail,
    setPhone,
    setSpecialRequests,
    setCheckOutDate,
    selectCheckIn,
    updateRoomType,
    updateExtras,
    addRoom,
    removeRoom,
    preselectRoom,
    clearStatus,
    handleSubmit,
  };
}

export type ReservationFormState = ReturnType<typeof useReservationForm>;
