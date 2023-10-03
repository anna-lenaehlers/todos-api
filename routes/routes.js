const express = require("express");
const Todo = require("../models/model");

const router = express.Router();

// Post create todo
router.post("/createTodo", async (req, res) => {
  const data = new Todo({
    title: req.body.todo.title,
    priority: req.body.todo.priority,
    checked: req.body.todo.checked,
    due: req.body.todo.due,
    created: req.body.todo.created,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all todos
router.get("/getAllTodos", async (req, res) => {
  try {
    const data = await Todo.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get todo by id
router.get("/getTodo/:id", async (req, res) => {
  try {
    const data = await Todo.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update todo by id
router.patch("/updateTodo/:id", async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Todo.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete todo by id
router.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findByIdAndDelete(id);
    res.send(`Document ${data.title} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
