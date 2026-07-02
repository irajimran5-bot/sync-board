const mongoose=require('mongoose');
const ListSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A column must have a title'],
        trim:true
    },
    boardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board',
        required:true
    },
    cards:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Card'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('List',ListSchema);