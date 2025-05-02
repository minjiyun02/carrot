const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

const app = express()
app.use(express.json())

let db


connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
    })
    db = getDb()
    }
})

app.get('/books', (req, res) => {
    let books = []


    db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch(() => {
        res.status(500).json({error: ''})
    })
})

app.get('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params,id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: ''})
        })
    } else {
    response.status(500).json({error: ''})
    }

})


app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: ''})
    })
})