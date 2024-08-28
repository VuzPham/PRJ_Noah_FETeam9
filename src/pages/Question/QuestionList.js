import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../../hooks/useQuestions';
import styles from './Question.module.scss';

const QuestionListPage = () => {
  const { questions, deleteQuestion } = useQuestions();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Question Management</h1>
      <input
        type="text"
        className={styles['search-input']}
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className={styles['question-list']}>
        {filteredQuestions.map((question) => (
          <li key={question.id} className={styles['question-item']}>
            <div className={styles['question-text']}>
              {question.text} - {question.answer}
            </div>
            <div className={styles['actions']}>
              <Link to={`/questions/edit/${question.id}`} className={styles['btn-edit']}>Edit</Link>
              <button onClick={() => deleteQuestion(question.id)} className={styles['btn-delete']}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/questions/add" className={styles['btn-add']}>Add Question</Link>
    </div>
  );
};

export default QuestionListPage;
