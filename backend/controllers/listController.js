const List=require('../models/List');
const Board=require('../models/Board');
exports.createList=async(req,res)=>{
    try{
        const{title,boardId}=req.body;
        if(!title||!boardId){
            return res.status(400).json({ message: 'Title and target Board ID are required' });
        }
        const parentBoard=await Board.findById(boardId);
        if(!parentBoard){
            return res.status(404).json({ message: 'Parent Board Not Found' });
        }
        const newList=await List.create({title,boardId});
        parentBoard.lists.push(newList._id);
        await parentBoard.save();
        res.status(201).json(newList);
    }catch(error){
        res.status(500).json({message:'Server error', error:error.message})
    }
};