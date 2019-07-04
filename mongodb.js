//CRUD operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
       return console.log('unable to connect to database')
    }
    const db = client.db(databaseName)

    db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
        if(error){
            return console.log('unable to fetch')
        }
        console.log(user)
    })

    db.collection('tasks').findOne({_id: new ObjectID('5d186e3c04e3a8cac9967b8f')}, (error, task) => {
        if(error){
            return console.log('cannot fetch')
        }
        console.log(task)
    })

    db.collection('tasks').find({completed: true}).toArray((error, tasks)=>{
        if(error){
            return console.log('cannot fetch')
        }
        console.log(tasks)
    })

    db.collection('users').insertOne({
        name: 'Rohan',
        age: 20
    }, (error, result) => {
        if(error){
            return console.log('unable to insert user')
        }
        console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        },
        {
            name: 'Gunther',
            age: 27
        }
    ], (error, result) => {
        if(error){
            return console.log('Unable to insert')
        }
        console.log(result.ops)
    })

    
    
})