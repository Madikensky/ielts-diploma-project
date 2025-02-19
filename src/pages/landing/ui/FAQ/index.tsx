"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqQuestions = [
  {
    key: "1",
    question: "How does the 7Easy platform work?",
    answer:
      "7Easy helps you prepare for the IELTS exam by offering interactive training for all four sections of the test.",
  },
  {
    ket: "2",
    question: "How do Reading and Listening exercises work?",
    answer:
      "These sections are presented as quizzes, similar to the official IELTS exam format.",
  },
  {
    question: "How does the Writing trainer work?",
    answer:
      "You receive a random essay topic, write your response, and then AI analyzes it and provides feedback. You can refine your essay and resubmit it as many times as you like.",
  },
  {
    question: "How does the Speaking practice work?",
    answer:
      "You interact with AI, which simulates an IELTS examiner by asking questions and evaluating your responses.",
  },
  {
    question: "How can I access the training exercises?",
    answer:
      "Simply register on the platform, choose the desired trainer, and start practicing.",
  },
  {
    question: "Are there any limits on the number of attempts?",
    answer: "No, you can practice as many times as you want.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="lg:p-10">
      <h2 className="text-center text-2xl font-semibold">FAQ</h2>
      <Accordion type="single" collapsible>
        {faqQuestions.map(({ question, answer }, index) => {
          return (
            <AccordionItem
              value={`fag-item-${index}`}
              key={`fag-item-${index}`}
            >
              <AccordionTrigger className="font-semibold md:text-xl text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};
