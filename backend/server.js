const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const MONGO_URI=process.env.MONGO_URI||'mongodb://127.0.0.1:27017/syncboard';
mongoose.connect(MONGO_URI)
.then(()=> console.log("Database Connection is SUCCESSFUL"))
.catch((err)=>console.log('Critical FAILURE ->',err));
app.get('/',(req,res)=>{
    res.json({message:"SyncBoaerd API is running smoothly"});
});
app.use('/api/boards',require('./routes/boardRoutes'));
app.use('/api/lists',require('./routes/listRoutes'));

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Running on port: ${PORT}`);

});
