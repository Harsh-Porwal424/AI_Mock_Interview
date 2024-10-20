'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AnimatedAccordion = () => (
  <Accordion type="single" collapsible className="space-y-4">
    {[
      { step: "Step 1: Set the Stage", content: "Start by selecting the interview format that aligns with your goals—whether it’s a behavioral, technical, or general interview. Next, provide specific details about the job role you are preparing for, including the position, industry, and key skills required. This information helps us tailor the interview experience, ensuring that the questions and evaluation closely match real-world scenarios relevant to your target job." },
      { step: "Step 2: Begin Your AI-Powered Interview", content: "Our AI will ask you a series of questions and evaluate your responses in real-time. You can choose to answer questions one at a time or let the AI handle the entire interview." },
      { step: "Step 3: Unlock Actionable Insights", content: "Get detailed feedback on your performance, including strengths and areas for improvement. This feedback is designed to be actionable, providing you with clear insights that you can use to enhance your interview skills and boost your confidence." },
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
);

export default AnimatedAccordion;
