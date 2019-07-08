const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)         //Creating a new user will add a new user to the db
    try{                                    //Method with async await
        await user.save()
        res.status(201).send(user)
    }
    catch (error){
        res.status(400).send(error)
    }
})

router.get('/users', (req, res) => {
    User.find({}).then((users) => {     //Promise method insted of async, await method
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if(!isValid){
        res.status(400).send({error: 'Invalid Update'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }
    catch(error){
        res.status(400).send()
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }
    catch(error){
        res.status(500).send()
    }
})

module.exports = router