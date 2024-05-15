const button = document.getElementById('btn')
const toasts = document.getElementById('toasts')

const messages = [
    "Message One",
    "Message Two",
    "Message Three",
    "Message Four"
]

const types = ["info", "success", "error"];

button.addEventListener('click', () => createNotification());

function createNotification(message = null, type = null){
    const noty = document.createElement('div');
    noty.classList.add('toast');
    noty.classList.add(type ? type : getRandomType());
    noty.innerText = message ? message : getRandomMessage();
    toasts.appendChild(noty);
    setTimeout(() => {
        noty.remove()
    }, 3000)
}
function getRandomMessage(){
    return messages[Math.floor(Math.random() * messages.length)]
}
function getRandomType(){
    return types[Math.floor(Math.random() * types.length)]
}