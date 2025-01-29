import QuestionForm from "@/components/forms/QuestionForm";
import Image from "next/image";
import React from "react";

const AskAQuestion = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Image
          className="invert-colors"
          src={"/icons/question.svg"}
          width={35}
          height={35}
          alt="Question Mark"
        />
        <h1 className="h1-bold text-dark100_light900">Ask a public question</h1>
      </div>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskAQuestion;
