// src/config/api.js
const API_URL = 'http://localhost:3001/question/';

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

export const updateQuestion = async (id, questionData) => {
  const response = await fetch(`http://localhost:3001/question/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
  });

  if (!response.ok) {
      throw new Error(`Error updating question: ${response.statusText}`);
  }

  return await response.json();
};

export const deleteQuestion = async (id) => {
  if (!id) throw new Error('Question ID is required'); // Kiểm tra ID không rỗng

  try {
      const response = await fetch(`http://localhost:3001/question/${id}`, { method: 'DELETE' }); // Sửa lại đây
      if (!response.ok) throw new Error(`Error deleting question: ${response.statusText}`);
  } catch (error) {
      throw error;
  }
};

