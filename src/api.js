// src/api/api.js

const API_URL = 'https://your-api-url.com'; // Replace with your API URL

// Function to fetch all questions
export const fetchQuestions = async () => {
  const response = await fetch(`${API_URL}/questions`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
};

// Function to add a new question
export const addQuestion = async (question) => {
  const response = await fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
  if (!response.ok) {
    throw new Error('Failed to add question');
  }
  return response.json();
};

// Function to update a question
export const updateQuestion = async (id, updatedQuestion) => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedQuestion),
  });
  if (!response.ok) {
    throw new Error('Failed to update question');
  }
  return response.json();
};

// Function to delete a question
export const deleteQuestion = async (id) => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete question');
  }
  return response.json();
};
