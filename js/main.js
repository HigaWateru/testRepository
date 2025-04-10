function signOut() {
    localStorage.removeItem('userID')
    localStorage.removeItem('rememberMe')
    localStorage.removeItem('userBoards')
    localStorage.removeItem('boardID')
    localStorage.removeItem('closedBoards')
    setTimeout(() => window.location.href = '../html/login.html', 500)
}

let dataStructure = JSON.parse(localStorage.getItem('dataStructure')) || []
const userID = Number(localStorage.getItem('userID'))
let user = dataStructure.find(user => user.id === userID)
if(!user) setTimeout(() => window.location.href = '../html/login.html', 500)
let starredBoards = user.boards.filter(board => board.is_starred)
let closedBoards = JSON.parse(localStorage.getItem('closedBoards')) || []

let workspace = document.getElementById('workspace')
let starred = document.getElementById('starred')
// let closed = document.getElementById('closed')

function renderBoard(boards, area, mod) {
    area.innerHTML = ''
    boards.forEach(board => {
        area.innerHTML += `
            <div class="board-card">
                <img src="assets/img/BackgroundboardCard${board.background}.png" alt="boardImg">
                <div class="header-title">
                    <span onclick="nextPage(${board.id})">${board.title}</span>
                    ${mod !== "closed" ?
                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pen-fill" viewBox="0 0 16 16" data-bs-toggle="modal"
                        data-bs-target="#updateModal" data-board-id="${board.id}">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5.5 0 0 1 11.5.796a1.5.5 0 0 1 1.998-.001" />
                    </svg>` : ``}
                </div>
            </div>
        `
    })
    if (mod === "workspace") {
        area.innerHTML += `
            <div class="board-card">
                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#createBoard">Create new board</button>
            </div>
        `
    }
}

let selectedBackground = null
let selectedColor = null

document.querySelectorAll(".background-option img").forEach(img => {
    img.addEventListener("click", function () {
        document.querySelectorAll(".background-option img").forEach(opt => opt.classList.remove("selected"))        
        this.classList.add("selected")
        selectedBackground = this.getAttribute("data-value")
    })
})

document.querySelectorAll(".color-item").forEach(color => {
    color.addEventListener("click", function () {
        document.querySelectorAll(".color-item").forEach(opt => opt.classList.remove("selected"))
        this.classList.add("selected")
        selectedColor = this.getAttribute("data-value")
    })
})

function createBoard() {
    document.querySelectorAll(".background-option img").forEach(opt => opt.classList.remove("selected"))
    document.querySelectorAll(".color-item").forEach(opt => opt.classList.remove("selected"))

    let boardTitleInput = document.getElementById("boardTitle")
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

    const modalElement = document.getElementById("createBoard")
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide()

    user.boards.push(newBoard)
    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
    renderBoard(user.boards, workspace, "workspace")

    boardTitleInput.value = ""
    validate.innerHTML = "👋 Please provide a valid board title"
    document.querySelectorAll(".background-option img").forEach(opt => opt.classList.remove("selected"))
    document.querySelectorAll(".color-item").forEach(opt => opt.classList.remove("selected"))
    selectedBackground = null
    selectedColor = null
}

document.addEventListener("click", function (event) {
    let editIcon = event.target.closest('.bi-pen-fill')
    if (editIcon) {
        const boardID = Number(editIcon.getAttribute("data-board-id"))
        let board = user.boards.find(board => board.id === boardID)
        if (!board) return

        document.getElementById("board_title").value = board.title
        selectedBackground = board.background
        selectedColor = board.color
        console.log(selectedBackground, selectedColor)
        localStorage.setItem("boardID", board.id)

        document.querySelectorAll(".background-option img").forEach(opt => {
            opt.classList.remove("selected")
            if (opt.getAttribute("data-value") === board.background) opt.parentElement.classList.add("selected")
        })

        document.querySelectorAll(".color-item").forEach(el => {
            el.classList.remove("selected")
            if (el.getAttribute("data-value") === board.color) el.classList.add("selected")
        })
    }
})

function editBoard() {
    let boardTitleInput = document.getElementById("board_title")
    let boardTitle = boardTitleInput.value.trim()

    const boardID = Number(localStorage.getItem("boardID"))
    let board = user.boards.find(board => board.id === boardID)
    let validate_update = document.getElementById("validate_update")

    if (!boardTitle) {
        validate_update.style.color = "red"
        validate_update.innerHTML = "😤 Please enter a title"
        return
    }

    board.title = boardTitle
    board.background = selectedBackground || board.background
    board.color = selectedColor || board.color

    const modalElement = document.getElementById("updateModal")
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide()

    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))
    renderBoard(user.boards, workspace, "workspace")

    if(board.is_starred){
        starredBoards = user.boards.filter(board => board.is_starred)
        renderBoard(starredBoards, starred, false)
    }
}


function nextPage(boardID) {
    localStorage.setItem("boardID", boardID)
    window.location.href = "boardList.html"
}

document.addEventListener("DOMContentLoaded", () => {
    renderBoard(user.boards, workspace, "workspace")
    renderBoard(starredBoards, starred, false)
    // renderBoard(closedBoards, closed, false)
})