import type { APIRoute } from "astro";
import { Resend } from "resend";

import {
  calculateReservationPricing,
  formatMzn,
  getTotalCapacity,
  isRoomType,
  type RoomSelection,
} from "@/lib/reservation";

const MAX_REQUEST_BYTES = 20_000;
const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 40;
const MAX_SPECIAL_REQUESTS_LENGTH = 2_000;
const MAX_ROOM_SELECTIONS = 8;
const MAX_ADULTS = 8;
const MAX_CHILDREN = 6;
const MAX_EXTRA_BEDS_PER_TYPE = 2;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type JsonObject = Record<string, unknown>;

class ReservationValidationError extends Error {}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  value: unknown,
  field: string,
  { minLength = 0, maxLength }: { minLength?: number; maxLength: number },
): string {
  if (typeof value !== "string") {
    throw new ReservationValidationError(`${field} must be a string.`);
  }

  const trimmed = value.trim();
  if (trimmed.length < minLength || trimmed.length > maxLength) {
    throw new ReservationValidationError(`${field} has an invalid length.`);
  }

  return trimmed;
}

function readSingleLineString(
  value: unknown,
  field: string,
  limits: { minLength?: number; maxLength: number },
): string {
  const string = readString(value, field, limits);
  if (/[\r\n]/.test(string)) {
    throw new ReservationValidationError(`${field} must be a single line.`);
  }

  return string;
}

function readInteger(
  value: unknown,
  field: string,
  min: number,
  max: number,
): number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < min ||
    value > max
  ) {
    throw new ReservationValidationError(
      `${field} must be an integer from ${min} to ${max}.`,
    );
  }

  return value;
}

function parseReservationDate(value: unknown, field: string): Date {
  const dateString = readString(value, field, { minLength: 1, maxLength: 10 });
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateString);

  if (!match) {
    throw new ReservationValidationError(
      `${field} must use DD/MM/YYYY format.`,
    );
  }

  const [, dayString, monthString, yearString] = match;
  const day = Number(dayString);
  const month = Number(monthString);
  const year = Number(yearString);
  // The form submits calendar dates, not instants. Keep them in the server's
  // local calendar so the shared seasonal-pricing helpers see the same day.
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new ReservationValidationError(`${field} is not a valid date.`);
  }

  return date;
}

function formatReservationDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function parseRoomSelections(value: unknown): RoomSelection[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.length > MAX_ROOM_SELECTIONS
  ) {
    throw new ReservationValidationError(
      `roomSelections must contain between 1 and ${MAX_ROOM_SELECTIONS} rooms.`,
    );
  }

  return value.map((selection, index) => {
    if (!isJsonObject(selection) || !isRoomType(selection.type)) {
      throw new ReservationValidationError(
        `roomSelections[${index}] has an invalid room type.`,
      );
    }

    const extraAdults = readInteger(
      selection.extraAdults,
      `roomSelections[${index}].extraAdults`,
      0,
      MAX_EXTRA_BEDS_PER_TYPE,
    );
    const extraChildren = readInteger(
      selection.extraChildren,
      `roomSelections[${index}].extraChildren`,
      0,
      MAX_EXTRA_BEDS_PER_TYPE,
    );

    if (
      selection.type === "villa" &&
      (extraAdults !== 0 || extraChildren !== 0)
    ) {
      throw new ReservationValidationError("Villas cannot include extra beds.");
    }

    return { type: selection.type, extraAdults, extraChildren };
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function roomSelectionHtml(selection: RoomSelection, index: number): string {
  const roomLabel = selection.type === "standard" ? "Quarto Standard" : "Villa";

  return `
          <li>
            Quarto ${index + 1}: ${roomLabel}<br/>
            Camas extra (adultos): ${selection.extraAdults}<br/>
            Camas extra (crianças): ${selection.extraChildren}
          </li>`;
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Content-Type must be application/json." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request body is too large." }, 413);
  }

  try {
    const body: unknown = await request.json();
    if (!isJsonObject(body)) {
      throw new ReservationValidationError(
        "Request body must be a JSON object.",
      );
    }

    const fullName = readSingleLineString(body.fullName, "fullName", {
      minLength: 1,
      maxLength: MAX_NAME_LENGTH,
    });
    const email = readString(body.email, "email", {
      minLength: 3,
      maxLength: 254,
    });
    if (!EMAIL_PATTERN.test(email)) {
      throw new ReservationValidationError("email is invalid.");
    }

    const phone = readSingleLineString(body.phone, "phone", {
      minLength: 3,
      maxLength: MAX_PHONE_LENGTH,
    });
    const specialRequests = readString(
      body.specialRequests ?? "",
      "specialRequests",
      {
        maxLength: MAX_SPECIAL_REQUESTS_LENGTH,
      },
    );
    const checkInDate = parseReservationDate(body.checkInDate, "checkInDate");
    const checkOutDate = parseReservationDate(
      body.checkOutDate,
      "checkOutDate",
    );

    if (checkOutDate.getTime() <= checkInDate.getTime()) {
      throw new ReservationValidationError(
        "checkOutDate must be after checkInDate.",
      );
    }

    const adults = readInteger(body.adults, "adults", 1, MAX_ADULTS);
    const children = readInteger(body.children, "children", 0, MAX_CHILDREN);
    const roomSelections = parseRoomSelections(body.roomSelections);
    const guestCount = adults + children;

    if ("guestCount" in body) {
      const submittedGuestCount = readInteger(
        body.guestCount,
        "guestCount",
        1,
        MAX_ADULTS + MAX_CHILDREN,
      );
      if (submittedGuestCount !== guestCount) {
        throw new ReservationValidationError(
          "guestCount must match adults and children.",
        );
      }
    }

    if (getTotalCapacity(roomSelections) < guestCount) {
      throw new ReservationValidationError(
        "Selected rooms do not have capacity for all guests.",
      );
    }

    // `nights` and `total` remain accepted client JSON keys, but are never trusted.
    const pricing = calculateReservationPricing(
      roomSelections,
      checkInDate,
      checkOutDate,
    );

    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const reservationRecipient = import.meta.env.EMAIL;
    if (
      typeof resendApiKey !== "string" ||
      resendApiKey.length === 0 ||
      typeof reservationRecipient !== "string" ||
      !EMAIL_PATTERN.test(reservationRecipient)
    ) {
      console.error("Reservation email service is not configured.");
      return json({ error: "Reservation service is unavailable." }, 503);
    }

    const resend = new Resend(resendApiKey);
    const escapedFullName = escapeHtml(fullName);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = escapeHtml(phone);
    const escapedSpecialRequests = escapeHtml(
      specialRequests || "Sem observações",
    );
    const roomsHtml = roomSelections.map(roomSelectionHtml).join("");

    const internalEmail = await resend.emails.send({
      from: "New Reservation Request <reservations@contact.kardan.dev>",
      to: [reservationRecipient],
      replyTo: email,
      subject: `New Reservation - ${fullName}`,
      html: `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <h2>Novo Pedido de Reserva</h2>

  <p><strong>Nome:</strong> ${escapedFullName}</p>
  <p><strong>Email:</strong> ${escapedEmail}</p>
  <p><strong>Telefone:</strong> ${escapedPhone}</p>

  <hr/>

  <p><strong>Check-in:</strong> ${formatReservationDate(checkInDate)}</p>
  <p><strong>Check-out:</strong> ${formatReservationDate(checkOutDate)}</p>
  <p><strong>Noites:</strong> ${pricing.nights}</p>

  <p><strong>Hóspedes:</strong> ${adults} adultos · ${children} crianças</p>

  <hr/>

  <p><strong>Quartos selecionados:</strong></p>
  <ul>${roomsHtml}
  </ul>

  <hr/>

  <p><strong>Total estimado:</strong> ${formatMzn(pricing.total)}</p>

  <p><strong>Observações:</strong></p>
  <p>${escapedSpecialRequests}</p>
</div>
`,
    });

    if (internalEmail.error) {
      console.error(
        "Failed to send reservation notification.",
        internalEmail.error,
      );
      return json({ error: "Unable to send reservation request." }, 502);
    }

    // The reservation has already reached the lodge at this point. A failed
    // acknowledgement should be logged, but must not tell the guest that the
    // reservation request itself failed (which could prompt duplicate sends).
    try {
      const acknowledgementEmail = await resend.emails.send({
        from: "Mangal Beach Lodge <reservations@contact.kardan.dev>",
        to: [email],
        subject: "Recebemos o seu pedido de reserva",
        html: `
    <p>Olá ${escapedFullName},</p>
    <p>Recebemos o seu pedido de reserva e entraremos em contacto em breve.</p>
    <p>Obrigado!</p>
  `,
      });

      if (acknowledgementEmail.error) {
        console.error(
          "Failed to send reservation acknowledgement.",
          acknowledgementEmail.error,
        );
      }
    } catch (acknowledgementError) {
      console.error(
        "Unexpected reservation acknowledgement error.",
        acknowledgementError,
      );
    }

    return json({ success: true }, 200);
  } catch (error) {
    if (error instanceof ReservationValidationError) {
      return json({ error: error.message }, 422);
    }

    if (error instanceof SyntaxError) {
      return json({ error: "Invalid JSON body." }, 400);
    }

    console.error("Unexpected reservation request error.", error);
    return json({ error: "Server error." }, 500);
  }
};
