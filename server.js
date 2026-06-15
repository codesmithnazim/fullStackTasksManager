import express, { json } from "express"
const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ "extended": true }))
const port = 3000

import { tasks } from "./models/notes.model.js"
// tasks.insertOne({
//     taskName: "My first Task"
// })


app.get("/api/task", async (req, res) => {
    try {
        const allTasks = await tasks.find()
        console.log(allTasks)
        res.status(201).json({ tasksArray: allTasks })

    } catch (error) {
        console.log("Error from mongoo during fetching all tasks")

    }
})


app.post("/api/task/add", (req, res) => {
    const task = req.body
    try {
        tasks.insertOne({ taskName: task.name })
        console.log(task.name)
        res.status(201).json({ message: "Task post request is receieved and transfered successfully" })
    } catch (error) {
        console.log(error)
    }
})

// Express route for controlling the delete requests
app.post('/api/task/:id', async (req, res) => {
    try {
        const responceMsg = await tasks.deleteOne({ _id: { $eq: req.params.id } })
        res.status(201).json(responceMsg)
    } catch (error) {
        console.log("The error during deleting the task", error)
        res.status(400).json(responceMsg)

    }
})


app.listen(port, () => {
    console.log("Express Server is created successfully")
})