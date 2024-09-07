import React from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-screen" >
      <h1 className="tittle">Welcome to the Survey!</h1>
      <button className="btn"
        onClick={onStart}
        
      >
        Start
      </button>
    </div>
    </div>
  );
};

export default WelcomeScreen;
