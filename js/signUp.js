let dataStructure = JSON.parse(localStorage.getItem('dataStructure')) || []
let signUpForm = document.getElementById('signUpForm')

function signUp(event) {
    event.preventDefault()
    let email = document.getElementById('email').value.trim()
    let username = document.getElementById('username').value.trim()
    let password = document.getElementById('password').value.trim()
    // let confirmPassword = document.getElementById('confirmPassword').value.trim()
    let messengerCard = document.getElementById('messengerCard')
    let creat_at = new Date().toISOString()

    function showError(message) {
        messengerCard.innerHTML = `
            <div class="headCard">
                <div style="display: flex; gap: 10px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" style="color: red;">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                    </svg>
                    <h5>Error</h5>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" onclick="closeError()">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
            <p>${message}</p>
        `
        messengerCard.classList.add('errorCard')
        setTimeout(() => {
            messengerCard.classList.remove('errorCard')
            messengerCard.innerHTML = ''
        }, 2000)
    }


    if (!email) return showError("Email không được bỏ trống")
    if (!/^[^@]+@[^@]+\.(com|vn)$/.test(email)) return showError("Email phải đúng định dạng @example.com hoặc @example.vn")
    if (!username) return showError("Tên đăng nhập không được để trống")
    if (!password) return showError("Mật khẩu không được để trống")
    if (password.length < 8) return showError("Mật khẩu tối thiểu 8 ký tự")
    // if (password !== confirmPassword) return showError("Mật khẩu xác thực không trùng khớp")

    let newId = dataStructure.length ? dataStructure[dataStructure.length - 1].id + 1 : 1
    dataStructure.push({ id: newId, email, username, password, creat_at, boards: [] })
    localStorage.setItem('dataStructure', JSON.stringify(dataStructure))

    messengerCard.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" style="color: #2df184">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <p>Đăng ký thành công</p>
    `
    messengerCard.classList.add('allowCard')
    setTimeout(() => window.location.href = '../html/login.html', 1500)
}

function closeError() {
    let messengerCard = document.getElementById('messengerCard')
    if (messengerCard) {
        messengerCard.innerHTML = ''
        messengerCard.classList.remove('errorCard')
    }
}
