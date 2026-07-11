const Board = require('../models/Board'); 

const createBoard = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newBoard = await Board.create({ title, description });
        return res.status(201).json(newBoard);
    } catch (err) {
        return res.status(500).json({ error: err.message });
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