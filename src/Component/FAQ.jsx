import React, { useState } from "react";

const faqs = [
  {
    question: "What happens during the free consultation call?",
    answer:
      "We’ll audit your current marketing and lead gen setup, show you what’s working (or not), and give you a custom roadmap to scale your business. It’s completely free and no pressure to sign up for anything.",
  },
  {
    question:
      "Is this only for real estate, finance, and education businesses?",
    answer:
      "We specialize in lead-based businesses—and real estate, finance, and education are where we’ve gotten the biggest wins. But if you rely on generating and converting leads, we can likely help.",
  },
  {
    question: "Do I need to have a big budget to work with you?",
    answer:
      "Not at all. We tailor our strategies based on your current stage. Whether you’re just starting or already spending on ads, we can build a system that fits your budget and goals.",
  },
  {
    question:
      "What if I’ve tried ads or automation before and didn’t get results?",
    answer:
      "That’s exactly why we start with a free strategy call—to find out why things didn’t work before and how to fix it. Most campaigns fail due to poor targeting, weak offers, or lack of follow-up. We solve all three.",
  },
  {
    question: "Do you actually set everything up for me?",
    answer:
      'Yes. We offer full “done-for-you” services including ad creation, funnel building, CRM automation, and more. You focus on closing deals—we handle the tech and execution.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white w-full py-20 px-6 md:px-20 font-sans text-zinc-800">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-zinc-500 text-sm uppercase tracking-widest font-medium mb-3">
          STILL NOT SURE?
        </p>
        <h2 className="text-5xl font-extrabold text-zinc-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-zinc-600">
          Have questions about our services? You're in the right place!
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-zinc-200 rounded-xl shadow-sm transition-all"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-zinc-800 focus:outline-none"
            >
              <span>{`Question ${index + 1}: ${faq.question}`}</span>
              <span className="text-2xl">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-zinc-600 text-base leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
