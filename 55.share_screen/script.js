const shareScreen = document.getElementById("shareScreen");
const stopScreen = document.getElementById("stopScreen");
const video = document.getElementById("video");
const hide = document.getElementById("hide");

let stream;
shareScreen.addEventListener("click", shareYourScreen);
stopScreen.addEventListener("click", stopYourScreen);

async function shareYourScreen() {
  stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  video.srcObject = stream;
  shareScreen.style.display = "none"
  stopScreen.style.display = "block"
  hide.classList.add("hide");
}
async function stopYourScreen() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    stopScreen.style.display = "none"
    shareScreen.style.display = "block"
    hide.classList.remove("hide");
  }
}
