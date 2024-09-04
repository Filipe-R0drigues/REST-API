import express, { json } from 'express';

const app = express()
app.use(express.json())

const usuarios = []

app.post('/usuarios',(req,res)=>{
    usuarios.push(req.body)
    res.status(201).json(req.body)
})

app.get('/usuarios',(req, res)=>{
    res.status(200).json(usuarios)
})

app.listen(3000)