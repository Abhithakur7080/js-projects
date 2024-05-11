const header = document.getElementById("header");
const title = document.getElementById("title");
const excerpt = document.getElementById("excerpt");
const profile_img = document.getElementById("profile_img");
const name = document.getElementById("name");
const date = document.getElementById("date");

const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_text = document.querySelectorAll(".animated-bg-text");
setTimeout(getData, 2500);

function getData(){
    header.innerHTML = `<img src="https://plus.unsplash.com/premium_photo-1661775756810-82dbd209fc95?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="header image"/>`
    title.innerHTML = 'Lorem ipsum dolor sit amet'
    excerpt.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, laborum.'
    profile_img.innerHTML = '<img src="https://randomuser.me/api/portraits/men/75.jpg" alt="profile image"/>'
    name.innerHTML = 'John Doe'
    date.innerHTML = 'Oct 08, 2020'
    animated_bgs.forEach(bg => bg.classList.remove('animated-bg'))
    animated_bg_text.forEach(bg => bg.classList.remove('animated-bg-text'))
}
