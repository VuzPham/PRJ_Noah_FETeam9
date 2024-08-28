// src/pages/Question/DeleteQuestion.js
import React from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { useParams, useNavigate } from 'react-router-dom';

export const DeleteQuestionPage = () => {
  const { deleteQuestion } = useQuestions();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteQuestion(parseInt(id));
    navigate('/questions');
  };

  return (
    <div>
      <h2>Delete Question</h2>
      <p>Are you sure you want to delete this question?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/questions')}>Cancel</button>
    </div>
  );
};
