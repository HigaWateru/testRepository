let dataStructure = JSON.parse(localStorage.getItem('dataStructure')) || []
const userID = Number(localStorage.getItem('userID'))
let user = dataStructure.find(user => user.id === userID)
if(!user) setTimeout(() => window.location.href = '../html/login.html', 500)

const boardID = Number(localStorage.getItem("boardID"))
let boardList = user.boards.find(board => board.id === boardID)

let starred = document.getElementById("starred")
if(starred){
    starred.addEventListener("change", function () {
        boardList.is_starred = this.checked
        localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
    })
}

console.log(boardList.title)
let closedBoards = JSON.parse(localStorage.getItem('closedBoards')) || []

function loadBoardPage(){
    console.log(boardList)

    let headingTitle = document.getElementById("headingTitle")
    headingTitle.innerText = boardList.title
    
    let starred = document.getElementById("starred")
    starred.checked = boardList.is_starred

    let bodyList = document.getElementById("bodyList")
    bodyList.innerHTML = ""
    
    boardList.lists.forEach(list => {
        bodyList.innerHTML += `
            <div class="list" id="taskList">
                <div class="head-list">
                    <span id="head_list_title" data-list-id="${list.id}" onclick="editListTitle(event)">${list.title}</span>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                    </div>
                </div>
                <!--  -->
                <ul class="main-list" id="taskBodyList">
                    ${list.tasks.map(task => `
                        <li>
                            <input type="checkbox" id="complete-${task.id}" ${task.is_completed?"checked" : ""} hidden>
                            <label for="complete-${task.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </label>
                            <span id="task" data-bs-toggle="modal" data-bs-target="#modalDescriptionCard" data-list-id="${list.id}" data-task-id="${task.id}">${task.title}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="footer-list">
                    <div class="add-card" onclick="addTask(event)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <span>Add a card</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" data-bs-toggle="modal" data-bs-target="#confirmDelete"
                        class="bi bi-trash3" viewBox="0 0 16 16" data-list-id="${list.id}">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </div>
        `
    })
    bodyList.innerHTML += `
        <div class="list">
            <div class="footer-list" onclick="addList(event)">
                <div class="add-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <span>Add another list</span>
                </div>
            </div>
        </div>
    `

    function addCheckboxCompete(){
        boardList.lists.forEach(list => {
            list.tasks.forEach(task => {
                const checkbox = document.getElementById(`complete-${task.id}`)
                if(checkbox){
                    checkbox.addEventListener('change', function () {
                        task.is_completed = this.checked
                        localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
                        loadBoardPage()
                    })
                }
            })
        })
    }
    addCheckboxCompete()
}

function renderBoardListSidebar(){
    let sidebarList = document.getElementById("sidebarList")
    sidebarList.innerHTML = ""
    user.boards.forEach(board => {
        sidebarList.innerHTML += `
            <li>
                <div class="color-box" style="background: ${colorGradient(board.color)}"></div>
                <div class="board-title" onclick="nextPage(${board.id})">${board.title}</div>
            </li>
        `
    })
}

starred.addEventListener("change", function () {
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return
    if (this.checked) boardList.is_starred = true
    else boardList.is_starred = false
    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
})

// Hàm thêm board
function createBoard() {
    document.querySelectorAll(".background-option img").forEach(opt => opt.classList.remove("selected"))
    document.querySelectorAll(".color-item").forEach(opt => opt.classList.remove("selected"))

    let boardTitleInput = document.getElementById("boardTitleAdd")
    let boardTitle = boardTitleInput.value.trim()
    let validate = document.getElementById("validate")
    validate.innerHTML = "👋 Please provide a valid board title"
    if (!boardTitle) {
        validate.style.color = "red"
        validate.innerHTML = "😤 Please enter a title"
        return
    }

    const newBoard = {
        id: Math.floor(10000 + Math.random() * 90000),
        title: boardTitle,
        background: selectedBackground || 1,
        color: selectedColor || "cl1",
        is_starred: false,
        create_at: new Date().toISOString(),
        lists: []
    }
    console.log(newBoard)

    const modalElement = document.getElementById("staticBackdrop")
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide()

    user.boards.push(newBoard)
    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
    renderBoardListSidebar()

    boardTitleInput.value = ""
    validate.innerHTML = "👋 Please provide a valid board title"
    document.querySelectorAll(".background-option img").forEach(opt => opt.classList.remove("selected"))
    document.querySelectorAll(".color-item").forEach(opt => opt.classList.remove("selected"))
    selectedBackground = null
    selectedColor = null
}



// Hàm thêm xoá list
function addList(event) {
    const addCardDiv = event.target.closest('.add-card')
    if(!addCardDiv) return
    const spanFooter = addCardDiv.querySelector('span')
    if(!spanFooter) return

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Add another list'
    input.autocomplete = 'off'

    spanFooter.replaceWith(input)
    input.focus()

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let listTitle = input.value.trim()
            if (listTitle) {
                const boardID = Number(localStorage.getItem("boardID"))
                let boardList = user.boards.find(board => board.id === boardID)
                if (!boardList) return

                boardList.lists.push({
                    id: Math.floor(Math.random() * 10000), 
                    title: listTitle, 
                    tasks: [], 
                    create_at: new Date().toISOString()
                })
                localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
                loadBoardPage()
            }
            input.remove()
            input.replaceWith(spanFooter)
            spanFooter.innerText = 'Add another list'
        }
    })
    input.addEventListener('blur', function () {
        input.remove()
        addCardDiv.appendChild(spanFooter)
    })    
}


function editListTitle(event) {
    const listTitle = event.target.closest('.head-list').querySelector('span')
    if(!listTitle) return
    const listID = Number(listTitle.getAttribute("data-list-id"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return


    const input = document.createElement('input')
    input.type = 'text'
    input.value = listTitle.innerText
    input.autocomplete = 'off'
    listTitle.replaceWith(input)
    input.focus()

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let newTitle = input.value.trim()
            if (newTitle) {
                let listIndex = boardList.lists.findIndex(list => list.id === listID)
                if (listIndex !== -1) {
                    boardList.lists[listIndex].title = newTitle
                    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
                    loadBoardPage()
                }
            }else{
                loadBoardPage()
                return
            }
            input.remove()
            input.replaceWith(listTitle)
            listTitle.innerText = newTitle
        }
    })
    input.addEventListener('blur', function () {
        let newTitle = input.value.trim()
        if(newTitle){
            let listIndex = boardList.lists.findIndex(list => list.id === listID)
            if (listIndex !== -1) {
                boardList.lists[listIndex].title = newTitle
                localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
            }
            input.replaceWith(listTitle)
            listTitle.innerText = newTitle
        }else{
            input.replaceWith(listTitle)
        }
    })
}

function editTaskTitle(event){
    const taskTitle = event.target.closest('.head-text').querySelector('h4')
    if(!taskTitle) return
    const taskID = Number(localStorage.getItem("taskID"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return
    
    const input = document.createElement('input')
    input.type = 'text'
    input.value = taskTitle.innerText
    input.autocomplete = 'off'
    taskTitle.replaceWith(input)
    input.focus()

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let newTitle = input.value.trim()
            if (newTitle) {
                for (let list of boardList.lists) {
                    let taskIndex = list.tasks.findIndex(task => task.id === taskID)
                    if (taskIndex !== -1) {
                        list.tasks[taskIndex].title = newTitle
                        localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
                        loadBoardPage()
                    }
                }
            }else{
                loadBoardPage()
                return
            }
            input.remove()
            input.replaceWith(taskTitle)
            taskTitle.innerText = newTitle
        }
    })
    input.addEventListener('blur', function () {
        let newTitle = input.value.trim()
        if(newTitle){
            for (let list of boardList.lists) {
                let taskIndex = list.tasks.findIndex(task => task.id === taskID)
                if (taskIndex !== -1) {
                    list.tasks[taskIndex].title = newTitle
                    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
                }
            }
            input.replaceWith(taskTitle)
            taskTitle.innerText = newTitle
        }else{
            input.replaceWith(taskTitle)
        }
    })
}

function addTask(event) {
    const addCardDiv = event.target.closest('.add-card')
    if(!addCardDiv) return
    const spanHeader = addCardDiv.querySelector('span')
    if(!spanHeader) return


    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Add a card...'
    input.autocomplete = 'off'

    spanHeader.replaceWith(input)
    input.focus()

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let taskTitle = input.value.trim()
            if (taskTitle) {
                const boardID = Number(localStorage.getItem("boardID"))
                let boardList = user.boards.find(board => board.id === boardID)
                if (!boardList) return

                let listIndex = Array.from(addCardDiv.closest('.list').parentNode.children).indexOf(addCardDiv.closest('.list'))
                boardList.lists[listIndex].tasks.push({
                    id: Math.floor(Math.random() * 10000), 
                    title: taskTitle, 
                    is_completed: false, 
                    create_at: new Date().toISOString(),
                    description: '',
                    due_date: '',
                    tag: [],
                })
                localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
                loadBoardPage()
            }
            input.remove()
            input.replaceWith(spanHeader)
            spanHeader.innerText = 'Add a card'
        }
    })
    input.addEventListener('blur', function () {
        input.remove()
        addCardDiv.appendChild(spanHeader)
    })    
}

document.getElementById("modalDescriptionCard").addEventListener("show.bs.modal", function (event) {
    const trigger = event.relatedTarget
    if(!trigger) return
    const listID = trigger.getAttribute("data-list-id")
    const taskID = trigger.getAttribute("data-task-id")
    localStorage.setItem("listID", listID)
    localStorage.setItem("taskID", taskID)

    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let list = boardList.lists.find(list => list.id === Number(listID))
    if (!list) return
    let task = list.tasks.find(task => task.id === Number(taskID))
    if(task){
        let doneModalCheckbox = document.getElementById("done_modal")
        doneModalCheckbox.checked = task.is_completed
    }
})
document.getElementById("done_modal").addEventListener("change", function () {
    const taskID = Number(localStorage.getItem("taskID"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let list = boardList.lists.find(list => list.id === Number(localStorage.getItem("listID")))
    if (!list) return
    let task = list.tasks.find(task => task.id === taskID)
    if (task) {
        task.is_completed = this.checked
        localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
        loadBoardPage()
    }
})


document.getElementById("confirmDelete").addEventListener("show.bs.modal", function (event) {
    const trigger = event.relatedTarget
    if(!trigger) return
    listID = trigger.getAttribute("data-list-id")
    localStorage.setItem("listID", listID)
})
function deleteList() {
    const listID = Number(localStorage.getItem("listID"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let listIndex = boardList.lists.findIndex(list => list.id === listID)
    if (listIndex !== -1) {
        boardList.lists.splice(listIndex, 1)
        localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
        loadBoardPage()
    }
    const modalElement = document.getElementById("confirmDelete")
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide()
}


function deleteTask() {
    const taskID = Number(localStorage.getItem("taskID"))
    const boardID = Number(localStorage.getItem("boardID"))
    const listID = Number(localStorage.getItem("listID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let listIndex = boardList.lists.findIndex(list => list.id === listID)
    if (listIndex !== -1) {
        let taskIndex = boardList.lists[listIndex].tasks.findIndex(task => task.id === taskID)
        if (taskIndex !== -1) {
            boardList.lists[listIndex].tasks.splice(taskIndex, 1)
            localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
            loadBoardPage()
        }
    }
    
}


function closeBoard(){
    const boardID = Number(localStorage.getItem("boardID"))
    let boardIndex = user.boards.findIndex(board => board.id === boardID)
    if (boardIndex !== -1) {
        closedBoards.push(user.boards[boardIndex])
        if(closedBoards.length > 4) closedBoards.shift()

        user.boards.splice(boardIndex, 1)
        localStorage.setItem('dataStructure', JSON.stringify(dataStructure))

        localStorage.setItem('closedBoards', JSON.stringify(closedBoards))
        window.location.href = "index.html"
    } 
}


document.getElementById("modalDescriptionCard").addEventListener("show.bs.modal", function (event) {
    const trigger = event.relatedTarget
    if(!trigger) return
    const taskID = trigger.getAttribute("data-task-id")
    localStorage.setItem("taskID", taskID)
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let listIndex = Array.from(trigger.closest('.list').parentNode.children).indexOf(trigger.closest('.list'))
    let taskIndex = boardList.lists[listIndex].tasks.findIndex(task => task.id === Number(taskID))
    if (taskIndex !== -1) {
        let task = boardList.lists[listIndex].tasks[taskIndex]
        console.log(task)
        let modalDescriptionTitle = document.getElementById("modalDescriptionTitle")
        let modalDescriptionContent = document.getElementById("modalDescriptionContent")
        modalDescriptionTitle.innerText = task.title
        modalDescriptionContent.innerText = task.description

        if(task.due_date){
            let [date, time] = task.due_date.split("T")
            document.getElementById("dateInput").value = date
            document.getElementById("timeInput").value = time.replace("Z", "")
        }
    }
})
function saveChanges() {
    const taskID = Number(localStorage.getItem("taskID"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    for (let list of boardList.lists) {
        let task = list.tasks.find(task => task.id === taskID)
        if (task) {
            task.description = document.getElementById("modalDescriptionContent").innerText
            localStorage.setItem('dataStructure', JSON.stringify(dataStructure))

            const modalElement = document.getElementById("modalDescriptionCard")
            const modalInstance = bootstrap.Modal.getInstance(modalElement)
            modalInstance.hide()

            loadBoardPage()
            return
        }
    }
}

function colorGradient(color){
    switch (color) {
        case "cl1": return "linear-gradient(0.45turn, #ffb100, #fa0c00);"
        case "cl2": return "linear-gradient(0.45turn, #2609ff, #d20cff);"
        case "cl3": return "linear-gradient(0.45turn, #00ff2f, #00ffc8);"
        case "cl4": return "linear-gradient(0.45turn, #00ffe5, #004bfa);"
        case "cl5": return "linear-gradient(0.45turn, #ffa200, #edfa00);"
        default:    return "linear-gradient(0.45turn, #ff00ea, #fa0c00);"
    }
}
function setDueDate(){
    const taskID = Number(localStorage.getItem("taskID"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let dateInput = document.getElementById("dateInput").value
    let timeInput = document.getElementById("timeInput").value

    for (let list of boardList.lists) {
        let task = list.tasks.find(task => task.id === taskID)
        if (task) {
            if(dateInput && timeInput) task.due_date = `${dateInput}T${timeInput}Z`
            else task.due_date = ""
            localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
            
            const dueDateModal = document.getElementById("dueDate")
            const dueDateModalInstance = bootstrap.Modal.getInstance(dueDateModal)
            dueDateModalInstance.hide()

            setTimeout(() => {
                const modalElement = document.getElementById("modalDescriptionCard")
                const modalInstance = bootstrap.Modal.getInstance(modalElement)
                modalInstance.show()
            }, 50)
            loadBoardPage()
            return
        }
    }

}
document.getElementById("dueDate").addEventListener("show.bs.modal", function (event) {
    const trigger = event.relatedTarget
    if(!trigger) return
    let taskID = Number(localStorage.getItem("taskID"))
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    if (!boardList) return

    let list = boardList.lists.find(list => list.id === Number(localStorage.getItem("listID")))
    if (!list) return
    let task = list.tasks.find(task => task.id === taskID)
    if(task){
        let dueDate = task.due_date
        if(dueDate){
            let [date, time] = dueDate.split("T")
            document.getElementById("dateInput").value = date
            document.getElementById("timeInput").value = time.replace("Z", "")
        }else{
            document.getElementById("dateInput").value = ""
            document.getElementById("timeInput").value = ""
        }
    }
})

//////////////////////Filter + Label//////////////////////
function compareDate(time1, time2){
    let date1 = new Date(time1)
    let date2 = new Date(time2)
    if(date1.getTime() <= date2.getTime()) return true
    return false
}

function filterTask(){
    const boardID = Number(localStorage.getItem("boardID"))
    let boardList = user.boards.find(board => board.id === boardID)
    let keyword = document.getElementById("keyword").value.toLowerCase()
    let completeCheckbox = document.getElementById("completed")
    let incompleteCheckbox = document.getElementById("incompleted")

    let noDate = document.getElementById("noDate")
    let overDue = document.getElementById("overDue")
    let dueNextday = document.getElementById("dueNextday")

    let today = new Date().toISOString()

    let filterTasks = boardList.lists.map(list => {
        let filteredTasks = list.tasks
        if (keyword) filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(keyword))
        if (completeCheckbox.checked) filteredTasks = filteredTasks.filter(task => task.is_completed)
        if (incompleteCheckbox.checked) filteredTasks = filteredTasks.filter(task => !task.is_completed)
        if (noDate.checked) filteredTasks = filteredTasks.filter(task => !task.due_date)
        if (overDue.checked) filteredTasks = filteredTasks.filter(task => task.due_date && compareDate(task.due_date, today))
        if (dueNextday.checked) filteredTasks = filteredTasks.filter(task => task.due_date && !compareDate(task.due_date, today))
        return {
            ...list,
            tasks: filteredTasks
        }
    })
    console.log(filterTasks)

    renderFilteredTasks(filterTasks)
    const dueDateModal = document.getElementById("modalFilter")
    const dueDateModalInstance = bootstrap.Modal.getInstance(dueDateModal)
    dueDateModalInstance.hide()


}
function renderFilteredTasks(filterTask){
    let bodyList = document.getElementById("bodyList")
    bodyList.innerHTML = ""

    filterTask.forEach(list => {
        bodyList.innerHTML += `
            <div class="list" id="taskList">
                <div class="head-list">
                    <span id="head_list_title" data-list-id="${list.id}" onclick="editListTitle(event)">${list.title}</span>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                    </div>
                </div>
                <ul class="main-list" id="taskBodyList">
                    ${list.tasks.map(task => `
                        <li>
                            <input type="checkbox" id="complete-${task.id}" ${task.is_completed ? "checked" : ""} hidden>
                            <label for="complete-${task.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </label>
                            <span id="task" data-bs-toggle="modal" data-bs-target="#modalDescriptionCard" data-list-id="${list.id}" data-task-id="${task.id}">${task.title}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="footer-list">
                    <div class="add-card" onclick="addTask(event)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <span>Add a card</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" data-bs-toggle="modal" data-bs-target="#confirmDelete"
                        class="bi bi-trash3" viewBox="0 0 16 16" data-list-id="${list.id}">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </div>
        `
    })

    bodyList.innerHTML += `
        <div class="list">
            <div class="footer-list" onclick="addList(event)">
                <div class="add-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <span>Add another list</span>
                </div>
            </div>
        </div>
    `
}

function renderLabel(){
    let labelCreated = JSON.parse(localStorage.getItem("labelCreated")) || []
    let labelList = document.getElementById("labelColorList")
    console.log(labelCreated)
    if(labelCreated.length == 0){
        labelList.parentElement.style.display = "none"
        return
    }
    labelList.innerHTML = ""
    labelCreated.forEach((labelColor, index) => {
        labelList.innerHTML += `
            <div class="color-item-label">
                <input type="checkbox" id="label_color${index}">
                <label for="label_color${index}" style="background-color: ${labelColor.color};">${labelColor.name}</label>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#editLabelModal" data-label-index="${index}">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
            </div>
        `
    })
}
document.getElementById("labelModal").addEventListener("show.bs.modal", function (event) {
    renderLabel()
})


window.addEventListener("DOMContentLoaded", function(){
    loadBoardPage()
    renderBoardListSidebar()
})

function nextPage(boardID) {
    localStorage.setItem("boardID", boardID)
    window.location.href = "boardList.html"
}
