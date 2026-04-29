import { c as createComponent } from './astro-component_BzZoHXVB.mjs';
import { K as maybeRenderHead, a1 as renderTemplate } from './sequence_DObSEAM1.mjs';
import { r as renderComponent } from './entrypoint_mQDRfk0f.mjs';
import { a as $$MainLayout } from './MainLayout_C39D1Jgt.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { createContext, useState, useEffect, useContext, useId, useMemo } from 'react';
import { differenceInCalendarDays, format, formatDate } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CheckIcon, ChevronUpIcon, X, CalendarIcon, Play, Plus } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { Slot, Label as Label$1, Popover as Popover$1, Select as Select$1 } from 'radix-ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getDefaultClassNames, DayPicker } from 'react-day-picker';
import { AnimatePresence, motion } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-none border-0 bg-transparent px-0 py-0 text-[0.625rem] font-semibold tracking-widest whitespace-nowrap uppercase transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "text-foreground [a]:hover:text-foreground/70",
        secondary: "text-muted-foreground [a]:hover:text-foreground",
        destructive: "text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:text-destructive/70",
        outline: "text-foreground [a]:hover:text-foreground/70",
        ghost: "text-muted-foreground hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      "data-variant": variant,
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-semibold tracking-widest whitespace-nowrap uppercase transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border bg-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-input/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 gap-1.5 px-6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-11 gap-1.5 px-8 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "group/calendar bg-background p-3 [--cell-radius:0] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      locale,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label" ? "text-sm" : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: ({ ...props2 }) => /* @__PURE__ */ jsx(CalendarDayButton, { locale, ...props2 }),
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(locale?.code),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}

function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Label$1.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-xs font-semibold tracking-wide uppercase select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-[slot=checkbox]:text-sm peer-data-[slot=checkbox]:font-normal peer-data-[slot=checkbox]:tracking-normal peer-data-[slot=checkbox]:normal-case peer-data-[slot=radio-group-item]:text-sm peer-data-[slot=radio-group-item]:font-normal peer-data-[slot=radio-group-item]:tracking-normal peer-data-[slot=radio-group-item]:normal-case peer-data-[slot=switch]:text-sm peer-data-[slot=switch]:font-normal peer-data-[slot=switch]:tracking-normal peer-data-[slot=switch]:normal-case",
        className
      ),
      ...props
    }
  );
}

function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "field-group",
      className: cn(
        "group/field-group @container/field-group flex w-full flex-col gap-10 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      ),
      ...props
    }
  );
}
const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": orientation,
      className: cn(fieldVariants({ orientation }), className),
      ...props
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "field-label",
      className: cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-relaxed group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border *:data-[slot=field]:p-4 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      ),
      ...props
    }
  );
}

function Input({ className, type, ...props }) {
  const isTime = type === "time";
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        // base styles
        "h-10 w-full min-w-0 text-sm outline-none transition",
        // default (your clean boxed style)
        "rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3",
        "focus:outline-none focus:ring-0",
        "dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300",
        // 👉 time-specific overrides
        isTime && [
          "appearance-none",
          "[&::-webkit-calendar-picker-indicator]:hidden",
          "[&::-webkit-calendar-picker-indicator]:appearance-none",
          "[&::-webkit-datetime-edit]:px-0",
          "[&::-webkit-datetime-edit-fields-wrapper]:flex",
          "[&::-webkit-datetime-edit-hour-field]:bg-transparent",
          "[&::-webkit-datetime-edit-minute-field]:bg-transparent",
          "[&::-webkit-datetime-edit-ampm-field]:bg-transparent"
        ],
        className
      ),
      ...props
    }
  );
}

function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-4 rounded-none bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      ),
      ...props
    }
  ) });
}

