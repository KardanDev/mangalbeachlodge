import './_astro_assets_BKhaSmlq.mjs';

const GET = async () => {
  const manifest = {
    short_name: "Mangal Beach Lodge",
    name: "Mangal Beach Lodge",
    // icons,
    display: "minimal-ui",
    id: "/",
    start_url: "/",
    theme_color: "#FFEDD5",
    background_color: "#262626"
  };
  return new Response(JSON.stringify(manifest));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
