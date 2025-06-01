
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    class: '',
    subject: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.class && formData.subject) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Welcome to Edu Exam Portal
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <Input
              type="text"
              placeholder="Enter your class (e.g., 10,12)"
              value={formData.class}
              onChange={(e) => setFormData({...formData, class: e.target.value})}
              className="bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <Input
              type="text"
              placeholder="maths,science,english,hindi"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="bg-white"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            disabled={!formData.class || !formData.subject}
          >
            login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
