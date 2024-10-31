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
        
        // Basic string cleanup
        let cleanedData = rawData
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .replace(/\n/g, ' ')
          .replace(/\r/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        // Fix quotes and special characters
        cleanedData = cleanedData
          .replace(/(?<=:\s*)"([^"]*)"([^"]*)"([^"]*)"(?=\s*[,}])/g, '"$1\'$2\'$3"')
          .replace(/(?<=:\s*)"([^"]*),\s*including:\s*([^"]*)"(?=\s*[,}])/g, '"$1 including $2"')
          .replace(/•/g, '-');

        try {
          const parsedData = JSON.parse(cleanedData);
          
          if (parsedData.questions) {
            setQuestionData(parsedData.questions);
          } else if (Array.isArray(parsedData)) {
            setQuestionData(parsedData);
          } else {
            setQuestionData([parsedData]);
          }
        } catch (error) {
          // If parsing fails, try one more time with more aggressive cleaning
          cleanedData = cleanedData
            .replace(/[^\x20-\x7E]/g, '')  // Remove all non-printable characters
            .replace(/,(\s*[}\]])/g, '$1')  // Remove trailing commas
            .replace(/:\s*"([^"]*)"(\s*[,}])/g, ':"$1"$2');  // Fix quote escaping

          const parsedData = JSON.parse(cleanedData);
          if (parsedData.questions) {
            setQuestionData(parsedData.questions);
          } else if (Array.isArray(parsedData)) {
            setQuestionData(parsedData);
          } else {
            setQuestionData([parsedData]);
          }
        }
      } else {
        throw new Error("No question data found");
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
    if (!questionData) return null;

    const questions = Array.isArray(questionData) 
      ? questionData 
      : [questionData];

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
            // PDF Mode - Show all content without Accordion
            <div className="space-y-4">
              {questions.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                  <div className="text-lg font-medium mb-4">
                    {item.Question || `Question ${index + 1}`}
                  </div>
                  <div className="prose max-w-none">
                    {item.Answer || "No answer provided"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Normal Mode - Show Accordion
            <Accordion type="single" collapsible className="space-y-4">
              {questions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem 
                    value={`item-${index + 1}`} 
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4">
                      <span className="text-lg font-medium">
                        {item.Question || `Question ${index + 1}`}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4">
                      <div className="prose max-w-none">
                        {item.Answer || "No answer provided"}
                      </div>
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
