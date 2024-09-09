// src/config/api.js
const API_URL = 'https://66bf5cf442533c403145f070.mockapi.io/api/question-answer/id';

export const fetchQuestions = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addQuestion = async (newQuestion) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    });
    if (!response.ok) throw new Error('Failed to add question');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (id, updatedQuestion) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedQuestion),
    });
    if (!response.ok) throw new Error('Failed to update question');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete question');
  } catch (error) {
    throw error;
  }
};
