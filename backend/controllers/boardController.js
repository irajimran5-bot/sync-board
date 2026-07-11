const Board=require('../models/Board');
exports.createBoard=async(req,res)=>{
    try{
        const{title,description}=req.body;
        if(!title){
            return res.status(400).json({message:'Title is required'});

        }
        const newBoard=await Board.create({title,description});
        res.status(201).json(newBoard);
    }   
    catch(error){
        res.status(500).json({message:'Server fault',error:error.message})

    }
};
const getBoardById = async (req, res) => {
    try {
        let board = await Board.findById(req.params.id).populate({
            path: 'lists',
            populate: { path: 'cards' }
        });
        if (!board) {
            board = await Board.create({
                _id: req.params.id,
                title: "Production Workspace",
                description: "Collaborative Kanban space"
            });
            board = await Board.findById(req.params.id).populate({
                path: 'lists',
                populate: { path: 'cards' }
            });
        }

        return res.status(200).json(board);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
module.exports = {
    createBoard,
    getBoardById
};