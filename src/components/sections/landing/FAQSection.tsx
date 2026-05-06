import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getFaqs = (lang: "en" | "pt") => [
  {
    question: lang === "pt" ? "Quantos minutos do aeroporto para o lodge ?" : "How many minutes from the airport to the lodge?",
    answer: lang === "pt" ? "Aproximadamente 18 minutos." : "Approximately 18 minutes.",
  },
  {
    question: lang === "pt" ? "Tem Wi-Fi ?" : "Do you have Wi-Fi?",
    answer: lang === "pt" ? "Sim, temos." : "Yes, we do.",
  },
];

export default function FAQSection({ lang = "en" }: { lang?: "en" | "pt" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = getFaqs(lang);

  const t = {
    en: {
      badge: "Frequently Asked Questions",
      title: "Any questions?",
      desc: "Find the answers to the most common questions below."
    },
    pt: {
      badge: "Perguntas Frequentes",
      title: "Alguma dúvida?",
      desc: "Encontre as respostas para as perguntas mais comuns abaixo."
    }
  }[lang];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-3xl py-20 px-4 sm:px-6 md:py-28">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
          {t.badge}
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 text-sm text-neutral-500">
          {t.desc}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
              >
                <span className="font-medium text-neutral-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-neutral-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm text-neutral-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
