import axios from 'axios';
const API_BASE = 'https://sync-board-eight.vercel.app';

export const fetchBoardData = async (boardId) => {
    const response = await axios.get(`${API_BASE}/api/boards/${boardId}`);
    return response.data;
};

export const createList = async (title, boardId) => {
    const response = await axios.post(`${API_BASE}/api/lists`, { title, boardId });
    return response.data;
};

export const createCard = async (cardPayload) => {
    const response = await axios.post(`${API_BASE}/api/cards`, cardPayload);
    return response.data;
};

export const deleteCard = async (cardId) => {
    const response = await axios.delete(`${API_BASE}/api/cards/${cardId}`);
    return response.data;
};

export const moveCardInDatabase = async (cardId, sourceListId, targetListId) => {
    const response = await axios.patch(`${API_BASE}/api/cards/${cardId}/move`, {
        sourceListId,
        targetListId
    });
    return response.data;
};