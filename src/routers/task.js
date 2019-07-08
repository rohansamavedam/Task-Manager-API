const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)         //Same as creating a new user, but new task                                 
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch (error){
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch(error){
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id               //way to retrive the param from url
    try{
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch(error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        res.status(400).send({error: 'Invalid Update'})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }
    catch (error) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }
    catch(error){
        res.status(500).send()
    }
})

module.exports = router