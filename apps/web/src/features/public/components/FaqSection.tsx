import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "How will I know my booking is confirmed?",
    answer:
      "Once your booking is complete, check the confirmation details sent to you. If you do not receive them, please get in touch using the contact details on your booking page.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Your confirmed arrival and departure times are shared with your booking details. Please refer to them before you travel, as timings can depend on your reservation.",
  },
  {
    question: "Can I cancel or change my booking?",
    answer:
      "Cancellation and change terms depend on the room and rate you select. Please review the terms shown with your booking before confirming it.",
  },
  {
    question: "How can I pay for my stay?",
    answer:
      "Available payment options are shown during the booking process. Please check the options for your selected room before completing your reservation.",
  },
  {
    question: "Can I bring an extra guest?",
    answer:
      "Guest capacity varies by room. Choose a room that fits everyone in your group, and check its guest limit in the room details before booking.",
  },
  {
    question: "How do I check room availability?",
    answer:
      "Choose your dates and guest count on the rooms page to see the options available for your stay.",
  },
  {
    question: "Are taxes included in the room price?",
    answer:
      "Applicable GST is additional to the displayed starting room price. Please review the final amount shown during booking.",
  },
];

export function FaqSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="overflow-hidden bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-360 gap-9 px-5 py-14 sm:px-8 sm:py-16 md:gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-20 lg:px-14 lg:py-20 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-md lg:sticky lg:top-24"
        >
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
            Before you arrive
          </p>
          <h2
            id="faq-heading"
            className="font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl lg:text-[44px]"
          >
            A few helpful details.
          </h2>
          <p className="mt-3 font-heading text-lg leading-snug text-muted-foreground sm:text-xl">
            Your stay, made clear.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            Find answers to the questions guests often have before choosing a
            room. Your booking details will have the final information for your
            stay.
          </p>
        </motion.div>

        <div className="min-w-0 border-t border-border">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <motion.article
                key={question}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.42,
                  delay: reduceMotion ? 0 : index * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`border-b border-border transition-colors ${isOpen ? "border-l-2 border-l-gold bg-secondary/35 pl-4 sm:pl-5" : "pl-4 sm:pl-5"}`}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:min-h-[72px]"
                  >
                    <span
                      className={`font-heading text-[15px] leading-snug sm:text-base ${isOpen ? "text-foreground" : "text-foreground/90"}`}
                    >
                      {question}
                    </span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pr-4 pb-5 text-sm leading-6 text-muted-foreground sm:pb-6 sm:leading-7">
                    {answer}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
