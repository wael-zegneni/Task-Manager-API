const Task = require("../models/Task")
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    // res.status(200).json({ tasks: tasks })
    // res.status(200).json({ tasks: tasks, amount:tasks.length })
    res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return res.status(404).json({ message: `No task with id: ${taskID}` })
    } else {
        res.status(200).json({ task: task })
    }
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return res.status(404).json({ message: `No task with such ID` })
    } else {
        res.status(200).json({ id: taskID, data: req.body })
    }
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return req.status(404).json({ message: `No task with id: ${taskID}` })
    } else {
        res.status(200).json({ task })
        //res.status(200).send()
    }
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}