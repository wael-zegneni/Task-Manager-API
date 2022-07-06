const express = require('express')

const getAllTasks = (req,res )=>{
    res.send("all items")
}

module.exports = {
    getAllTasks
}