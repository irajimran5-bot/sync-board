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
