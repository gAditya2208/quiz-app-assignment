import React, { useMemo } from 'react';

const Question = ({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswerSelect, 
  isAnswered,
  timeLeft 
}) => {
  // Combine correct and incorrect answers and shuffle them only once per question
  const allAnswers = useMemo(() => {
    if (!question) return [];
    const { correct_answer, incorrect_answers } = question;
    return [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
  }, [question]);

  if (!question) return null;

  const { question: questionText, correct_answer } = question;

  const getAnswerClassName = (answer) => {
    if (!isAnswered) {
      return selectedAnswer === answer ? 'btn-option selected' : 'btn-option';
    }
    
    if (answer === correct_answer) {
      return 'btn-option correct';
    }
    
    if (answer === selectedAnswer && answer !== correct_answer) {
      return 'btn-option incorrect';
    }
    
    return 'btn-option';
  };

  const decodeHtml = (html) => {
    // First decode URL encoding, then HTML entities
    const urlDecoded = decodeURIComponent(html);
    const txt = document.createElement('textarea');
    txt.innerHTML = urlDecoded;
    return txt.value;
  };

  return (
    <div className="question-container">
      <div className="question-number">
        Question {questionNumber}
      </div>
      <h2 className="question-text">
        {decodeHtml(questionText)}
      </h2>
      
      <div className="options-container">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            className={getAnswerClassName(answer)}
            onClick={() => onAnswerSelect(answer)}
            disabled={isAnswered || timeLeft === 0}
          >
            {decodeHtml(answer)}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: selectedAnswer === correct_answer ? '#d4edda' : '#f8d7da',
          borderRadius: '8px',
          color: selectedAnswer === correct_answer ? '#155724' : '#721c24',
          fontWeight: '500'
        }}>
          {selectedAnswer === correct_answer ? '✅ Correct!' : '❌ Incorrect!'}
          {selectedAnswer !== correct_answer && (
            <div style={{ marginTop: '10px' }}>
              The correct answer is: <strong>{decodeHtml(correct_answer)}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
