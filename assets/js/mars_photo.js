document.addEventListener('DOMContentLoaded', function() {
  const datePicker = document.querySelector('#selected-date');
  const roverSelect = document.querySelector('#selected-rover');
  const submitBtn = document.querySelector('#submit-btn');
  const carouselInner = document.querySelector('.carousel-inner');

  submitBtn.addEventListener('click', async function() {
    const selectedDate = datePicker.value;
    const selectedRover = roverSelect.value;
    const API_KEY = "qF7p0U4DXMYwXJZnsf6pmQG2cIJNuVBJWlLvei8X";
    const API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${selectedDate}&api_key=${API_KEY}`;
  
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
  
    carouselInner.innerHTML = '';
  
    data.photos.forEach((photo, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
  
      if (index === 0) {
        carouselItem.classList.add('active');
      }
  
      const img = document.createElement('img');
      img.classList.add('d-block', 'w-80');
      img.src = photo.img_src;
      img.alt = `Mars ${selectedRover} photo`;
  
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });
  });
});
