import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../../hooks/useQuestions'; // Corrected import path

const QuestionListPage = () => {
  const { questions, deleteQuestion } = useQuestions();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Question Management</h1>
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredQuestions.map((question) => (
          <li key={question.id}>
            {question.text} - {question.answer}
            <Link to={`/questions/edit/${question.id}`}>Edit</Link>
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/questions/add">Add Question</Link>
    </div>
  );
};

export { default as QuestionListPage } from './QuestionList';
export { default as QuestionAddPage } from './AddQuestion'; // Ensure export is correctly defined
export { default as QuestionEditPage } from './EditQuestion'; // Ensure export is correctly defined
