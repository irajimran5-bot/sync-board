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
exports.getBoardById=async(req,res)=>{
    try{
        const board=await Board.findById(req.params.id).populate({
            path:'lists',
            populate:{
                path:'cards',
                model:'Card'

            }
        });
        if(!board){
            return res.status(404).json({message:'Target board not FOUND'});

        }
        res.status(200).json(board);
    }catch(error){
        res.status(500).json({message:'Server fault',error:error.message})
    }
};
