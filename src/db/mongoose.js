const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
       type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const me = new User({
//     name: 'Rohan',
//     age: 20
// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const task = new Task({
    description: 'dodo',
    completed: false
}).save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})