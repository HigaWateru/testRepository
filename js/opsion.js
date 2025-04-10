document.querySelectorAll('.background-option').forEach(opt => {
    opt.addEventListener('click', function() {
        document.querySelectorAll('.background-option').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.querySelectorAll('.color-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.color-item').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
    });
});

let checkBoxList = document.getElementById('done-2')
let checkBoxModal = document.getElementById('done-modal-2')
checkBoxList.addEventListener('change', function(){
    checkBoxModal.checked = this.checked
})
checkBoxModal.addEventListener('change', function(){
    checkBoxList.checked = this.checked
})

function openModalinModal(modal1, modal2){
    let firstModal = document.getElementById(modal1)
    let secondModal = new bootstrap.Modal(document.getElementById(modal2))
    firstModal.addEventListener('hidden.bs.modal', function(){
        secondModal.show()
    })
}

document.addEventListener("DOMContentLoaded", function () {
    const checkboxStartdate = document.getElementById("allowStartdate")
    const startDate = document.getElementById("startDate")
    const checkboxDuedate = document.getElementById("allowDuedate")
    const dateInput = document.getElementById("dateInput")
    const timeInput = document.getElementById("timeInput")

    startDate.disabled = true
    dateInput.disabled = true
    timeInput.disabled = true

    checkboxStartdate.addEventListener("change", function(){
        startDate.disabled = !checkboxStartdate.checked
    })
    checkboxDuedate.addEventListener("change", function () {
        dateInput.disabled = !checkboxDuedate.checked
        timeInput.disabled = !checkboxDuedate.checked
    })
})

function switchModal(currentModalId, previousModalId) {
    let currentModal = new bootstrap.Modal(document.getElementById(currentModalId))
    currentModal.hide()
    
    let previousModal = new bootstrap.Modal(document.getElementById(previousModalId))
    previousModal.show()
}

