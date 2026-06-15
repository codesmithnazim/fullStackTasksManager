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



app.listen(port, () => {
    console.log("Express Server is created successfully")
})