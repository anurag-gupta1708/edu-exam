
import React, { useState } from 'react';
import Login from '../components/Login';
import ClassSubjectSelection from '../components/ClassSubjectSelection';
import ExamInterface from '../components/ExamInterface';
import Results from '../components/Results';
import Profile from '../components/Profile';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [studentData, setStudentData] = useState({
    email: '',
    password: '',
    class: '',
    subject: ''
  });
  const [examResults, setExamResults] = useState(null);
  const [allExamHistory, setAllExamHistory] = useState([]);

  const handleLogin = (data) => {
    setStudentData({...studentData, ...data});
    setCurrentPage('classSubject');
  };

  const handleClassSubjectSubmit = (data) => {
    setStudentData({...studentData, ...data});
    setCurrentPage('exam');
  };

  const handleExamComplete = (results) => {
    const examRecord = {
      ...results,
      date: new Date().toISOString(),
      class: studentData.class,
      subject: studentData.subject
    };
    setExamResults(examRecord);
    setAllExamHistory([...allExamHistory, examRecord]);
    setCurrentPage('results');
  };

  const handleRetake = () => {
    setCurrentPage('classSubject');
    setExamResults(null);
  };

  const handleViewProfile = () => {
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setStudentData({ email: '', password: '', class: '', subject: '' });
    setExamResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {currentPage === 'classSubject' && (
        <ClassSubjectSelection 
          onSubmit={handleClassSubjectSubmit}
          onLogout={handleLogout}
        />
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
          onViewProfile={handleViewProfile}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'profile' && (
        <Profile 
          studentData={studentData}
          examHistory={allExamHistory}
          onBack={() => setCurrentPage('results')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Index;
