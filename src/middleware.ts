import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();

    const newHeaders = new Headers(response.headers);

    newHeaders.set(
        "Content-Security-Policy",
        "default-src 'self'; media-src 'self' https://res.cloudinary.com; img-src 'self' data: https://res.cloudinary.com https://images.unsplash.com; script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel-insights.com; style-src 'self' 'unsafe-inline';"
    );

    return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
    });
});