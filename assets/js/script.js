// alert('hello');
// Create a function to retrieve the data from the API
async function getAPOD() {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
    const data = await response.json();
    console.log(data);
  
    // Extract the image URL and description from the data
    const imageURL = data.url;
    const description = data.explanation;
  
    // Update the header on the main page with the image and description
    const header = document.getElementById("header");
    header.style.backgroundImage = `url('${imageURL}')`;
    header.innerHTML = description;
  }
  
  // Call the function to retrieve the data when the page loads
  window.onload = function() {
    getAPOD();
  };