// Config inicial
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/Person')
const app = express()


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Primeira rota
app.get('/', (req, res) => {
    res.send({ message: 'Bem-vindo ao meu servidor' })
})
//Create
app.post('/person', async (req, res) => {
    const {name, age, approved} = req.body
    const person = {
        name,
        age,
        approved
    }
    try{
        await Person.create(person)
        res.status(200).send({message: 'Pessoa criada com sucesso'})
    }
    catch(err){
        res.status(400).send({erro:error})
    }
}
)

//read
app.get('/person', async (req, res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch(err){
        res.status(400).send({message: 'Erro ao buscar pessoas'})
    }
}
)

//read by id
app.get('/person/:id', async (req, res) => {
    const id = req.params.id
    try{
        const people = await Person.findOne({_id: id})

        if(!people){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }
        res.status(200).json(people)
    }
    catch(err){
        res.status(500).send({erro: err})
    }
}
)

//update
// app.put('/person/:id', async (req, res) => {
//     const {name, age, approved} = req.body
//     const {id} = req.params
//     try{
//         await Person.findByIdAndUpdate(id, {name, age, approved})
//         res.status(200).send({message: 'Pessoa atualizada com sucesso'})
//     }
//     catch(err){
//         res.status(400).send({message: 'Erro ao atualizar pessoa'})
//     }
// }
// )


//update 
app.patch("/person/:id",async (req, res)=>{
    const id = req.params.id

    const {name, age, approved} = req.body

    const person ={
        name,
        age,
        approved,
    }
    try{
        const updatePerson =await Person.updateOne({_id: id}, person)
        if(updatePerson.matcheCount ===0){

            res.status(422).json({message: "Usuario não encontrado"})
            return

        }
        res.status(200).json(person)

    }catch(error){

        req.status(500).json({erro: error})
    }
})

// delete
app.delete("/person/:id",async (req, res)=>{
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if (!person) {
        res.status(422).json({message:"Usuário não encontrado"})
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message:"Usuário removido com sucesso"})
    } catch (error) {
        res.status(500).json({erro: error})
    }
})


mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('Conectado ao banco de dados')
    app.listen(3000)
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err)
})