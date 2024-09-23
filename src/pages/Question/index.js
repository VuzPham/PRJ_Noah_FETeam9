import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faTrashAlt, faPlus, faSave, faTimes,
  faChevronDown, faChevronUp, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import styles from './Question.module.scss';
import { fetchQuestions, addQuestion, updateQuestion, deleteQuestion } from '../config/api';


const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ questionDescription: '', answer: '', image: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [confirmDeleteQuestionId, setConfirmDeleteQuestionId] = useState(null);
  const [showImageColumn, setShowImageColumn] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const questionsPerPage = 5;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        const allQuestions = data.map(question => ({
          questionDescription: question.questionDescription,
          answer: question.answer,
          image: question.image,
          id: question.id,
          questionid: question.questionid
        }));
        setQuestions(allQuestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAddQuestion = async () => {
    try {
      const addedQuestion = await addQuestion(newQuestion);
      setQuestions(prevQuestions => [...prevQuestions, addedQuestion]);
      setNewQuestion({ questionDescription: '', answer: '', image: '' });
      setCurrentView('list');
    } catch (err) {
      console.error('Error adding question:', err);
    }
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setCurrentView('editQuestion');
  };

  const handleUpdateQuestion = async () => {
    if (!selectedQuestion) return;

    console.log("Updating question ID:", selectedQuestion.id); // Thêm dòng này để kiểm tra ID

    try {
        const updatedQuestion = await updateQuestion(selectedQuestion.id, selectedQuestion);
        setQuestions(prevQuestions => prevQuestions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)));
        setSelectedQuestion(null);
        setCurrentView('list');
    } catch (err) {
        console.error('Error updating question:', err);
        alert('Failed to update question: ' + (err.message || 'Unknown error'));
    }
};


const handleDeleteQuestion = (id) => {
  setConfirmDeleteQuestionId(id);
  setShowConfirmDelete(true);
};