function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-none border border-transparent border-b-input bg-transparent px-0 py-2 text-sm whitespace-nowrap transition-[color,border-color] outline-none focus-visible:border-b-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive data-placeholder:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-9 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:aria-invalid:border-b-destructive/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Select$1.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "pointer-events-none size-3.5 text-muted-foreground" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Portal, { children: /* @__PURE__ */ jsxs(
    Select$1.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": position === "item-aligned",
      className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-none bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          Select$1.Viewport,
          {
            "data-position": position,
            className: cn(
              "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
              position === "popper" && ""
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-2.5 rounded-none py-2 pr-8 pl-3 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(Select$1.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "pointer-events-none" }) }) }),
        /* @__PURE__ */ jsx(Select$1.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-3.5",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ChevronUpIcon,
        {}
      )
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-3.5",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ChevronDownIcon,
        {}
      )
    }
  );
}

function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "flex field-sizing-content min-h-16 w-full resize-none rounded-none border border-transparent border-b-input bg-transparent px-0 py-3 text-base transition-[color,border-color] outline-none placeholder:text-muted-foreground focus-visible:border-b-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive md:text-sm dark:aria-invalid:border-b-destructive/50",
        className
      ),
      ...props
    }
  );
}

const ExpandableScreenContext = createContext(null);
function useExpandableScreen() {
  const context = useContext(ExpandableScreenContext);
  if (!context) {
    throw new Error(
      "useExpandableScreen must be used within an ExpandableScreen"
    );
  }
  return context;
}
function ExpandableScreen({
  children,
  defaultExpanded = false,
  onExpandChange,
  layoutId = "expandable-card",
  triggerRadius = "100px",
  contentRadius = "24px",
  animationDuration = 0.3,
  lockScroll = true
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const expand = () => {
    setIsExpanded(true);
    onExpandChange?.(true);
  };
  const collapse = () => {
    setIsExpanded(false);
    onExpandChange?.(false);
  };
  useEffect(() => {
    if (lockScroll) {
      if (isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [isExpanded, lockScroll]);
  return /* @__PURE__ */ jsx(
    ExpandableScreenContext.Provider,
    {
      value: {
        isExpanded,
        expand,
        collapse,
        layoutId,
        triggerRadius,
        contentRadius,
        animationDuration
      },
      children
    }
  );
}
function ExpandableScreenTrigger({
  children,
  className = ""
}) {
  const { isExpanded, expand, layoutId, triggerRadius } = useExpandableScreen();
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: !isExpanded && /* @__PURE__ */ jsxs(motion.div, { className: `inline-block relative ${className}`, children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: {
          borderRadius: triggerRadius
        },
        layout: true,
        layoutId,
        className: "absolute inset-0 transform-gpu will-change-transform"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.2 },
        exit: { opacity: 0, scale: 0.8 },
        layout: false,
        onClick: expand,
        className: "relative cursor-pointer",
        children
      }
    )
  ] }) });
}
function ExpandableScreenContent({
  children,
  className = "",
  showCloseButton = true,
  closeButtonClassName = ""
}) {
  const { isExpanded, collapse, layoutId, contentRadius, animationDuration } = useExpandableScreen();
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isExpanded && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-2", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      layoutId,
      transition: { duration: animationDuration },
      style: {
        borderRadius: contentRadius
      },
      layout: true,
      className: `relative flex h-full w-full overflow-y-auto transform-gpu will-change-transform ${className}`,
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.15, duration: 0.4 },
            className: "relative z-20 w-full pb-6 ",
            children
          }
        ),
        showCloseButton && /* @__PURE__ */ jsx(
          motion.button,
          {
            onClick: collapse,
            className: `absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center transition-colors rounded-full ${closeButtonClassName || "text-neutral-800 bg-transparent hover:bg-neutral-800/10"}`,
            "aria-label": "Close",
            children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
          }
        )
      ]
    }
  ) }) });
}

