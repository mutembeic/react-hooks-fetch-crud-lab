import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = React.useState(
    correctIndex
  );

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectIndexChange = async (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    setSelectedCorrectIndex(newCorrectIndex);

    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex,
        }),
      });
      if (response.ok) {
        onUpdate(id, newCorrectIndex);
      } else {
        console.error("Error updating question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedCorrectIndex} onChange={handleCorrectIndexChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
