const inputValue = document.getElementById("inputText");
const btn = document.getElementById("btn");
const qrImage = document.getElementById("qrImage");

btn.addEventListener("click", generateQR);
inputValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    generateQR();
  }
});
function generateQR() {
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue.value}`;
  qrImage.classList.add("show");
}
