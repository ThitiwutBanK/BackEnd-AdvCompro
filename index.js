const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const uri = 'mongodb://admin:MNGgng91715@bank-app.proen.app.ruk-com.cloud:11566/admin';


mongoose.connect(uri)
  .then(() => console.log('เชื่อมต่อฐานข้อมูลสำเร็จ'))
  .catch(err => console.error('ข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err));

const Book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());

app.post("/books", async (req, res) => {
    try {
        const lastBook = await Book.findone().sort({ id : -1 });
        const nextID = lastBook ? lastBook.id + 1 : 1;

        const book = new Book({
            id: nextID,
            ...req.body,
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read all
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    }   catch (error) {
        res.status(500).send(error);
    }
});

// Read one
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOne({id:req.params.id});
        res.send(book);
    }   catch (error) {
        res.status(500).send(error);
    }
});

// Update
app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
            new: true,
        });
        res.send(book);
    }   catch (error) {
        res.status(500).send(error);
    }
});

// Delete
app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({id:req.params.id});
        res.send(book);
    }   catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});