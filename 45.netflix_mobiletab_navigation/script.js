const openBtn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')

openBtn.addEventListener('click', () => {
    nav.forEach(navElem => navElem.classList.add('visible'))
})
closeBtn.addEventListener('click', () => {
    nav.forEach(navElem => navElem.classList.remove('visible'))
})