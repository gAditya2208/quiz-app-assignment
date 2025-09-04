import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Question from './Question';
import { fetchQuestions } from '../services/api';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = new URLSearchParams(location.search).get('difficulty') || 'medium';

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchQuestions(difficulty);
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setTimeLeft(30);
      setIsAnswered(false);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  const handleAnswerSelect = useCallback((answer) => {
    if (isAnswered) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
    setIsAnswered(true);
  }, [isAnswered, currentQuestionIndex]);

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30);
      setIsAnswered(false);
    } else {
      // Quiz completed
      const score = calculateScore();
      navigate('/results', { 
        state: { 
          questions, 
          selectedAnswers, 
          score,
          difficulty 
        } 
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeLeft(30);
      setIsAnswered(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswerSelect('timeout');
    }
  }, [timeLeft, isAnswered, handleAnswerSelect]);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading questions...</h2>
          <p>Please wait while we prepare your quiz.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="btn" onClick={loadQuestions}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="error">
          <h2>No questions available</h2>
          <p>Please try again later.</p>
          <button className="btn" onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="container">
      {timeLeft > 0 && !isAnswered && (
        <div className="timer">
          ⏰ {timeLeft}s
        </div>
      )}
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="score-display">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
      </div>

      <Question
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        isAnswered={isAnswered}
        timeLeft={timeLeft}
      />

      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        
        <button
          className="btn"
          onClick={handleNext}
          disabled={!isAnswered && timeLeft > 0}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;