const express = require('express');
const mongoose = require("mongoose");
const app = express();


app.listen(3000)
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message: "aiii chavinho rodou já pivete"})
})
    
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log('parabéns, esta conectado no banco')
    app.listen(3000)
})

.catch((erro)=>{
    console.log(erro)
}) 