const EXTRA_BED_RATES = {
  adult: 2500,
  child: 1500
};
const ROOM_CONFIG = {
  standard: {
    label: "Standard Room",
    capacity: 2,
    description: "Double bed · breakfast included",
    layout: "Sleeps 2"
  },
  villa: {
    label: "Villa",
    capacity: 6,
    description: "Type 2 house · self catering · breakfast included on request flow",
    layout: "Sleeps 6 · 4 in rooms + 2 in bunk near common area"
  }
};
const SEASON_CONFIG = {
  low: {
    months: [2, 3, 5, 6, 7, 9, 10, 11],
    roomRates: {
      standard: 6500,
      villa: 13e3
    }
  },
  high: {
    months: [1, 4, 8, 12],
    roomRates: {
      standard: 8500,
      villa: 15e3
    }
  },
  festive: {
    months: [],
    roomRates: {
      standard: 12500,
      villa: 25e3
    }
  }
};
function getSeasonForDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month === 12 && day >= 22 || month === 1 && day <= 3) {
    return "festive";
  }
  if (SEASON_CONFIG.low.months.includes(month)) {
    return "low";
  }
  return "high";
}
function formatMzn(value) {
  return `${new Intl.NumberFormat("pt-MZ").format(value)} MZN`;
}
function MobileReservationEmail() {
  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const specialRequestsId = useId();
  const [roomSelections, setRoomSelections] = useState([
    { type: "standard", extraAdults: 0, extraChildren: 0 }
  ]);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [roomType, setRoomType] = useState("standard");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const adultsCount = Number(adults);
  const childrenCount = Number(children);
  const guestCount = adultsCount + childrenCount;
  const activeDate = checkInDate ?? /* @__PURE__ */ new Date();
  const activeSeasonKey = getSeasonForDate(activeDate);
  const room = ROOM_CONFIG[roomType];
  SEASON_CONFIG[activeSeasonKey].roomRates[roomType];
  const nights = checkInDate && checkOutDate ? Math.max(1, differenceInCalendarDays(checkOutDate, checkInDate)) : 1;
  const suggestedRoomType = guestCount <= 2 ? "standard" : "villa";
  ROOM_CONFIG[suggestedRoomType].label;
  ROOM_CONFIG[suggestedRoomType].capacity;
  const extraAdultBeds = roomType === "standard" ? Math.max(adultsCount - room.capacity, 0) : 0;
  const extraChildBeds = roomType === "standard" ? childrenCount : 0;
  const extraBedCost = extraAdultBeds * EXTRA_BED_RATES.adult + extraChildBeds * EXTRA_BED_RATES.child;
  guestCount <= room.capacity;
  useMemo(() => {
    if (guestCount <= room.capacity) return 1;
    return Math.ceil(guestCount / room.capacity);
  }, [guestCount, room.capacity]);
  const totalCapacity = roomSelections.reduce((acc, room2) => {
    const base = ROOM_CONFIG[room2.type].capacity;
    if (room2.type === "standard") {
      return acc + base + room2.extraAdults + room2.extraChildren;
    }
    return acc + base;
  }, 0);
  const needsMoreRooms = guestCount > totalCapacity;
  useMemo(() => {
    if (!needsMoreRooms) return;
    setRoomSelections((prev) => {
      const next = [...prev];
      let capacity = totalCapacity;
      while (capacity < guestCount) {
        next.push({
          type: "standard",
          extraAdults: 0,
          extraChildren: 0
        });
        capacity += ROOM_CONFIG["standard"].capacity;
      }
      return next;
    });
  }, [guestCount]);
  const updateRoomType = (index, type) => {
    setRoomSelections((prev) => {
      const next = [...prev];
      next[index].type = type;
      if (type === "villa") {
        next[index].extraAdults = 0;
        next[index].extraChildren = 0;
      }
      return next;
    });
  };
  const updateExtras = (index, field, value) => {
    setRoomSelections((prev) => {
      const next = [...prev];
      next[index][field] = value;
      return next;
    });
  };
  const addRoom = () => {
    setRoomSelections((prev) => [
      ...prev,
      { type: "standard", extraAdults: 0, extraChildren: 0 }
    ]);
  };
  const removeRoom = (index) => {
    setRoomSelections((prev) => prev.filter((_, i) => i !== index));
  };
  const totalNightly = roomSelections.reduce((sum, room2) => {
    const base = SEASON_CONFIG[activeSeasonKey].roomRates[room2.type];
    let extras = 0;
    if (room2.type === "standard") {
      extras = room2.extraAdults * EXTRA_BED_RATES.adult + room2.extraChildren * EXTRA_BED_RATES.child;
    }
    return sum + base + extras;
  }, 0);
  const estimatedTotal = totalNightly * nights;
  const recommendationText = guestCount <= 2 ? "Standard Room fits this request best." : guestCount <= 6 ? "Villa is the better fit for this guest count." : `You will likely need more than one room request.`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/send-reservation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          checkInDate: formatDate(checkInDate, "  dd/MM/yyyy"),
          checkOutDate: formatDate(checkOutDate, "dd/MM/yyyy"),
          adults: adultsCount,
          children: childrenCount,
          guestCount,
          roomSelections,
          nights,
          total: estimatedTotal,
          specialRequests
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send request");
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    ExpandableScreen,
    {
      layoutId: "mobile-reservation-email",
      triggerRadius: "999px",
      contentRadius: "24px",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-full ", children: /* @__PURE__ */ jsx(ExpandableScreenTrigger, { children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "w-full rounded-full", children: "Reserve now" }) }) }),
        /* @__PURE__ */ jsx(ExpandableScreenContent, { className: cn(
          "border  bg-neutral-50 text-neutral-800 shadow-lg dark:bg-neutral-200 dark:text-neutral-700 md:overflow-hidden"
        ), children: /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden lg:flex lg:w-1/2 relative", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-screen w-full", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9?q=80&w=1400&auto=format&fit=crop",
                alt: "Resort",
                className: "h-full w-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-6 text-white", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80", children: "Mangal Beach Lodge" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-medium", children: "Your coastal escape" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full  flex-col gap-5 p-4 ", children: [
            /* @__PURE__ */ jsx("img", { src: "/brand-logo.png", alt: "Mangal Beach Lodge Logo", className: " w-56 h-14 object-contain aspect-square" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2  pb-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium tracking-[-0.03em] text-neutral-900", children: "Reserve your stay" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "Request availability based on the information below." })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pb-3", children: [
              /* @__PURE__ */ jsxs(FieldGroup, { className: "w-full flex-col gap-4", children: [
                /* @__PURE__ */ jsxs(Field, { children: [
                  /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "check-in-date", children: "Check-in" }),
                  /* @__PURE__ */ jsxs(Popover, { open: checkInOpen, onOpenChange: setCheckInOpen, children: [
                    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                      Button,
                      {
                        variant: "outline",
                        id: "check-in-date",
                        className: "w-full justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-normal text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300",
                        children: [
                          checkInDate ? format(checkInDate, "PPP") : "Select check-in",
                          /* @__PURE__ */ jsx(ChevronDownIcon, { className: "h-4 w-4 opacity-70" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto overflow-hidden p-0", align: "start", children: /* @__PURE__ */ jsx(
                      Calendar,
                      {
                        mode: "single",
                        selected: checkInDate,
                        captionLayout: "dropdown",
                        defaultMonth: checkInDate,
                        onSelect: (date) => {
                          setCheckInDate(date);
                          setCheckInOpen(false);
                          if (date && checkOutDate && checkOutDate < date) {
                            setCheckOutDate(void 0);
                          }
                        }
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(Field, { children: [
                  /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "check-out-date", children: "Check-out" }),
                  /* @__PURE__ */ jsxs(Popover, { open: checkOutOpen, onOpenChange: setCheckOutOpen, children: [
                    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                      Button,
                      {
                        variant: "outline",
                        id: "check-out-date",
                        className: "w-full justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-normal text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300",
                        children: [
                          checkOutDate ? format(checkOutDate, "PPP") : "Select check-out",
                          /* @__PURE__ */ jsx(CalendarIcon, { className: "h-4 w-4 opacity-70" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto overflow-hidden p-0", align: "start", children: /* @__PURE__ */ jsx(
                      Calendar,
                      {
                        mode: "single",
                        selected: checkOutDate,
                        captionLayout: "dropdown",
                        defaultMonth: checkOutDate ?? checkInDate,
                        disabled: (date) => checkInDate ? date < checkInDate : false,
                        onSelect: (date) => {
                          setCheckOutDate(date);
                          setCheckOutOpen(false);
                        }
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxs(Field, { children: [
                    /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "adults", children: "Adults" }),
                    /* @__PURE__ */ jsxs(Select, { value: adults, onValueChange: setAdults, children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: "adults",
                          className: "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300",
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Adults" })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: Array.from({ length: 8 }, (_, index) => {
                        const value = String(index + 1);
                        return /* @__PURE__ */ jsx(SelectItem, { value, children: value }, value);
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(Field, { children: [
                    /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "children", children: "Children" }),
                    /* @__PURE__ */ jsxs(Select, { value: children, onValueChange: setChildren, children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: "children",
                          className: "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300",
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Children" })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: Array.from({ length: 7 }, (_, index) => {
                        const value = String(index);
                        return /* @__PURE__ */ jsx(SelectItem, { value, children: value }, value);
                      }) })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: fullNameId, className: "sr-only", children: "Full name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: fullNameId,
                      type: "text",
                      placeholder: "Full name",
                      value: fullName,
                      onChange: (e) => setFullName(e.target.value),
                      className: "h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-0 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: emailId, className: "sr-only", children: "Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: emailId,
                      type: "email",
                      placeholder: "Email address",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      className: "h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-0 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: phoneId, className: "sr-only", children: "Phone" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: phoneId,
                    type: "tel",
                    placeholder: "Phone number",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    className: "h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-0 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: specialRequestsId, className: "sr-only", children: "Observation" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: specialRequestsId,
                    value: specialRequests,
                    onChange: (e) => setSpecialRequests(e.target.value),
                    placeholder: "Observation",
                    rows: 4,
                    className: "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("section", { className: "rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-neutral-900", children: "Stay summary" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500", children: recommendationText })
                  ] }),
                  /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-full", children: "Breakfast included" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-neutral-900", children: "Rooms" }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        onClick: addRoom,
                        className: "rounded-full",
                        children: "+ Add room"
                      }
                    )
                  ] }),
                  roomSelections.map((roomSelection, index) => {
                    const selectedType = roomSelection.type;
                    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-neutral-900", children: [
                          "Room ",
                          index + 1
                        ] }),
                        roomSelections.length > 1 && /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeRoom(index),
                            className: "text-xs text-red-500",
                            children: "Remove"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: Object.keys(ROOM_CONFIG).map((type) => {
                        const room2 = ROOM_CONFIG[type];
                        const isSelected = selectedType === type;
                        return /* @__PURE__ */ jsxs(
                          "label",
                          {
                            className: `flex items-start gap-3 rounded-xl px-3 py-3 cursor-pointer transition
                ${isSelected ? "bg-neutral-100" : "bg-white hover:bg-neutral-50"}`,
                            children: [
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  type: "radio",
                                  name: `room-${index}`,
                                  checked: isSelected,
                                  onChange: () => updateRoomType(index, type),
                                  className: "mt-1"
                                }
                              ),
                              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                                  /* @__PURE__ */ jsx("p", { className: "font-medium text-neutral-900", children: room2.label }),
                                  /* @__PURE__ */ jsxs("span", { className: "text-sm text-neutral-600", children: [
                                    formatMzn(
                                      SEASON_CONFIG[activeSeasonKey].roomRates[type]
                                    ),
                                    "/night"
                                  ] })
                                ] }),
                                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 mt-1", children: room2.layout }),
                                /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500", children: room2.description })
                              ] })
                            ]
                          },
                          type
                        );
                      }) }),
                      selectedType === "standard" && /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Extra adults" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "number",
                              min: 0,
                              max: 2,
                              value: roomSelection.extraAdults,
                              onChange: (e) => updateExtras(
                                index,
                                "extraAdults",
                                Math.min(Number(e.target.value), 2)
                              ),
                              className: "h-9"
                            }
                          ),
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-neutral-500 mt-1", children: "2.500 MZN / adult" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Extra children" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "number",
                              min: 0,
                              max: 2,
                              value: roomSelection.extraChildren,
                              onChange: (e) => updateExtras(
                                index,
                                "extraChildren",
                                Math.min(Number(e.target.value), 2)
                              ),
                              className: "h-9"
                            }
                          ),
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-neutral-500 mt-1", children: "1.500 MZN / child" })
                        ] })
                      ] })
                    ] }, index);
                  }),
                  needsMoreRooms && /* @__PURE__ */ jsxs("div", { className: "text-sm text-amber-700", children: [
                    "Capacity is ",
                    totalCapacity,
                    " guests, but you selected ",
                    guestCount,
                    ". Add another room."
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm text-neutral-600", children: [
                    "Total capacity:",
                    " ",
                    /* @__PURE__ */ jsxs("span", { className: "font-medium text-neutral-900", children: [
                      totalCapacity,
                      " guests"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("section", { className: "rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-sm", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-neutral-900", children: "Summary" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm text-neutral-700", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Guests" }),
                    /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                      adultsCount,
                      " adults · ",
                      childrenCount,
                      " children"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Nights" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: nights })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Rooms" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: roomSelections.length })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Nightly total" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatMzn(totalNightly) })
                  ] }),
                  extraBedCost > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Extra beds" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatMzn(extraBedCost) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t border-neutral-200 pt-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-neutral-900", children: "Total stay" }),
                    /* @__PURE__ */ jsx("span", { className: "text-base font-semibold text-neutral-900", children: formatMzn(estimatedTotal) })
                  ] })
                ] })
              ] }),
              success && /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600", children: "Request sent successfully. We’ll get back to you shortly." }),
              error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "w-full rounded-full mb-6 bg-neutral-900 text-white hover:bg-black disabled:opacity-50",
                  children: isSubmitting ? "Sending..." : "Send availability request"
                }
              )
            ] })
          ] }) })
        ] }) })
      ]
    }
  );
}

