const body = document.body;

body.addEventListener('mousemove', (e) => {
    const xPos = e.offsetX;
    const yPos = e.offsetY;
    const spanElement = document.createElement('span');
    spanElement.style.left = `${xPos}px`
    spanElement.style.top = `${yPos}px`
    const randomSize = Math.random()*100;
    spanElement.style.width = `${randomSize}px`
    spanElement.style.height = `${randomSize}px`
    body.appendChild(spanElement);
    setTimeout(() => {
        spanElement.remove()
    }, 3000)
})