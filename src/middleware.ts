import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Auto-detect language only on the root path
    if (pathname === "/") {
        const acceptLanguage = context.request.headers.get("accept-language") || "";
        const preferredLang = acceptLanguage.split(",")[0].toLowerCase();

        // If Portuguese is preferred and we're on the default root (English)
        // Redirect to /pt
        if (preferredLang.startsWith("pt")) {
            return context.redirect("/pt");
        }
    }

    const response = await next();

    const newHeaders = new Headers(response.headers);

    newHeaders.set(
        "Content-Security-Policy",
        "default-src 'self'; frame-src 'self' https://www.google.com https://maps.google.com; media-src 'self' https://res.cloudinary.com; img-src 'self' data: https://res.cloudinary.com https://images.unsplash.com https://*.googleusercontent.com https://*.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-insights.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://maps.googleapis.com;"
    );

    return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
    });
});