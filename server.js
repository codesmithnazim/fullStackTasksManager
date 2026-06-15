import express from "express"
const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ "extended": true }))
const port = 3000

import { tasks } from "./models/notes.model.js"
tasks.insertOne({
    taskName: "My first Task"
})

app.post("/api/task/add", (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log("Express Server is created successfully")
})