const mongoose=require('mongoose');
const BoardSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A board must have a title'],
        trim:true
        
    },
    description:{
        type:String,
        trim:true
    },
    lists:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref='List'

        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('Board',BoardSchema);