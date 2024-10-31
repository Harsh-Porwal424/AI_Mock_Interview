"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";

const Page = ({ params }) => {
  const [questionData, setQuestionData] = useState();

  useEffect(() => {
    getQuestionDetails();
  }, []);

  const getQuestionDetails = async () => {
    let result;
    try {
      result = await db
        .select()
        .from(Question)
        .where(eq(Question.mockId, params.pyqId));
      
      if (result && result.length > 0) {
        const rawData = result[0].MockQuestionJsonResp;
        
        // First, try parsing directly
        try {
          const directParse = JSON.parse(rawData);
          if (directParse.questions) {
            setQuestionData(directParse.questions);
            return;
          } else if (Array.isArray(directParse)) {
            setQuestionData(directParse);
            return;
          }
        } catch (directError) {
          console.log("Direct parsing failed, trying cleanup...");
        }

        // If direct parsing fails, clean the data
        let cleanedData = rawData
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .replace(/^JSON\s+/i, '')  // Remove JSON prefix case-insensitive
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
          .replace(/\n/g, ' ')
          .replace(/\r/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        // Remove any trailing content after the last valid JSON bracket
        const lastBrace = cleanedData.lastIndexOf('}');
        const lastBracket = cleanedData.lastIndexOf(']');
        const lastValid = Math.max(lastBrace, lastBracket);
        if (lastValid !== -1) {
          cleanedData = cleanedData.substring(0, lastValid + 1);
        }

        const parsedData = JSON.parse(cleanedData);
        
        if (parsedData.questions) {
          setQuestionData(parsedData.questions);
        } else if (Array.isArray(parsedData)) {
          setQuestionData(parsedData);
        } else {
          setQuestionData([parsedData]);
        }
      }
    } catch (error) {
      console.error("Error fetching or parsing question data:", error);
      console.log("Raw data:", result?.[0]?.MockQuestionJsonResp);
    }
  };

  return (
    questionData && (
      <div className="p-10 my-5">
        <Accordion type="single" collapsible>
          {questionData.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index} className="mb-5">
              <AccordionTrigger>{item?.Question}</AccordionTrigger>
              <AccordionContent>{item?.Answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  );
};

export default Page;
