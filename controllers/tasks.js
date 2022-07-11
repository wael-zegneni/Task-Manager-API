const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks: tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ message: `No task with id: ${taskID}` })
        } else {
            res.status(200).json({ task: task })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const { name, completed } = req.body
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ message: `No task with such ID` })
        } else {
            await task.updateOne({ name: name, completed: completed })
        }
        res.status(200).json({ id: taskID, data: req.body })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            return req.status(404).json({ message: `No task with id: ${taskID}` })
        } else {
            res.status(200).json({ task })
            //res.status(200).send()
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}