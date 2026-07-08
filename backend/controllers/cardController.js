const mongoose=require('mongoose');
const Card=require('../models/Card');
const List=require('../models/List');

exports.createCard = async (req, res) => {
    try {
        const { title, description, listId, label } = req.body;
        
        if (!title || !listId) {
            return res.status(400).json({ message: 'Title and list ID are required' });
        }   

        if (!mongoose.Types.ObjectId.isValid(listId)) {
            return res.status(400).json({ message: 'Invalid List ID format' });
        }
        const castedListId = new mongoose.Types.ObjectId(listId);

        const parentList = await List.findById(castedListId);
        if (!parentList) {
            return res.status(404).json({ message: 'Column not found' });
        }

        const newCard = await Card.create({ 
            title, 
            description, 
            listId: castedListId, 
            label 
        });

        parentList.cards.push(newCard._id);
        await parentList.save();

        res.status(201).json(newCard);

    } catch (error) {
        console.error("🔥 Detailed Backend Crash Log:", error); 
        res.status(500).json({ message: 'Server ERROR', error: error.message });
    }
};