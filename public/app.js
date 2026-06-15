const form = document.querySelector('form')
const inputData = document.querySelector("input")
const deleted = document.querySelectorAll(".delete")
const api = "/api/task"

form.addEventListener("submit", (e) => {
    e.preventDefault()
    // console.log(inputData.value)
    taskAdder(inputData.value)
    inputData.value = ""
})
loadTasks()
async function loadTasks() {
    let responce = await fetch(api)
    const taskArray = await responce.json()
    const arrayOfTasks = await taskArray.tasksArray
    console.log(arrayOfTasks)
    let tasksTitles = []
    document.querySelector(".showcase").innerHTML = ""


    for (let index = 0; index < arrayOfTasks.length; index++) {
        const divForTask = document.createElement("div")
        divForTask.setAttribute("id", arrayOfTasks[index]._id)
        divForTask.setAttribute("class", "individualTask bg-white m-1 w-full  p-1.5 mt-2 flex items-center gap-0.5 justify-between text-wrap")
        divForTask.innerHTML = `
                <p class="w-80 wrap-break-word">${arrayOfTasks[index].taskName}</p>
                <div class="buttons flex justify-between items-center">
                <button class="status bg-green-500 h-8 p-1 mr-0.5 rounded-[3px] cursor-pointer" onclick="">Done</button>
                <button class="delete bg-red-700 h-8 p-1 ml-0.5 rounded-[3px] cursor-pointer " onclick="">Delete</button>
                </div>
                
        `
        console.log(divForTask)
        document.querySelector(".showcase").appendChild(divForTask)
    }
    


}

// function specified only for addition of tasks
async function taskAdder(inputData) {
    let responce = await fetch(`${api}/add`, {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({ name: inputData })
    }
    )
    const responceMsg = await responce.json()
    if (responce.status === 201) {
        console.log(responceMsg.message)
        loadTasks()
    }
    else
        console.log("Your post request is not working ")
}


deleted.addEventListener("click", (req, res) => {
    console.log("The delete button of the task is clicked")
})

// function that will delete the task from the system(frontend & Backend)
async function deleteFunction(params) {

}