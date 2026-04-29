import { c as createComponent } from './astro-component_BzZoHXVB.mjs';
import { K as maybeRenderHead, b9 as addAttribute, a1 as renderTemplate } from './sequence_DObSEAM1.mjs';
import { r as renderComponent } from './entrypoint_mQDRfk0f.mjs';
import { $ as $$Icon } from './MainLayout_C39D1Jgt.mjs';

const $$PrimaryCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PrimaryCTA;
  const { title, url, noArrow } = Astro2.props;
  const baseClasses = "group inline-flex items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-50 ring-zinc-500 transition duration-300 focus-visible:ring-3 outline-hidden";
  const borderClasses = "border border-transparent";
  const bgColorClasses = "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 dark:focus:outline-hidden";
  const disableClasses = "disabled:pointer-events-none disabled:opacity-50";
  const fontSizeClasses = "2xl:text-base";
  const ringClasses = "dark:ring-zinc-200";
  return renderTemplate`<!-- Link styled as a button, with dynamic title, URL, and optional arrow -->${maybeRenderHead()}<a${addAttribute(`${baseClasses} ${borderClasses} ${bgColorClasses} ${disableClasses} ${fontSizeClasses} ${ringClasses}`, "class")}${addAttribute(url, "href")}> ${title} <!-- Display the arrow based on the 'noArrow' property --> ${noArrow ? null : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "arrowRight" })}`} </a>`;
}, "C:/Users/User/Documents/mangalbeachlodge/src/components/ui/buttons/PrimaryCTA.astro", void 0);

export { $$PrimaryCTA as $ };
