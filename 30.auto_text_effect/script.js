const textElem = document.getElementById('text');
const speedElem = document.getElementById('speed');
const text = 'We Love Programming!';
let index = 1;
let speed = 300 / speedElem.value;

writeText();

function writeText(){
    textElem.innerText = text.slice(0, index)
    index++;
    if(index > text.length){
        index = 1
    }
    setTimeout(writeText, speed)
}
speedElem.addEventListener('input', (e) => speed = 300 / e.target.value)