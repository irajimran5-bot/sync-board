const express=require('express');
const router=express.Router();
const{createBoard,getBoardById}=require('../controllers/boardController');
router.route('/').post(createBoard);
router.route('/:id').get(getBoardById);
module.exports=router;
