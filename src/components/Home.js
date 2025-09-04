import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz?difficulty=${difficulty}`);
  };

  return (
    <div className="container">
      <div className="score-display">
        <h1>🎯 Quiz App</h1>
        <p>Test your knowledge with our interactive quiz!</p>
      </div>

      <div className="difficulty-selector">
        <h3>Choose Difficulty Level:</h3>
        <div className="difficulty-buttons">
          <button
            className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
            onClick={() => setDifficulty('easy')}
          >
            Easy
          </button>
          <button
            className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
            onClick={() => setDifficulty('medium')}
          >
            Medium
          </button>
          <button
            className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
            onClick={() => setDifficulty('hard')}
          >
            Hard
          </button>
        </div>
      </div>

      <div className="results-container">
        <button className="btn" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
