
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Results = ({ results, onRetake, onViewProfile, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-200 p-4">
      {/* Header */}
      <div className="bg-gray-300 p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Edu Exam Portal</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onViewProfile}>Profile</Button>
          <Button variant="outline" onClick={onLogout}>logout</Button>
        </div>
      </div>

      {/* After Submitted Message */}
      <div className="bg-gray-400 text-white text-center py-3 rounded-lg mb-6">
        after submitted
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            {results.totalAttempted}
          </div>
          <div className="text-sm text-gray-600">
            total<br />attempts
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {results.correct}
          </div>
          <div className="text-sm text-gray-600">
            right
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {results.wrong}
          </div>
          <div className="text-sm text-gray-600">
            wrong
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {results.percentage}%
          </div>
          <div className="text-sm text-gray-600">
            percent<br />age
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-lg mb-6">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-lg font-bold">{results.percentage}%</span>
          </div>
        </div>
        <Progress value={results.percentage} className="h-3" />
      </div>

      {/* Question Analysis */}
      <div className="bg-white p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Question Analysis</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.questionResults.map((result) => (
            <div 
              key={result.questionNumber} 
              className={`p-4 rounded-lg border-2 ${
                result.isCorrect ? 'border-green-200 bg-green-50' : 
                result.wasAttempted ? 'border-red-200 bg-red-50' : 
                'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800">
                  Q{result.questionNumber}: {result.question}
                </h3>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  result.isCorrect ? 'bg-green-100 text-green-800' :
                  result.wasAttempted ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {result.isCorrect ? 'Correct' : result.wasAttempted ? 'Wrong' : 'Not Attempted'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Your Answer:</strong> {result.userAnswer}</p>
                <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-gray-300 p-6 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            about
          </button>
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            feedback
          </button>
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            share your experience
          </button>
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            contact us
          </button>
        </div>
        <div className="text-center mt-4 pt-4 border-t border-gray-400">
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            copyright
          </button>
        </div>
        
        <div className="text-center mt-6">
          <Button 
            onClick={onRetake}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Take Another Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