const $$ReservationEmail = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<aside class="relative hidden min-h-[560px] overflow-hidden rounded-[1.6rem] border border-zinc-200/70 sm:min-h-[640px] lg:block dark:border-zinc-700"> <img src="/availability-form-bg.png" alt="Turquoise water and shoreline at Mangal Beach Lodge" class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async"> <div class="absolute inset-x-0 top-0 bottom-0 z-10 p-6 sm:p-8"> <div class="max-w-md space-y-4"> <p class="text-xs tracking-[0.2em] text-white/70 uppercase">
Mangal Beach Lodge
</p> <h2 class="text-3xl leading-tight font-medium text-white sm:text-4xl">
Escape to the coast.
</h2> <p class="text-sm text-white/80">
Check availability and plan your stay in seconds.
</p> </div> <div class="absolute inset-x-0 bottom-0 space-y-4 p-5 sm:p-7"> ${renderComponent($$result, "MobileReservationEmail", MobileReservationEmail, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/User/Documents/mangalbeachlodge/src/components/sections/landing/mobile-reservation-email", "client:component-export": "default" })} </div> </div> </aside>`;
}, "C:/Users/User/Documents/mangalbeachlodge/src/components/sections/landing/reservation-email.astro", void 0);

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="pt-8 pb-12 md:pt-12 lg:pt-16"> <div class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-end"> <div> <h1 class="max-w-3xl text-5xl leading-[1.02] font-medium tracking-tight text-balance text-zinc-800 sm:text-6xl xl:text-7xl dark:text-zinc-100">
The Best Resort for
<span class="block">best holiday in the</span> <span class="block">Inhambane</span> </h1> <img src="/mangal-entrance.png" alt="Mangal Beach Lodge entrance" class="mt-7 mr-20 ml-auto h-20 w-full max-w-[290px] rounded-full object-cover sm:h-24 sm:max-w-[340px] lg:mr-auto" loading="lazy" decoding="async"> <p class="mt-6 max-w-md text-sm leading-relaxed text-pretty text-zinc-500 sm:max-w-xl sm:text-base dark:text-zinc-400">
Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean commodo
        ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus donec.
