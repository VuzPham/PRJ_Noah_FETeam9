import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Question.module.scss';

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const questionsPerPage = 5;

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://66bf5cf442533c403145f070.mockapi.io/api/question-answer/id');
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    try {
      const response = await fetch('https://66bf5cf442533c403145f070.mockapi.io/api/question-answer/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      const addedQuestion = await response.json();
      setQuestions([...questions, addedQuestion]);
      setNewQuestion({ question: '', answer: '' }); // Sửa: dùng `question` thay vì `text`
      setCurrentView('list');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setCurrentView('editQuestion');
  };

  const handleUpdateQuestion = async () => {
    try {
      const response = await fetch(`https://66bf5cf442533c403145f070.mockapi.io/api/question-answer/id/${selectedQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedQuestion),
      });

      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions(questions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)));
        setSelectedQuestion(null);
        setCurrentView('list');
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`https://66bf5cf442533c403145f070.mockapi.io/api/question-answer/id/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuestions(questions.filter(question => question.id !== id));
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredQuestions = questions.filter((question) =>
    question?.question?.toLowerCase().includes(searchTerm.toLowerCase()) // Sửa: dùng `question` thay vì `text`
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles['container']}>
      <h1>Question Management</h1>

      {currentView === 'list' && (
        <>
          <div className={styles['search-container']}>
            <span className={styles['search-label']}>Search:</span>
            <input
              type="text"
              className={styles['search-input']}
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setCurrentView('addQuestion')} className={styles['btn-add']}>
            <FontAwesomeIcon icon={faPlus} /> Add Question
          </button>
          <ul className={styles['question-list']}>
            {currentQuestions.map((question) => (
              <li key={question.id} className={styles['question-item']}>
                <div className={styles['question-text']}>
                  {question.question} - {question.answer} {/* Sửa: hiển thị `question` thay vì `text` */}
                  <div className={styles['actions']}>
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className={styles['btn-edit']}
                    >
                      Edit Question <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteQuestion(question.id)} className={styles['btn-delete']}>
                      Delete Question <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className={styles['pagination']}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={styles['pagination-btn']}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${styles['page-item']} ${
                  currentPage === index + 1 ? styles['active'] : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={styles['pagination-btn']}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </>
      )}

      {currentView === 'addQuestion' && (
        <div className={styles['form-container']}>
          <h2>Add New Question</h2>
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion.question} // Sửa: dùng `question` thay vì `text`
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            className={styles['input']}
          />
          <input
            type="text"
            placeholder="Enter answer"
            value={newQuestion.answer}
            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
            className={styles['input']}
          />
          <button onClick={handleAddQuestion} className={styles['btn-save']}>
            <FontAwesomeIcon icon={faSave} /> Add
          </button>
          <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      )}

      {currentView === 'editQuestion' && selectedQuestion && (
        <div className={styles['form-container']}>
          <h2>Edit Question</h2>
          <input
            type="text"
            value={selectedQuestion.question} // Sửa: dùng `question` thay vì `text`
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, question: e.target.value })}
            className={styles['input']}
          />
          <input
            type="text"
            value={selectedQuestion.answer}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })}
            className={styles['input']}
          />
          <button onClick={handleUpdateQuestion} className={styles['btn-save']}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
          <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionManagement;
