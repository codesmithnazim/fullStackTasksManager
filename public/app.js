const form = document.querySelector('form')
const inputData = document.querySelector("input")
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
    const arrayOfTasks = taskArray.tasksArray
    console.log(arrayOfTasks)
    let tasksTitles = []
    document.querySelector(".showcase").innerHTML = ""


    for (let index = 0; index < arrayOfTasks.length; index++) {
        const divForTask = document.createElement("div")
        divForTask.setAttribute("_id", arrayOfTasks[index]._id)
        divForTask.setAttribute("class", "individualTask bg-white m-1 w-full  p-1.5 mt-2 flex items-center gap-0.5 justify-between text-wrap")
        // console.log(divForTask.getAttribute("id"))
        const id = divForTask.getAttribute("_id")
        const idObj = { "id": id }
        console.log(idObj)
        divForTask.innerHTML = `
                <p class="w-80 wrap-break-word">${arrayOfTasks[index].taskName}</p>
                <div class="buttons flex justify-between items-center">
                <button class="status bg-green-500 h-8 p-1 mr-0.5 rounded-[3px] cursor-pointer" onclick="">Done</button>
                <button class="delete bg-red-700 h-8 p-1 ml-0.5 rounded-[3px] cursor-pointer " onclick="deleteFunction('${divForTask.getAttribute("_id")}')">Delete</button>
                </div>
                
        `
        // Enable it for prinitng all the tasks
        // console.log(divForTask) 
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


// function that will delete the task from the system(frontend & Backend)
async function deleteFunction(params) {
    console.log("Let's see what we get from the delete button ", params)
    let response = await fetch(`${api}/${params}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: params })
    })

    loadTasks()
}