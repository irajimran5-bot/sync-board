const Card=require('../models/Card');
const List=require('../models/List');

exports.createCard=async(req,res)=>{
    try{
        const {title,description,listId,label}=req.body;
        if(!title||!listId){
            return res.status(400).json({message:'Title and list ID are required'});
        }   
            const parentList=await List.findById(listId);
            if(!parentList){
                return res.status(404).json({message:'Column not found'});

            }
            const newCard=await Card.create({title,description,listId,label});
            parentList.cards.push(newCard._id);
            await parentList.save();
            res.status(201).json(newCard);

        
    }catch(error){
        res.status(500).json({message:'Server ERROR',error:error.message});

    }
};
