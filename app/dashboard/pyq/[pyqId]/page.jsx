"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePDF } from 'react-to-pdf';

const Page = ({ params }) => {
  const [questionData, setQuestionData] = useState();
  const { toPDF, targetRef } = usePDF({filename: 'interview-questions.pdf'});
  const [isPdfMode, setIsPdfMode] = useState(false);

  useEffect(() => {
    console.log(params.pyqId);
    getQuestionDetails();
  }, []);

  const getQuestionDetails = async () => {
    try {
      const result = await db
        .select()
        .from(Question)
        .where(eq(Question.mockId, params.pyqId));
      
      if (result && result.length > 0) {
        const rawData = result[0].MockQuestionJsonResp;
        // Remove any markdown formatting if present
        const cleanedData = rawData.replace(/```json\n|\n```/g, '').trim();
        // Find the first occurrence of '{' and the last occurrence of '}'
        const startIndex = cleanedData.indexOf('{');
        const endIndex = cleanedData.lastIndexOf('}');
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          const jsonString = cleanedData.slice(startIndex, endIndex + 1);
          const parsedQuestionData = JSON.parse(jsonString);
          setQuestionData(parsedQuestionData);
          console.log("Parsed Question Data:", parsedQuestionData); // Log the parsed data
        } else {
          throw new Error("Invalid JSON structure");
        }
      } else {
        console.error("No question data found");
      }
    } catch (error) {
      console.error("Error fetching or parsing question data:", error);
    }
  };

  const handleDownloadPDF = async () => {
    setIsPdfMode(true);
    // Wait for the state to update and re-render
    await new Promise(resolve => setTimeout(resolve, 0));
    toPDF();
    setIsPdfMode(false);
  };

  const renderQuestions = () => {
    if (!questionData || !questionData.questions) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Interview Questions</h1>
          <Button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-600 text-white">
            Download PDF
          </Button>
        </div>
        <div ref={targetRef}>
          {isPdfMode ? (
            // Render all questions and answers without Accordion when in PDF mode
            <div className="space-y-4">
              {questionData.questions.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                  <h2 className="text-lg font-medium text-gray-700 mb-2">{item.Question || `Question ${index + 1}`}</h2>
                  <p className="text-gray-600">{item.Answer || "No answer provided"}</p>
                </div>
              ))}
            </div>
          ) : (
            // Render Accordion for normal view
            <Accordion type="single" collapsible className="space-y-4">
              {questionData.questions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index + 1}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-lg font-medium text-gray-700">{item.Question || `Question ${index + 1}`}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600">{item.Answer || "No answer provided"}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-10 my-5 bg-white min-h-screen">
      {renderQuestions()}
    </div>
  );
};

export default Page;
