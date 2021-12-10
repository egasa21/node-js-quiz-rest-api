const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const routes = require('./app/routes/quiz.routes');

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.log(`database connected`))


const app = express()

let corsOption = {
    origin: "http://localhost:8088"
}

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors(corsOption))

app.use(routes);
app.get('/', (req,res)=>{
    res.send({message: "Test"})
})

app.listen(process.env.PORT, ()=>{
    console.log('Running on port 8089')
})