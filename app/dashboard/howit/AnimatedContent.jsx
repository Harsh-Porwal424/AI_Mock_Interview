'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AnimatedContent = () => {
  return (
    <>
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800"
      >
        How It Works
      </motion.h1>
      <section className="max-w-3xl mx-auto space-y-8">
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { step: "Step 1: Prepare for the Interview", content: "Get ready by selecting the type of interview and providing some details about the job position." },
            { step: "Step 2: Start the AI Interview", content: "Our AI will ask you a series of questions and evaluate your responses in real-time." },
            { step: "Step 3: Receive Feedback", content: "Get detailed feedback on your performance, including strengths and areas for improvement." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <AccordionItem value={`item-${index + 1}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{item.step}</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{item.content}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </section>
    </>
  );
};

export default AnimatedContent;
