import { useState, useEffect } from 'react';

const API_URL = 'https://66bf5cf442533c403145f070.mockapi.io/api/question-answer/id';

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error('Expected an array from API, but got:', data);
          setQuestions([]); // Ensure questions is always an array
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const addQuestion = async (question) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newQuestion = await response.json();
      setQuestions((prevQuestions) =>
        Array.isArray(prevQuestions) ? [...prevQuestions, newQuestion] : [newQuestion]
      );
    } catch (error) {
      setError(error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setQuestions((prevQuestions) =>
        Array.isArray(prevQuestions) ? prevQuestions.filter((q) => q.id !== id) : []
      );
    } catch (error) {
      setError(error);
    }
  };

  const updateQuestion = async (updatedQuestion) => {
    try {
      const response = await fetch(`${API_URL}/${updatedQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestion),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedQ = await response.json();
      setQuestions((prevQuestions) =>
        Array.isArray(prevQuestions)
          ? prevQuestions.map((q) => (q.id === updatedQ.id ? updatedQ : q))
          : []
      );
    } catch (error) {
      setError(error);
    }
  };

  const addAnswer = async (questionId, newAnswer) => {
    try {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        const updatedQuestion = { ...question, answer: newAnswer };
        await updateQuestion(updatedQuestion);
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteAnswer = async (questionId) => {
    try {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        const updatedQuestion = { ...question, answer: '' };
        await updateQuestion(updatedQuestion);
      }
    } catch (error) {
      setError(error);
    }
  };

  const updateAnswer = async (questionId, updatedAnswer) => {
    try {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        const updatedQuestion = { ...question, answer: updatedAnswer };
        await updateQuestion(updatedQuestion);
      }
    } catch (error) {
      setError(error);
    }
  };

  return {
    questions,
    loading,
    error,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    addAnswer,
    deleteAnswer,
    updateAnswer,
  };
};
