import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { generateQuestions } from "@/utils/geminiAI";

const QuestionItemCard = ({ question, onRefresh }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  const generateNewQuestions = async () => {
    try {
      const InputPrompt = `
        Job Positions: ${question.jobPosition},
        Job Description: ${question.jobDesc},
        Years of Experience: ${question.jobExperience},
        Which type of question: ${question.typeQuestion},
        This company previous question: ${question.company},
        Based on this information, please provide 5 new and different interview questions with answers in JSON format.
        Each question and answer should be fields in the JSON. Ensure "Question" and "Answer" are fields.
      `;

      const MockQuestionJsonResp = await generateQuestions(InputPrompt);

      if (MockQuestionJsonResp) {
        await db.insert(Question).values({
          mockId: uuidv4(),
          MockQuestionJsonResp: MockQuestionJsonResp,
          jobPosition: question.jobPosition,
          jobDesc: question.jobDesc,
          jobExperience: question.jobExperience,
          typeQuestion: question.typeQuestion,
          company: question.company,
          createdBy: question.createdBy,
          createdAt: moment().format("YYYY-MM-DD"),
        });

        onRefresh();
      }
    } catch (error) {
      console.error("Error generating new questions:", error);
      alert("There was an error generating new questions. Please try again.");
    }
  };

  return (
    <div className="border border-gray-500 shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{question?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {question?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">Created At: {question.createdAt}</h2>

      <div className="flex justify-between mt-2 gap-5 ">
        <Button onClick={onStart} size="sm" className="w-full">
          Start
        </Button>
        <Button onClick={generateNewQuestions} size="sm" className="w-full">
          Generate New
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
