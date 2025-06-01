
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = ({ studentData, examHistory, onBack, onLogout }) => {
  const calculateOverallStats = () => {
    if (examHistory.length === 0) return { avgPercentage: 0, totalExams: 0, totalCorrect: 0, totalAttempted: 0 };
    
    const totalPercentage = examHistory.reduce((sum, exam) => sum + exam.percentage, 0);
    const totalCorrect = examHistory.reduce((sum, exam) => sum + exam.correct, 0);
    const totalAttempted = examHistory.reduce((sum, exam) => sum + exam.totalAttempted, 0);
    
    return {
      avgPercentage: Math.round(totalPercentage / examHistory.length),
      totalExams: examHistory.length,
      totalCorrect,
      totalAttempted
    };
  };

  const stats = calculateOverallStats();

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      {/* Header */}
      <div className="bg-gray-300 p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Student Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>Back to Results</Button>
          <Button variant="outline" onClick={onLogout}>logout</Button>
        </div>
      </div>

      {/* Student Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{studentData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Class</p>
              <p className="font-medium">Class {studentData.class}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalExams}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.avgPercentage}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.totalCorrect}</div>
              <div className="text-sm text-gray-600">Total Correct</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.totalAttempted}</div>
              <div className="text-sm text-gray-600">Total Attempted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam History */}
      <Card>
        <CardHeader>
          <CardTitle>Exam History</CardTitle>
        </CardHeader>
        <CardContent>
          {examHistory.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No exams taken yet</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {examHistory.map((exam, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Class {exam.class} - {exam.subject}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(exam.date).toLocaleDateString()} at {new Date(exam.date).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      exam.percentage >= 80 ? 'bg-green-100 text-green-800' :
                      exam.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exam.percentage}%
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Attempted</p>
                      <p className="font-medium">{exam.totalAttempted}/{exam.totalQuestions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Correct</p>
                      <p className="font-medium text-green-600">{exam.correct}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wrong</p>
                      <p className="font-medium text-red-600">{exam.wrong}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Score</p>
                      <p className="font-medium">{exam.percentage}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
