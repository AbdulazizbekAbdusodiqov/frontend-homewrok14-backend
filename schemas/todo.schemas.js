import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

export default Task

