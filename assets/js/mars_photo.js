document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('#fun-fact-modal');
  const closeBtn = document.querySelector('.close');
  const datePicker = document.querySelector('#selected-date');
  const roverSelect = document.querySelector('#selected-rover');
  const submitBtn = document.querySelector('#submit-btn');
  const carouselInner = document.querySelector('.carousel-inner');

  if (!localStorage.getItem('visited')) {
    modal.style.display = 'block';
    localStorage.setItem('visited', true);
  }
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  submitBtn.addEventListener('click', async function() {
    const selectedDate = datePicker.value;
    const selectedRover = roverSelect.value;
    const API_KEY = "qF7p0U4DXMYwXJZnsf6pmQG2cIJNuVBJWlLvei8X";
    const API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${selectedDate}&api_key=${API_KEY}`;
  
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data);
  
    carouselInner.innerHTML = '';
  
    if (data.photos.length === 0) {
      const alert = document.createElement('div');
      alert.classList.add('alert', 'alert-danger');
      alert.innerHTML = `No photos available for ${selectedDate}`;
      carouselInner.appendChild(alert);
      return;
    }
  
    data.photos.forEach((photo, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
  
      if (index === 0) {
        carouselItem.classList.add('active');
      }
  
      const img = document.createElement('img');
      img.classList.add('d-block', 'w-80');
      img.src = photo.img_src;
      img.alt = `Mars ${selectedRover} photo on ${datePicker}`;
  
      const cameraInfo = document.createElement('p');
      cameraInfo.innerHTML = `Camera: <a href="${photo.img_src}" target="_blank">${photo.camera.full_name}</a>`;
  
      const roverInfo = document.createElement('p');
      roverInfo.innerHTML = `Rover: ${photo.rover.name} (${photo.rover.status})`;
  
      const solInfo = document.createElement('p');
      solInfo.innerHTML = `Sol: ${photo.sol}`;
  
      carouselItem.appendChild(img);
      carouselItem.appendChild(cameraInfo);
      carouselItem.appendChild(roverInfo);
      carouselItem.appendChild(solInfo);
      carouselInner.appendChild(carouselItem);
    });
  });
});
