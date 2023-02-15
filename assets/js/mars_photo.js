/* This is a JavaScript function that is executed when the DOM is loaded. */
document.addEventListener("DOMContentLoaded", function () {
  /* This is selecting the date picker element from the DOM. */
  const datePicker = document.querySelector("#selected-date");
  /* This is selecting the rover select element from the DOM. */
  const roverSelect = document.querySelector("#selected-rover");
  /* This is selecting the submit button from the DOM. */
  const submitBtn = document.querySelector("#submit-btn");
  /* This is selecting the carousel inner element from the DOM. */
  const carouselInner = document.querySelector(".carousel-inner");


  submitBtn.addEventListener("click", async function () {
    // clear the submit btn

    /* This is assigning the value of the date picker to the variable selectedDate. */
    const selectedDate = datePicker.value;
    /* This is assigning the value of the rover select element to the variable selectedRover. */
    const selectedRover = roverSelect.value;
    const API_KEY = "qF7p0U4DXMYwXJZnsf6pmQG2cIJNuVBJWlLvei8X";
    const API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${selectedDate}&api_key=${API_KEY}`;

    /* This is fetching the data from the API and converting it to JSON. */
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data);

    /* This is clearing the carousel inner element. */
    carouselInner.innerHTML = "";

    /* This is checking to see if the data.photos array is empty. If it is, it will create an alert
    div and append it to the carousel inner element. */
    if (data.photos.length === 0) {
      const alert = document.createElement("div");
      alert.classList.add("alert", "alert-danger");
      alert.innerHTML = `No photos available for ${selectedDate}`;
      carouselInner.appendChild(alert);
    } else {
      $("#photoCount").text(
        `${data.photos.length} photos available for ${selectedDate}`
      );
      $("#photoCountModal").modal("show");
    }

    /* This is a forEach loop that is looping through the data.photos array. For each item in the
    array,creating a carousel item div, adding the carousel item class to it, and adding the active class
    to the first item in the array.*/
    data.photos.forEach((photo, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      /* This is checking to see if the index is equal to 0. If it is, it is adding the active class to
     the carousel item. */
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      /* This is creating an img element, adding the d-block and imgSize classes to it, assigning the
      img_src property of the photo object to the src attribute of the img element, and assigning the alt
      attribute of the img element to the selectedRover and datePicker variables. */
      const img = document.createElement("img");
      img.classList.add("d-block", "imgSize");
      img.src = photo.img_src;
      img.alt = `Mars ${selectedRover} photo on ${datePicker}`;

      /* This is creating a figcaption element, creating a p element, assigning the innerHTML of the p
      element to a string that contains the camera name, and appending the p element to the
      figcaption element. */
      const figCaption = document.createElement("figcaption");
      const cameraInfo = document.createElement("p");
      cameraInfo.innerHTML = `Camera: <a href="${photo.img_src}" target="_blank">${photo.camera.full_name}</a>`;
      figCaption.appendChild(cameraInfo);

      /* This is creating a p element, assigning the innerHTML of the p element to a string that
      contains the rover name and status, and appending the p element to the figcaption element. */
      const roverInfo = document.createElement("p");
      roverInfo.innerHTML = `Rover: ${photo.rover.name} (${photo.rover.status})`;
      figCaption.appendChild(roverInfo);

      /* This is creating a p element, assigning the innerHTML of the p element to a string that
      contains the sol, and appending the p element to the figcaption element. */
      const solInfo = document.createElement("p");
      solInfo.innerHTML = `Sol: ${photo.sol}`;
      figCaption.appendChild(solInfo);

      /* Create a download button */
      const downloadButton = document.createElement("button");
      downloadButton.innerHTML = "Download";
      downloadButton.classList.add("btn", "btn-secondary", "mx-5");
      figCaption.appendChild(downloadButton);

      /* Add an event listener to the button that triggers the download of the image */
      downloadButton.addEventListener("click", function () {
        const link = document.createElement("a");
        link.href = photo.img_src;
        link.download = `Mars ${selectedRover} ${photo.sol}`;
        link.click();
      });

      /* This is appending the img and figcaption elements to the carousel item element, and then
      appending the carousel item element to the carousel inner element. */
      carouselItem.appendChild(img);
      carouselItem.appendChild(figCaption);
      carouselInner.appendChild(carouselItem);
    });
  });
});
