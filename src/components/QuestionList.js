import React from "react";
import QuestionItem from "./QuestionItem";  

const QuestionList = ({ questions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdate={(id, correctIndex) => {
            }}
            onDelete={() => handleDelete(question.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
