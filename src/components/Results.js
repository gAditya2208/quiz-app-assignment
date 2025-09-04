import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [highScore, setHighScore] = useState(0);
  
  const { questions, selectedAnswers, score, difficulty } = location.state || {};

  useEffect(() => {
    if (!questions || !selectedAnswers || !score) {
      navigate('/');
      return;
    }

    // Update high score in localStorage
    const highScoreKey = `highScore_${difficulty}`;
    const currentHighScore = localStorage.getItem(highScoreKey) || 0;
    if (score.correct > currentHighScore) {
      localStorage.setItem(highScoreKey, score.correct.toString());
      setHighScore(score.correct);
    } else {
      setHighScore(parseInt(currentHighScore));
    }
  }, [questions, selectedAnswers, score, difficulty, navigate]);

  const handleRestart = () => {
    navigate(`/quiz?difficulty=${difficulty}`);
  };

  const handleNewQuiz = () => {
    navigate('/');
  };

  const getScoreMessage = () => {
    const percentage = (score.correct / score.total) * 100;
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getScoreColor = () => {
    const percentage = (score.correct / score.total) * 100;
    if (percentage >= 80) return "#28a745";
    if (percentage >= 60) return "#ffc107";
    return "#dc3545";
  };

  const decodeHtml = (html) => {
    // First decode URL encoding, then HTML entities
    const urlDecoded = decodeURIComponent(html);
    const txt = document.createElement('textarea');
    txt.innerHTML = urlDecoded;
    return txt.value;
  };

  if (!questions || !selectedAnswers || !score) {
    return (
      <div className="container">
        <div className="error">
          <h2>No results found</h2>
          <p>Please take a quiz first.</p>
          <button className="btn" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="score-display">
        <h1 style={{ color: getScoreColor() }}>{getScoreMessage()}</h1>
        <h2>Your Score: {score.correct}/{score.total}</h2>
        <p>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
        {highScore > 0 && (
          <p style={{ color: '#667eea', fontWeight: '600' }}>
            High Score: {highScore}/{score.total}
          </p>
        )}
      </div>

      <div className="results-summary">
        <h3>Quiz Summary</h3>
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.correct_answer;
          
          return (
            <div key={index} className="result-item">
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                  Q{index + 1}: {decodeHtml(question.question)}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Your answer: {userAnswer ? decodeHtml(userAnswer) : 'Not answered'}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Correct answer: {decodeHtml(question.correct_answer)}
                </div>
              </div>
              <div className={`result-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="results-container">
        <button className="btn" onClick={handleRestart}>
          Try Again
        </button>
        <button className="btn btn-secondary" onClick={handleNewQuiz}>
          New Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;
