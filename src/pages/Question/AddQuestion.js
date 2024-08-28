import React, { useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';

const QuestionAddPage = () => {
  const { addQuestion } = useQuestions();
  const [newQuestion, setNewQuestion] = useState({ text: '', answer: '' });

  const handleAddQuestion = () => {
    addQuestion(newQuestion);
    setNewQuestion({ text: '', answer: '' }); // Reset form
  };

  return (
    <div>
      <h1>Add Question</h1>
      <input
        type="text"
        placeholder="Question text"
        value={newQuestion.text}
        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={newQuestion.answer}
        onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
      />
      <button onClick={handleAddQuestion}>Add</button>
    </div>
  );
};

export default QuestionAddPage;
