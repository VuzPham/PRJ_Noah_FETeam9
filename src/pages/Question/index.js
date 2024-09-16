import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faSave, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './Question.module.scss';
import { fetchQuestions, addQuestion, updateQuestion, deleteQuestion } from '../config/api';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentView, setCurrentView] = useState('list');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [newQuestion, setNewQuestion] = useState({ question: '', answer: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null); // To control the confirmation dialog
    const [confirmDeleteQuestionId, setConfirmDeleteQuestionId] = useState(null); // To store the ID of the question to delete
    const questionsPerPage = 5;

    const { subjectId } = useParams();
    const fetchQuestionsData = async (subjectId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
            if (res) {
                const data = await res.data;
                const subject = data.flatMap(university =>
                    university.subjects.find(sub => sub.id === parseInt(subjectId, 10))
                );
                console.log('Check giá trị của khi lấy giá trị subject nè: ', subject);
                return subject;
            } else {
                console.log('Not found!!!');
            }


        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    };

    // useEffect(() => {

    const loadQuestions = async () => {
        try {
            const questionsData = await fetchQuestionsData(subjectId);
            console.log('Check giá trị lấy từ hàm fetchQuestionsData: ', questionsData);
            const id_sub = subjectId;
            console.log('Check subjectId trên param: ', id_sub);
            const subids = questionsData.find(ques => ques.id = id_sub);
            console.log('Check load questions: ', subids.question);
            setQuestions(subids.question);
            console.log('Check question base on id _subject: ', questions)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //     loadQuestions();
    // }, [subjectId]);


    useEffect(() => {
        console.log('Check giá trị lấy từ param : ', subjectId);
        loadQuestions();
    }, [subjectId])
    const handleAddQuestion = async () => {
        try {
            const addedQuestion = await addQuestion(newQuestion);
            setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);
            setNewQuestion({ question: '', answer: '' });
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

        try {
            const updatedQuestion = await updateQuestion(selectedQuestion.id, selectedQuestion);
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
            );
            setSelectedQuestion(null);
            setCurrentView('list');
        } catch (err) {
            console.error('Error updating question:', err);
        }
    };

    const handleDeleteQuestion = async (id) => {
        setConfirmDeleteQuestionId(id);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteQuestion(confirmDeleteQuestionId);
            setQuestions((prevQuestions) =>
                prevQuestions.filter((question) => question.id !== confirmDeleteQuestionId)
            );
        } catch (err) {
            console.error('Error deleting question:', err);
        }
        setShowConfirmDelete(false);
        setConfirmDeleteQuestionId(null);
    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
        setConfirmDeleteQuestionId(null);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleQuestionToggle = (id) => {
        // Only toggle the expanded question ID if the question has an answer
        const question = questions.find((q) => q.id === id);
        if (question && question.answer) {
            setExpandedQuestionId((prevId) => (prevId === id ? null : id));
        }
    };

    const filteredQuestions = questions.filter((question) =>
        question?.question?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles['container']}>
            {showConfirmDelete && (
                <div className={styles['confirm-dialog']}>
                    <div className={styles['confirm-dialog-content']}>
                        <p>Are you sure you want to delete this question?</p>
                        <button onClick={confirmDelete} className={styles['confirm-btn']}>Yes</button>
                        <button onClick={cancelDelete} className={styles['cancel-btn']}>No</button>
                    </div>
                </div>
            )}

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
                    <div className={styles['question-table']}>
                        <div className={styles['table-header']}>
                            <div className={styles['header-item']}>Question & Answer</div>
                            <div className={styles['header-item']}>Edit</div>
                            <div className={styles['header-item']}>Delete</div>
                        </div>
                        <ul className={styles['question-list']}>
                            {questions.map((question) => (
                                <li key={question.id} className={styles['question-row']}>
                                    <div className={styles['question-item']}>
                                        <div
                                            className={styles['question-text']}
                                            onClick={() => handleQuestionToggle(question.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={expandedQuestionId === question.id ? faChevronUp : faChevronDown}
                                                className={styles['question-icon']}
                                            />
                                            {question.des_question}
                                        </div>
                                        {expandedQuestionId === question.id && question.answer && (
                                            <div className={styles['answer-text']}>{question.answer}</div>
                                        )}
                                    </div>
                                    <div className={styles['form-buttons01']}>
                                        <div className={styles['action-item']}>
                                            <button
                                                onClick={() => handleEditQuestion(question)}
                                                className={styles['btn-edit']}
                                            >
                                                <FontAwesomeIcon icon={faEdit} /> Edit question
                                            </button>
                                        </div>
                                        <div className={styles['action-item']}>
                                            <button onClick={() => handleDeleteQuestion(question.id)} className={styles['btn-delete']}>
                                                <FontAwesomeIcon icon={faTrashAlt} /> Delete question
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
                                    className={`${styles['page-item']} ${currentPage === index + 1 ? styles['active'] : ''
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
                    </div>
                </>
            )}

            {currentView === 'addQuestion' && (
                <div className={styles['form-container']}>
                    <h2>Add New Question</h2>
                    <input
                        type="text"
                        placeholder="Enter question"
                        value={newQuestion.question}
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
                    <div className={styles['form-buttons02']}>
                        <button onClick={handleAddQuestion} className={styles['btn-save']}>
                            <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
                            <FontAwesomeIcon icon={faTimes} /> Cancel
                        </button>
                    </div>
                </div>
            )}

            {currentView === 'editQuestion' && selectedQuestion && (
                <div className={styles['form-container']}>
                    <h2>Edit Question</h2>
                    <input
                        type="text"
                        value={selectedQuestion.question}
                        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, question: e.target.value })}
                        className={styles['input']}
                    />
                    <input
                        type="text"
                        value={selectedQuestion.answer}
                        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })}
                        className={styles['input']}
                    />
                    <div className={styles['form-buttons02']}>
                        <button onClick={handleUpdateQuestion} className={styles['btn-save']}>
                            <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button onClick={() => setCurrentView('list')} className={styles['btn-cancel']}>
                            <FontAwesomeIcon icon={faTimes} /> Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionManagement;

