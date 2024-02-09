const express = require('express')
const app = express()
const mongoose = require('mongoose')
const axios = require('axios')
const cors = require('cors'); // Import the cors middleware
const shortnerRouter = require('./Routes/shortnerRoute')
app.use(express.json())
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/")
.then(() => {
   app.listen(3060, () => {
            console.log("server is on 8060");
        });
    })
    .catch(( err) => {
        console.log(err.message);
    });


   



app.use('/',shortnerRouter)