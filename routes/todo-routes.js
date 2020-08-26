const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
MongoId = require('mongodb').ObjectID;
//require('dotenv').config();

router.post('/add/:id', async (req, res) => {
    try {
        const id = req.params.id
        req.body.done = false;
        req.body.key = mongoose.Types.ObjectId();
        const pushTodo = { $push: { todos: req.body } }
        const result = await User.updateOne({ _id: id }, pushTodo);
        if (result) {
            res.json({ msg: "Todo Added" });
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/all/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (user) {
            res.json({ todos: user.todos });
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/:action', async (req, res) => {
    try {
        const key = new MongoId(req.body.key);
        const id = new MongoId(req.body.id);
        let updateTodo;
        switch (req.params.action) {
            case "delete":
                updateTodo = { $pull: { todos: { key } } }
                break;
            case "done":
                updateTodo = { $set: { "todos.$.done": true } }
                break;
            case "undo":
                updateTodo = { $set: { "todos.$.done": false } }
                break;
        }
        const todo = await User.updateOne({ _id: id, "todos.key": key }, updateTodo);
        if (todo) {
            res.json({data: todo });
        }

    } catch (err) {
        console.log(err)
    }
    // res.send(req.user)
})

module.exports = router