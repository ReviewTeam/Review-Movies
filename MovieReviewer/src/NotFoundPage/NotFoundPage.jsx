import React from 'react';
import './NotFoundPage.css';
import { Link } from 'react-router-dom'; 

const NotFoundPage = () => {
  const randomPrompts = [
    "Looks like Danny might've messed up on this...",
    "Hmm, Alex might've screwed this up...",
    "This could be George's fault...",
    "Not to point any fingers, but I think it was Cosmin...",
    "Jany, you had one job...",
  ];

  const randomIndex = Math.floor(Math.random() * randomPrompts.length);
  const randomPrompt = randomPrompts[randomIndex];

  return (
    <div className="container">
      <div className="inner-container">
        <div className="error_message">Oops! 404 Error</div>
        <div className="prompt">{randomPrompt}</div>
        <Link to="/" className="back-button">Back to Home Page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
