// alert('hello');
// Create a function to retrieve the data from the API
async function getAPOD() {

    /* The above code is fetching the data from the API and then displaying it on the webpage. */ 
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=qF7p0U4DXMYwXJZnsf6pmQG2cIJNuVBJWlLvei8X`);
        const data = await response.json();
        console.log(data);

        // date
        const date = data.date;
        console.log(date);
        // copy right
        const copyRight = data.copyright;
        console.log(copyRight);
        // explenation
        const explanation = data.explanation;
        console.log(explanation);
        // hdurl
        const hdurl = data.hdurl;
        console.log(hdurl);
        // media_type
        const media_type = data.media_type;
        console.log(media_type);
        // service_version
        const service_version = data.service_version;
        console.log(service_version);

        // url
        const url = data.url;
        console.log(url);
        // error
        const error = data.error;
        console.log(error);
        // imageURL
        const imageURL = data.url;
        console.log(imageURL);
        // explanation
        const description = data.explanation;
        console.log(description);
        // title
        const titleGalaxy = data.title; 
        console.log(titleGalaxy);
    
        //Update title
        const title = document.getElementById("title");
        title.innerHTML = titleGalaxy;

        // date to title 
        const dateTitle = document.getElementsByClassName("date__img");
        dateTitle[0].innerHTML = date;
        // Create an image element and set its src attribute to the image URL
        const image = document.getElementById("header__image");
        image.src = imageURL;
        image.alt = titleGalaxy;
        // Caption the image
        const caption = document.getElementById("header__caption");
        caption.innerHTML = copyRight;

        const modalBody = document.getElementById("modalBody");
        modalBody.innerHTML = description;


    } catch (error) {
        // Display the error message in a Bootstrap alert
        const alert = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${error.message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `;
        document.getElementById("alertContainer").innerHTML = alert;

    }
  }
  
  // Call the function to retrieve the data when the page loads
  window.onload = function() {
    getAPOD();
  };