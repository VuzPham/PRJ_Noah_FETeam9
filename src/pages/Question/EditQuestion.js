import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestions } from '../../hooks/useQuestions';

const QuestionEditPage = () => {
  const { id } = useParams();
  const { questions, updateQuestion } = useQuestions();
  const [question, setQuestion] = useState(questions.find((q) => q.id === parseInt(id)) || { text: '', answer: '' });
  const navigate = useNavigate();

  const handleUpdateQuestion = () => {
    updateQuestion(question);
    navigate('/questions');
  };

  return (
    <div>
      <h1>Edit Question</h1>
      <input
        type="text"
        value={question.text}
        onChange={(e) => setQuestion({ ...question, text: e.target.value })}
      />
      <input
        type="text"
        value={question.answer}
        onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
      />
      <button onClick={handleUpdateQuestion}>Save</button>
    </div>
  );
};

export default QuestionEditPage;
