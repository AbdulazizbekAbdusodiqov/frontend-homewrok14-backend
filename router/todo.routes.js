import express from "express";
import Task from "../schemas/todo.schemas.js";

export const router = express.Router()

router.get("/", async (_, res) => {
    try {
        const tasks = await Task.find({isDelete:false})
        if (!tasks[0]) {
            return res.status(400).send({ message: "tasks not found" })
        }
        return res.status(200).send({ tasks })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findOne({isDelete:false, _id:id})
        
        if (!task) {
            return res.status(400).send({ message: "task not found" })
        }
        
        return res.status(200).send({ task })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.post("/", async (req, res) => {
    try {
        const newTask = new Task({ ...req.body });
        await newTask.save();
        return res.status(201).send({ message: "Task created successfully", task: newTask });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndUpdate(id, {isDelete:true})
        return res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title bo‘sh bo‘lishi mumkin emas!' });
    }
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title: title.trim() },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task topilmadi' });
      }
  
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
  });