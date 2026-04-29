export const prerender = false;

import type { APIRoute } from "astro"
import { Resend } from "resend"

const resend = new Resend(import.meta.env.RESEND_API_KEY)
const EMAIL = import.meta.env.EMAIL

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json()

        const {
            fullName,
            email,
            phone,
            checkInDate,
            checkOutDate,
            adults,
            children,
            roomSelections,
            nights,
            total,
            specialRequests,
        } = body

        const { error } = await resend.emails.send({
            from: "New Reservation Request <reservations@contact.kardan.dev>",
            to: [EMAIL], // your inbox
            replyTo: email,
            subject: `New Reservation - ${fullName}`,
            html: `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <h2>Novo Pedido de Reserva</h2>

  <p><strong>Nome:</strong> ${fullName}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Telefone:</strong> ${phone}</p>

  <hr/>

  <p><strong>Check-in:</strong> ${checkInDate}</p>
  <p><strong>Check-out:</strong> ${checkOutDate}</p>
  <p><strong>Noites:</strong> ${nights}</p>

  <p><strong>Hóspedes:</strong> ${adults} adultos · ${children} crianças</p>

  <hr/>

  <p><strong>Quartos selecionados:</strong></p>
  <ul>
    ${roomSelections
                    .map(
                        (room: any, i: number) => `
          <li>
            Quarto ${i + 1}: ${room.type === "standard" ? "Quarto Standard" : "Villa"}<br/>
            Camas extra (adultos): ${room.extraAdults ?? 'Nenhum'}<br/>
            Camas extra (crianças): ${room.extraChildren ?? "Nenhum"}
          </li>
        `
                    )
                    .join("")}
  </ul>

  <hr/>

  <p><strong>Total estimado:</strong> ${total} MZN</p>

  <p><strong>Observações:</strong></p>
  <p>${specialRequests || "Sem observações"}</p>
</div>
`,
        })

        await resend.emails.send({
            from: "Mangal Beach Lodge <reservations@contact.kardan.dev>",
            to: [email],
            subject: "Recebemos o seu pedido de reserva",
            html: `
    <p>Olá ${fullName},</p>
    <p>Recebemos o seu pedido de reserva e entraremos em contacto em breve.</p>
    <p>Obrigado!</p>
  `,
        })

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 400 })
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        })
    }
}