
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ClassSubjectSelection = ({ onSubmit, onLogout }) => {
  const [formData, setFormData] = useState({
    class: '',
    subject: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.class && formData.subject) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Select Class & Subject
          </h1>
          <Button variant="outline" onClick={onLogout}>logout</Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maths">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            disabled={!formData.class || !formData.subject}
          >
            Start Exam
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClassSubjectSelection;
