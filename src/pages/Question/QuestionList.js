import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useQuestions } from '../../hooks/useQuestions';
import styles from './Question.module.scss';

const QuestionList = () => {
  const {
    questions,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    addAnswer,
    deleteAnswer,
    updateAnswer,
  } = useQuestions();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list'); // 'list', 'addQuestion', 'editQuestion', 'addAnswer', 'editAnswer'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ text: '', answer: '' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5; // Number of questions per page

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Get current page questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handleAddQuestion = () => {
    addQuestion(newQuestion);
    setNewQuestion({ text: '', answer: '' });
    setCurrentView('list');
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setCurrentView('editQuestion');
  };

  const handleUpdateQuestion = () => {
    updateQuestion(selectedQuestion);
    setSelectedQuestion(null);
    setCurrentView('list');
  };

  const handleAddAnswer = (question) => {
    setSelectedQuestion(question);
    setCurrentView('addAnswer');
  };

  const handleUpdateAnswer = () => {
    updateAnswer(selectedQuestion.id, selectedQuestion.answer);
    setSelectedQuestion(null);
    setCurrentView('list');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles['container']}>

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
                  {question.text}
                  <div className={styles['actions']}>
                    <button onClick={() => handleEditQuestion(question)} className={styles['btn-edit']}>
                      Edit Question <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => deleteQuestion(question.id)} className={styles['btn-delete']}>
                      Delete Question <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
                {question.answer && (
                  <div className={styles['answer-text']}>
                    <FontAwesomeIcon icon={faPlus} className={styles['answer-icon']} /> {question.answer}
                    <div className={styles['actions']}>
                      <button onClick={() => {
                        setSelectedQuestion(question);
                        setCurrentView('editAnswer');
                      }} className={styles['btn-edit']}>
                        Edit Answer <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => deleteAnswer(question.id)} className={styles['btn-delete']}>
                        Delete Answer <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                )}
                {!question.answer && (
                  <div className={styles['answer-text']}>
                    <button onClick={() => handleAddAnswer(question)} className={styles['btn-add-answer']}>
                      Add Answer <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination controls */}
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
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
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
            value={selectedQuestion.text}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, text: e.target.value })}
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

      {currentView === 'addAnswer' && selectedQuestion && (
        <div className={styles['form-container']}>
          <h2>Add Answer</h2>
          <input
            type="text"
            placeholder="Enter answer"
            value={selectedQuestion.answer || ''}
            onChange={(e) =>
              setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })
            }
            className={styles['input']}
          />
          <button onClick={handleUpdateAnswer} className={styles['btn-save']}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
          <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      )}

      {currentView === 'editAnswer' && selectedQuestion && (
        <div className={styles['form-container']}>
          <h2>Edit Answer</h2>
          <input
            type="text"
            value={selectedQuestion.answer || ''}
            onChange={(e) =>
              setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })
            }
            className={styles['input']}
          />
          <button onClick={handleUpdateAnswer} className={styles['btn-save']}>
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

export default QuestionList;
