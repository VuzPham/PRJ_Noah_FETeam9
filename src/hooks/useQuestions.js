import { useState } from 'react';

export const useQuestions = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
    { id: 2, text: 'What is a hook in React?', answer: 'A special function that lets you use state and other React features' },
  ]);

  const addQuestion = (question) => {
    setQuestions([...questions, { id: Date.now(), ...question }]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
  };

  return { questions, addQuestion, deleteQuestion, updateQuestion };
};
