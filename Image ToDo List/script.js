//carousel
window.addEventListener("click", () => {
  const carouselImages = document.querySelectorAll(".carousel-items img");
  if (carouselImages[0].classList.contains("active")) {
      carouselImages[0].classList.remove("active");
      carouselImages[1].classList.add("active");
  } else {
      carouselImages[0].classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

  // Function to handle dropping files onto the drop zone
  dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      console.log(files);
      displayFile(files);
  });
  fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      displayFile(files);
  });

  function displayFile(files) {
      if (files.length + fileList.children.length > MAX_IMAGES) {
          alert("Maximum number of images exceeded");
          return;
      }
      [...files].forEach((file) => {
          const reader = new FileReader();

          reader.onload = function (e) {
              const div = document.createElement("div");
              div.className = "file-name";

              const img = document.createElement("img");
              img.src = e.target.result;
              img.alt = file.name;
              img.className = "thumbnail";
              div.appendChild(img);
              fileList.append(div);
          };
          reader.readAsDataURL(file);
      });
  }

  // Function to load the data from localStorage
  function loadFromLocalStorage() {
      const storedImagesData = JSON.parse(
          localStorage.getItem("storedImagesData") || "[]"
      );
      console.log("Loaded from localStorage:", storedImagesData);
      storedImagesData.forEach((data) => {
          const div = document.createElement("div");
          div.className = "file-name";

          const img = document.createElement("img");
          img.src = data.src;
          img.className = "thumbnail";
          div.appendChild(img);
          fileList.appendChild(div);
      });
  }
  loadFromLocalStorage();
});
