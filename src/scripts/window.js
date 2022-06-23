// pop out window1
const openWindow1Button = document.querySelectorAll('[data-window1-target]')
const closeWindow1Button = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openWindow1Button.forEach(img => {
    img.addEventListener('click', () => {
        // selector whole pop out window
        const window1 = document.querySelector(img.dataset.window1Target)
        // call the function that i create
        openWindow1(window1)
    })
})

overlay.addEventListener('click', () => {
    const windows1 = document.querySelectorAll('.window1.active')
    windows1.forEach(window1 => {
        closeWindow1(window1)
    })
})

closeWindow1Button.forEach(button => {
    button.addEventListener('click', () => {
        const window1 = button.closest('.window1')
        closeWindow1(window1)
    })
})

function openWindow1(window1) {
    if (window1 === null) return
    window1.classList.add('active')
    overlay.classList.add('active')
}

function closeWindow1(window1) {
    if (window1 === null) return
    window1.classList.remove('active')
    overlay.classList.remove('active')
}