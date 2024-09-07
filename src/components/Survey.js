import React, { useState, useEffect } from "react";
import "./Survey.css";

const Survey = ({ onSubmit }) => {
  const questions = [
    { id: 1, question: "How satisfied are you with our products?" },
    { id: 2, question: "How fair are the prices compared to similar retailers?" },
    { id: 3, question: "How satisfied are you with the value for money of your purchase?" },
    { id: 4, question: "On a scale of 1-10 how would you recommend us to your friends and family?" },
    { id: 5, question: "What could we do to improve our service?" },
  ];

  const sessionID = `session-${Date.now()}`;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem(sessionID));
    if (storedAnswers) {
      setAnswers(storedAnswers);
    }
  }, [sessionID]);

  const saveAnswer = (questionID, answer) => {
    const updatedAnswers = { ...answers, [questionID]: answer };
    setAnswers(updatedAnswers);
    localStorage.setItem(sessionID, JSON.stringify(updatedAnswers));
  };

  const handleAnswerChange = (e) => {
    saveAnswer(questions[currentQuestion].id, e.target.value);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    localStorage.setItem(`${sessionID}-status`, "COMPLETED");
    onSubmit();
  };

  return (
    <div className="questions-container">
      <h2 className="questions-tittle">
        Question {currentQuestion + 1}/{questions.length}
      </h2>
      <p className="questions">{questions[currentQuestion].question}</p>
      <input
        type="text"
        value={answers[questions[currentQuestion].id] || ""}
        onChange={handleAnswerChange}
        placeholder="Your answer here..."
        className="input"
      />

      <div>
        <button onClick={handlePrevious} disabled={currentQuestion === 0} className="prev-btn">
          Previous
        </button>
        <button onClick={handleSkip} className="skip-btn">Skip</button>
        <button
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          className="next-btn"
        >
          Next
        </button>
      </div>

      {currentQuestion === questions.length - 1 && (
        <div className="mt-4">
          <button onClick={handleSubmit} className="submit-btn">Submit Survey</button>
        </div>
      )}
    </div>
  );
};

export default Survey;