</p> <div class="mt-10 flex flex-col gap-4 rounded-[1.75rem] bg-neutral-100 px-6 py-5 text-zinc-900 sm:flex-row sm:items-center sm:justify-between dark:bg-zinc-900 dark:text-zinc-100"> <p class="text-lg font-semibold sm:text-2xl">
* Vilankulos, Inhambane, Mozambique
</p> <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
See direction
<svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path d="M3.75 10H16.25M16.25 10L10 3.75M16.25 10L10 16.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a> </div> </div> ${renderComponent($$result, "ReservationEmail", $$ReservationEmail, {})} <div class="block md:hidden"> ${renderComponent($$result, "MobileReservationEmail", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/mangalbeachlodge/src/components/sections/landing/mobile-reservation-email", "client:component-export": "default" })} </div> </div> </section>`;
}, "C:/Users/User/Documents/mangalbeachlodge/src/components/sections/landing/HeroSection.astro", void 0);

const facilities = [
  { label: "Surfing Equipment", active: true },
  { label: "Private Pool" },
  { label: "Bar" },
  { label: "SCUBA Diving" },
  { label: "WiFi / Internet" },
  { label: "Spa & Sauna" },
  { label: "Restaurant" },
  { label: "Cleaning Services" },
  { label: "CCTV" },
  { label: "24 Hrs Security" }
];
function FacilitiesSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-14 md:py-20 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-8 md:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-xl border border-border shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative aspect-4/3 w-full sm:aspect-16/10", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/availability-form-bg.png",
            alt: "Aerial view of Mangal Beach Lodge",
            className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]",
            loading: "lazy",
            decoding: "async"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent" }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "lg",
            className: "absolute bottom-5 left-5 gap-3 border-0 bg-transparent px-0 hover:bg-transparent sm:bottom-7 sm:left-7",
            "aria-label": "Play tour video",
            children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-13 w-13 items-center justify-center rounded-full border-[1.5px] border-white/50 bg-white/12 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white/22", children: /* @__PURE__ */ jsx(Play, { className: "ml-0.5 size-5 fill-white text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium normal-case tracking-wide text-white/90", children: "Play tour video" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute right-5 bottom-5 hidden items-center gap-2 sm:right-7 sm:bottom-7 lg:flex",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("div", { className: "h-15 w-22 overflow-hidden rounded-lg border-2 border-white/65 shadow-lg", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/mangal-entrance.png",
                alt: "",
                className: "h-full w-full object-cover",
                loading: "lazy",
                decoding: "async"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "h-15 w-22 overflow-hidden rounded-lg border-2 border-white/65 shadow-lg", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/availability-form-bg.png",
                alt: "",
                className: "h-full w-full object-cover",
                loading: "lazy",
                decoding: "async"
              }
            ) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "w-fit text-muted-foreground", children: "* Offering the Most Complete Facilities" }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl", children: [
        "Offering the Most",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        "Complete Facilities"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.938rem]", children: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo ligula eget dolor." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap gap-2 sm:mt-8", children: [
        facilities.map((f) => /* @__PURE__ */ jsx(
          Badge,
          {
            variant: f.active ? "default" : "outline",
            className: `rounded-full px-3.5 py-1.5 text-xs normal-case tracking-normal sm:px-4 sm:py-2 sm:text-[0.8125rem] ${f.active ? "bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-ring"}`,
            children: f.label
          },
          f.label
        )),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon-sm",
            className: "rounded-full",
            "aria-label": "Show more facilities",
            children: /* @__PURE__ */ jsx(Plus, { className: "size-4" })
          }
        )
      ] })
    ] })
  ] }) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "FacilitiesSection", FacilitiesSection, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@components/sections/landing/FacilitiesSection.tsx", "client:component-export": "default" })}  ` })}`;
}, "C:/Users/User/Documents/mangalbeachlodge/src/pages/index.astro", void 0);

const $$file = "C:/Users/User/Documents/mangalbeachlodge/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
