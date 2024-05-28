const textElem = document.getElementById('text');
const micElem = document.getElementById('mic');

micElem.addEventListener('click', speak)
let speaking = false;
function speak(){
    const text = textElem.value;
    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(text)
    if(speaking){
        synth.cancel()
        micElem.innerText = '▶️'
        speaking = false;
    } else {
        synth.speak(voice);
        micElem.innerText = '🔴'
        speaking = true;
    }
    voice.addEventListener('end', () => {
        micElem.innerText = '▶️';
        speaking = false;
    });
}