const confirmDelete = async () => {
  console.log('Deleting question with ID:', confirmDeleteQuestionId); // Kiểm tra ID
  try {
      await deleteQuestion(confirmDeleteQuestionId);
      setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== confirmDeleteQuestionId));
      setShowConfirmDelete(false);
  } catch (err) {
      console.error('Error deleting question:', err);
      alert('Failed to delete question: ' + (err.message || 'Unknown error'));
  }
};



  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setConfirmDeleteQuestionId(null);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleSelectQuestion = (id) => {
    setSelectedQuestions(prevSelected =>
      prevSelected.has(id) ? new Set([...prevSelected].filter(x => x !== id)) : new Set(prevSelected).add(id)
    );
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedQuestions) {
      await deleteQuestion(id);
    }
    setQuestions(prevQuestions => prevQuestions.filter(q => !selectedQuestions.has(q.id)));
    setSelectedQuestions(new Set());
  };

  const filteredQuestions = questions.filter((question) =>
    question.questionDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  if (loading) return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}></div>
    </div>
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles['container']}>
      {showConfirmDelete && (
        <div className={styles['confirm-dialog']}>
          <div className={styles['confirm-dialog-content']}>
            <p>Are you sure you want to delete this question?</p>
            <div className={styles['confirm-dialog-button']}>
              <button onClick={confirmDelete} className={styles['btn-confirm']}>
                Yes
              </button>
              <button onClick={cancelDelete} className={styles['btn-cancel']}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles['btn-header']}>
        <button onClick={() => setCurrentView('addQuestion')} className={styles['btn-add']}>
          <FontAwesomeIcon icon={faPlus} /> Add Question
        </button>
        <button onClick={handleDeleteSelected} className={styles['btn-delete-selected']} disabled={selectedQuestions.size === 0}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete Selected
        </button>
        <div className={styles['slideThree']}>
          <input
            type="checkbox"
            id="toggleImageColumn"
            checked={showImageColumn}
            onChange={() => setShowImageColumn(!showImageColumn)}
          />
          <label htmlFor="toggleImageColumn"></label>
        </div>
      </div>

      <div className={styles['search-container']}>
        <label className={styles['search-label']} htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['question-table']}>
        <div className={`${styles['table-header']} ${!showImageColumn ? styles['no-image'] : ''}`}>
          <div className={styles['header-item']}>Select</div>
          <div className={styles['header-item-mobile']}>Question & Answer</div>
          {showImageColumn && <div className={styles['header-item']}>Image</div>}
          <div className={styles['header-item']}>Actions</div>
        </div>
        <ul className={styles['question-list']}>
          {currentQuestions.map((question) => (
            <li key={question.id} className={`${styles['question-row']} ${!showImageColumn ? styles['no-image'] : ''}`}>
              <input
                type="checkbox"
                checked={selectedQuestions.has(question.id)}
                onChange={() => handleSelectQuestion(question.id)}
                className={styles['select-checkbox']}
              />
              <div className={styles['question-item']}>
                <div className={styles['question-text']}>
                  <div className={styles['question-icon-quest']}
                    onClick={() => setExpandedQuestionId(expandedQuestionId === question.id ? null : question.id)}
                  >
                    <FontAwesomeIcon
                      icon={expandedQuestionId === question.id ? faChevronUp : faChevronDown}
                      className={styles['question-icon']}
                    />
                    <div>
                      {question.questionDescription}
                      {expandedQuestionId === question.id && question.answer && (
                        <div className={styles['answer-text']}>{question.answer}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showImageColumn && (
                <div className={styles['image-column']}>
                  {question.image && <img src={question.image} alt="Question visual" className={styles['question-image']} />}
                </div>
              )}
              <div className={styles['action-column']}>
                <button onClick={() => handleEditQuestion(question)} className={styles['btn-edit']}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button onClick={() => handleDeleteQuestion(question.id)} className={styles['btn-delete']}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {currentView === 'addQuestion' &&  (
  <div className={styles['overlay']}>
    <div className={styles['form-container']}>
      <h2>Add Question</h2>
      <label >Question:</label>
      <textarea
        placeholder="Question Description"
        value={newQuestion.questionDescription}
        onChange={(e) => setNewQuestion({ ...newQuestion, questionDescription: e.target.value })}
        className={styles['form-input']}
      />
      <label >Answer:</label>

      <textarea
        placeholder="Answer"
        value={newQuestion.answer}
        onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
        className={styles['form-input']}
      />
      <label >Image:</label>
      <input
        type="text"
        placeholder="Image URL"
        value={newQuestion.image}
        onChange={(e) => setNewQuestion({ ...newQuestion, image: e.target.value })}
        className={styles['form-input']}
      />
      <button onClick={handleAddQuestion} className={styles['btn-save']}>
        <FontAwesomeIcon icon={faSave} /> Save
      </button>
      <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
        <FontAwesomeIcon icon={faTimes} /> Cancel
      </button>
    </div>
  </div>
)}

{currentView === 'editQuestion' && selectedQuestion &&  (
  <div className={styles['overlay']}>
    <div className={styles['form-container']}>
      <h2>Edit Question</h2>
      <label >Question:</label>

      <textarea
        value={selectedQuestion.questionDescription}
        placeholder="Question Description"
        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionDescription: e.target.value })}
        className={styles['form-input']}
      />
      <label >Answer:</label>

      <textarea
        value={selectedQuestion.answer}
        placeholder="Answer"
        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })}
        className={styles['form-input']}
      />
      <label >Image:</label>

      <input
        type="text"
        placeholder="Image URL"
        value={selectedQuestion.image}
        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, image: e.target.value })}
        className={styles['form-input']}
      />
      <button onClick={handleUpdateQuestion} className={styles['btn-save']}>
        <FontAwesomeIcon icon={faSave} /> Save
      </button>
      <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
        <FontAwesomeIcon icon={faTimes} /> Cancel
      </button>
    </div>
  </div>
)}
<div className={styles['pagination']}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles['btn-pagination']}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Previous
        </button>
        <span className={styles['pagination-info']}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles['btn-pagination']}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};


export default QuestionManagement;
