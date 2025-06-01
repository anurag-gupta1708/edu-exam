
import React, { useState } from 'react';
import Login from '../components/Login';
import ExamInterface from '../components/ExamInterface';
import Results from '../components/Results';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [studentData, setStudentData] = useState({
    email: '',
    password: ''
  });
  const [examResults, setExamResults] = useState(null);

  const handleLogin = (data) => {
    setStudentData(data);
    setCurrentPage('exam');
  };

  const handleExamComplete = (results) => {
    setExamResults(results);
    setCurrentPage('results');
  };

  const handleRetake = () => {
    setCurrentPage('exam');
    setExamResults(null);
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setStudentData({ class: '', subject: '' });
    setExamResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {currentPage === 'exam' && (
        <ExamInterface 
          studentData={studentData} 
          onComplete={handleExamComplete}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'results' && (
        <Results 
          results={examResults} 
          onRetake={handleRetake}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Index;
