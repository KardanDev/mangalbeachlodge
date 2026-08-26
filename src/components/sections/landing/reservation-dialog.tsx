"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";

import { Button } from "@/components/ui/button";
import { isRoomType } from "@/lib/reservation";

import {
  getReservationCopy,
  type ReservationLanguage,
} from "./reservation/reservation-copy";
import { ContactFields, StayFields } from "./reservation/reservation-fields";
import {
  ReservationRooms,
  ReservationSummary,
} from "./reservation/reservation-rooms";
import { useReservationForm } from "./reservation/use-reservation-form";

interface ReservationDialogProps {
  lang: ReservationLanguage;
}

/**
 * One page-level React island owns the reservation state and dialog.
 * Static Astro buttons open it through `data-reservation-trigger`, while room
 * cards keep using the existing `open-reservation` custom event contract.
 */
function ReservationDialog({ lang }: ReservationDialogProps) {
  const copy = getReservationCopy(lang);
  const form = useReservationForm(lang);
  const [open, setOpen] = useState(false);

  const openReservation = useCallback(
    (roomType?: unknown) => {
      if (isRoomType(roomType)) form.preselectRoom(roomType);
      form.clearStatus();
      setOpen(true);
    },
    [form.clearStatus, form.preselectRoom],
  );

  useEffect(() => {
    const handleTriggerClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("[data-reservation-trigger]")) return;

      event.preventDefault();
      openReservation();
    };

    const handleExternalTrigger = (event: Event) => {
      const detail = (event as CustomEvent<{ roomType?: unknown }>).detail;
      openReservation(detail?.roomType);
    };

    document.addEventListener("click", handleTriggerClick);
    window.addEventListener("open-reservation", handleExternalTrigger);

    return () => {
      document.removeEventListener("click", handleTriggerClick);
      window.removeEventListener("open-reservation", handleExternalTrigger);
    };
  }, [openReservation]);

  const errorMessage = !form.error
    ? null
    : form.error === "invalid-dates"
      ? copy.missingDates
      : copy.requestFailed;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[50] bg-neutral-950/55 backdrop-blur-[2px]" />

        <Dialog.Content
          data-lenis-prevent
          aria-describedby="reservation-dialog-description"
          className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed top-1/2 left-1/2 z-[60] grid h-screen max-h-screen w-screen -translate-x-1/2 -translate-y-1/2 grid-cols-1 overflow-hidden bg-neutral-50 text-neutral-800 outline-none supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh sm:h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-2rem)] sm:w-[calc(100vw-2rem)] sm:max-w-6xl sm:rounded-[2rem] sm:border sm:border-white/60 sm:shadow-2xl sm:supports-[height:100dvh]:h-[calc(100dvh-2rem)] sm:supports-[height:100dvh]:max-h-[calc(100dvh-2rem)] md:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.28fr)]"
        >
          <div className="relative hidden min-h-0 overflow-hidden md:block">
            <img
              src="/reserve_now_coast.jpeg"
              alt="Mangal Beach Lodge coast"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
              <p className="text-xs font-semibold tracking-[0.16em] text-white/75 uppercase">
                {copy.heroSubtitle}
              </p>
              <p className="mt-2 max-w-xs text-2xl leading-tight font-medium lg:text-3xl">
                {copy.heroTitle}
              </p>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col bg-neutral-50">
            <header className="relative shrink-0 border-b border-neutral-200/80 bg-white px-4 pt-[max(1rem,env(safe-area-inset-top))] pr-16 pb-4 sm:px-6 sm:py-5 sm:pr-20">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/logo_updated.png"
                  alt="Mangal Beach Lodge"
                  className="h-11 w-20 shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <Dialog.Title className="text-xl leading-tight font-medium tracking-tight text-neutral-950 sm:text-2xl">
                    {copy.title}
                  </Dialog.Title>
                  <Dialog.Description
                    id="reservation-dialog-description"
                    className="mt-1 text-xs leading-relaxed text-neutral-500 sm:text-sm"
                  >
                    {copy.subtitle}
                  </Dialog.Description>
                </div>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={copy.close}
                  className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-10 flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none sm:top-5 sm:right-5"
                >
                  <X className="size-5" />
                </button>
              </Dialog.Close>
            </header>

            <div
              data-lenis-prevent
              className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
            >
              <form
                onSubmit={form.handleSubmit}
                className="space-y-6 px-4 pt-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6"
              >
                <StayFields copy={copy} lang={lang} form={form} />
                <ContactFields copy={copy} form={form} />
                <ReservationRooms copy={copy} form={form} />
                <ReservationSummary copy={copy} form={form} />

                <div aria-live="polite" aria-atomic="true">
                  {form.success && (
                    <p
                      role="status"
                      className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
                    >
                      {copy.requestSent}
                    </p>
                  )}
                  {errorMessage && (
                    <p
                      role="alert"
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={form.isSubmitting || form.needsMoreRooms}
                  className="min-h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-black disabled:opacity-50"
                >
                  {form.isSubmitting ? copy.sending : copy.submit}
                </Button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ReservationDialog;
