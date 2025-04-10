import express from "express";
import Task from "../schemas/todo.schemas";

export const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({isDelete:false})
        if (tasks[0]) {
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
        
        if (task) {
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