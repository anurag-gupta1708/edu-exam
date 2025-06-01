
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Results = ({ results, onRetake, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-200 p-4">
      {/* Header */}
      <div className="bg-gray-300 p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Edu Exam Portal</h1>
        <Button variant="outline" onClick={onLogout}>logout</Button>
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
            wrong<br />with<br />question<br />no
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
