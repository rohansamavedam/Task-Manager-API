const express = require('express')
require('./db/mongoose')                    //This line ensures that the file runs and connects to the database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000       //port for local and production

//Limiting what the user has access to before and after authentication
//Middleware
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     if(req.method === 'GET'){
//         res.send('GET requests are currently diabled')
//     }else{
//         next()
//     }
// })

//Middleware for maintainence mode
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently under maintainence')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' +port)
})

