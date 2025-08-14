
const express = require('express');
const mongoose = require('mongoose');
const cookieParser= require ('cookie-parser');
const cors = require('cors');

app.use(cors({
  origin: 'https://fullstack-projects-e6ls-pra4eacnf-sourabh-naterias-projects.vercel.app', // your frontend URL
  credentials: true
}));

require('dotenv').config();
const app = express() ; 
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("get testing")
} )


app.listen (PORT, ()=>{
    console.log("server is running....")
})

//routes
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/productRouter'))

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('MongoDb connected')
}).catch((err) => {
    console.log('mongodb connection error',err)
});
