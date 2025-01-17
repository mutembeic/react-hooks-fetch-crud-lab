
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setQuestions(questions.filter((question) => question.id !== id));
      } else {
        console.error("Error deleting question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm
          onAddQuestion={(newQuestion) =>
            setQuestions([...questions, newQuestion])
          }
        />
      ) : (
        <QuestionList questions={questions} onDelete={deleteQuestion} />
      )}
    </main>
  );
}

export default App;
