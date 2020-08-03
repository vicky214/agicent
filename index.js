const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const {MONGOURI} = require('./config/db');
const data = require('./routes/data')

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect(MONGOURI,{
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser:true,
});
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb yeah..")
});

mongoose.connection.on('error',(err)=>{
    console.log("error during connection" ,err)
});

app.use('/',data);

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(PORT,()=>{console.log(`server is running on ${PORT}`)});