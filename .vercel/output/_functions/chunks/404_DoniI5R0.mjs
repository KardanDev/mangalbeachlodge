import { c as createComponent } from './astro-component_BzZoHXVB.mjs';
import { K as maybeRenderHead, b9 as addAttribute, a1 as renderTemplate } from './sequence_DObSEAM1.mjs';
import { r as renderComponent } from './entrypoint_mQDRfk0f.mjs';
import { $ as $$Icon, S as SITE, a as $$MainLayout, r as renderScript } from './MainLayout_C39D1Jgt.mjs';

const $$Btn404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Btn404;
  const { title, id, noArrow } = Astro2.props;
  const baseClasses = "group inline-flex items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-50 ring-zinc-500 transition duration-300 focus-visible:ring-3 outline-hidden";
  const borderClasses = "border border-transparent";
  const bgColorClasses = "bg-orange-400 hover:bg-orange-500 active:bg-orange-500 dark:focus:outline-hidden";
  const disableClasses = "disabled:pointer-events-none disabled:opacity-50";
  const fontSizeClasses = "2xl:text-base";
  const ringClasses = "dark:ring-zinc-200";
  return renderTemplate`<!-- Button with dynamic title, id, and optional arrow -->${maybeRenderHead()}<button${addAttribute(`${baseClasses} ${borderClasses} ${bgColorClasses} ${disableClasses} ${fontSizeClasses} ${ringClasses}`, "class")}${addAttribute(id, "id")}> ${title} <!-- Display the arrow based on the 'noArrow' property --> ${noArrow ? null : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "arrowRight" })}`} </button>`;
}, "C:/Users/User/Documents/mangalbeachlodge/src/components/ui/buttons/Btn404.astro", void 0);

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$404;
  const defaultLang = "en";
  const translations = {
    en: {
      pageTitle: `Page Not Found | ${SITE.title}`,
      subTitle: "Oops, this isn't the tool you were looking for!",
      content: "Don't let this hiccup slow you down. Let's get you back to building your masterpiece.",
      btnTitle: "Go Back"
    },
    fr: {
      pageTitle: `Page Non Trouvée | ${SITE.title}`,
      subTitle: "Oops, ce n'est pas l'outil que vous recherchiez!",
      content: "Ne laissez pas ce contretemps vous ralentir. Revenons à la construction de votre chef-d'œuvre.",
      btnTitle: "Retournez"
    }
  };
  const urlPath = Astro2.url.pathname;
  const langCodeMatch = urlPath.match(/^\/(en|fr)\//);
  const lang = langCodeMatch ? langCodeMatch[1] : defaultLang;
  const { pageTitle, subTitle, content, btnTitle } = translations[lang];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="grid h-svh place-content-center"> <div class="mx-auto max-w-(--breakpoint-xl) px-4 py-8 lg:px-6 lg:py-16"> <div class="mx-auto max-w-(--breakpoint-sm) text-center"> <h1 class="text-dark mb-4 text-7xl font-extrabold text-yellow-500 dark:text-yellow-400 lg:text-9xl">
404
</h1> <p id="subtitle" class="mb-4 text-balance text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300 md:text-4xl"> ${subTitle} </p> <p id="content" class="mb-4 text-pretty text-lg text-neutral-600 dark:text-neutral-400"> ${content} </p> <!-- Display a button that navigates user back to the previous page --> ${renderComponent($$result2, "Btn404", $$Btn404, { "title": btnTitle, "id": "go-back" })} </div> </div> </section> ` })} <!-- JavaScript code to handle going back to the previous page --> ${renderScript($$result, "C:/Users/User/Documents/mangalbeachlodge/src/pages/404.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/Documents/mangalbeachlodge/src/pages/404.astro", void 0);

const $$file = "C:/Users/User/Documents/mangalbeachlodge/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
