import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/Express_Databsae")


const newModel = new mongoose.Schema({
    taskName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isCompleted: { type: Boolean, default: false }
})



const tasks = mongoose.model("Task", newModel)


export { tasks }