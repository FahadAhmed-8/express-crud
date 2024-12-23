import 'dotenv/config'
import express from 'express'

const app = express()
const port =  process.env.PORT || 3000
app.use(express.json())

let teaData = []
let nextId = 1

//add new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})

//add all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

//find a tea with id
app.get('/teas/:id', (req, res) => {
    const id = req.params.id
    const tea = teaData.find(t => t.id === parseInt(id))
    if (!tea){
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea)
})

//update tea
app.put('/teas/:id', (req, res) => {
    const id = req.params.id
    const tea = teaData.find(t => t.id === parseInt(id))
    if (!tea){
        return res.status(404).send('tea not found')
    }
    
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)    
})

//delete tea
app.delete('/teas/:id', (req, res) => {
    const id = req.params.id
    const index = teaData.findIndex(t => t.id === parseInt(id))
    if (index === -1){
        return res.status(404).send('tea not found')
    }

    teaData.splice(index, 1)
    res.status(204).send('tea deleted')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
