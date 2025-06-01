
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const sampleQuestions = [
  {
    id: 1,
    question: "What is 2+2?",
    options: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    id: 3,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correct: 1
  },
  {
    id: 4,
    question: "What is 5 × 3?",
    options: ["12", "15", "18", "20"],
    correct: 1
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1
  }
];

const ExamInterface = ({ studentData, onComplete, onLogout }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({
        ...answers,
        [currentQuestion]: selectedOption
      });
      
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(answers[currentQuestion + 1] || null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setAnswers({
        ...answers,
        [currentQuestion]: selectedOption
      });
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = {
      ...answers,
      [currentQuestion]: selectedOption
    };

    let correct = 0;
    let totalAttempted = 0;

    Object.keys(finalAnswers).forEach(questionIndex => {
      if (finalAnswers[questionIndex] !== null) {
        totalAttempted++;
        if (finalAnswers[questionIndex] === sampleQuestions[questionIndex].correct) {
          correct++;
        }
      }
    });

    const results = {
      totalQuestions: sampleQuestions.length,
      totalAttempted,
      correct,
      wrong: totalAttempted - correct,
      percentage: totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0
    };

    onComplete(results);
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      {/* Header */}
      <div className="bg-gray-300 p-4 rounded-lg mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Edu Exam Portal</h1>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>class: {studentData.class}</span>
            <span>subject: {studentData.subject}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">timer: {formatTime(timeLeft)}</span>
          <Button variant="outline" onClick={onLogout}>logout</Button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          total question {sampleQuestions.length}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Area */}
      <div className="bg-gray-300 p-6 rounded-lg mb-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            question {currentQuestion + 1}: {sampleQuestions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  selectedOption === index 
                    ? 'bg-blue-100 border-blue-300' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                option {index + 1}: {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            previous
          </Button>
          
          <div className="flex gap-2">
            {currentQuestion === sampleQuestions.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                submit
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;
