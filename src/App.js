import React, { useState } from "react";
import Survey from "./components/Survey";
import WelcomeScreen from "./components/WelcomeScreen";
import ThankYouScreen from "./components/ThankYouScreen";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsStarted(false);
    }, 5000);
  };

  return (
    <div className="app-container">
      {!isStarted && !isSubmitted && <WelcomeScreen onStart={handleStart} />}
      {isStarted && !isSubmitted && <Survey onSubmit={handleSubmit} />}
      {isSubmitted && <ThankYouScreen />}
    </div>
  );
};

export default App;
