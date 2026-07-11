const express=require('express');
const mongoose=require('mongoose');
const http=require('http');
const{Server}=require('socket.io');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});
const MONGO_URI=process.env.MONGO_URI||'mongodb://127.0.0.1:27017/syncboard';
mongoose.connect(MONGO_URI)
.then(()=> console.log("Database Connection is SUCCESSFUL"))
.catch((err)=>console.log('Critical FAILURE ->',err));
io.on('connection',(socket)=>{
    console.log(`Live stream connected: User connected with ID->${socket.id}`);
    socket.on('cardMoved',(data)=>{
        socket.broadcast.emit('boardUpdated',data);
    });
    socket.on('disconnect',()=>{
        console.log(`User disconnected: ${socket.id}`);
    });
});
app.get('/',(req,res)=>{
    res.json({message:"SyncBoaerd API is running smoothly"});
});
app.use('/api/boards',require('./routes/boardRoutes'));
app.use('/api/lists',require('./routes/listRoutes'));
app.use('/api/cards',require('./routes/cardRoutes'));
const PORT=process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log(`Running on port: ${PORT}`);

});
