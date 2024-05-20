const contents = document.querySelectorAll('.content');
const listItems = document.querySelectorAll('nav ul li');

listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        //remove class first
        contents.forEach(content => content.classList.remove('show'))
        listItems.forEach(item => item.classList.remove('active'))
        //then add class
        item.classList.add('active');
        contents[index].classList.add('show')
    })
})