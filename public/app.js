const form = document.querySelector('form')
const inputData = document.querySelector("input")
const api = "/api/task"

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(inputData.value)

})


async function taskAdder(inputData) {
    const responce = await fetch(`${api}/add`, {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({ name: taskName })
    }

    )
    if (responce.ok)
        console.log("your post request is working")

}