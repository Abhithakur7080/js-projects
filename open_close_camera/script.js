const openbtn = document.getElementById('openCamera')
const closebtn = document.getElementById('closeCamera')
const video = document.getElementById('video')
const hide = document.getElementById('hide')
//toogle camera
let stream;
openbtn.addEventListener('click', openCamera)
closebtn.addEventListener('click', closeCamera)
//functions
async function openCamera(){
    stream = await navigator.mediaDevices.getUserMedia({video: true})
    video.srcObject = stream;
    hide.classList.add('hide')
}
async function closeCamera(){
    if(stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        hide.classList.remove('hide')
    }
}