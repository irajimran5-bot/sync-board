import axios from "axios";
export const fetchBoardData=async(boardId)=>{
    try{
        const response = await axios.get(`/api/boards/${boardId}`);
        return response.data;
    }catch(error){
        console.error("Error fetching the board",error);
        throw error;
    }
};
export const createList=async(title,boardId)=>{
    try{
        const response=await axios.post('/api/lists',{title,boardId});
        return response.data;
    }catch(error){
        console.error("ERROR in creating the list: ",error);
        throw error;
    }
};
export const createCard=async(cardData)=>{
    try{
        const response=await axios.post('/api/cards',cardData);
        return response.data;
    }catch(error){
        console.error("ERROR in creating card: ",error);
        throw error;
    }
};
export const deleteCard=async(cardId)=>{
    try{
        const response=await axios.delete(`/api/cards/${cardId}`);
        return response.data;
    }catch(error){
        console.error("ERROR in deleting card",error);
        throw error;
    }
};