const apiUrl = 'https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0';

/* Fetch(apiUrl) is calling the apiUrl and returning a promise. */
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    /* The sol_keys array contains the keys for each day's data. */
    const solKeys = data.sol_keys;
    let solIndex = 0;

    /**
     * It takes the data from the API and displays it on the page
     */
    function displayWeatherData() {
      // sol is the key for each day's data
      const sol = solKeys[solIndex];
      // AT is the temperature data
      const temperatureData = data[sol].AT;
      // HWS is the wind speed data
      const windData = data[sol].HWS;
      // First_UTC is the first time the data was updated on the API in UTC
      const date = new Date(data[sol].First_UTC).toDateString();
      // last_UTC is the last time the data was updated on the API in UTC
      const lastUpdated = new Date(data[sol].Last_UTC).toDateString();


      document.getElementById('date').innerHTML = date;
      document.getElementById('last-update-of-data').innerHTML = `Last Updated: ${lastUpdated}`;
      document.getElementById('temperature_min').innerHTML = `Min: ${temperatureData.mn.toFixed(1)} &#8451;`;
      document.getElementById('temperature_max').innerHTML = `Max: ${temperatureData.mx.toFixed(1)} &#8451;`;
      document.getElementById('wind').innerHTML = `Speed: ${windData.av.toFixed(1)} m/s`;
    }

    /* Calling the function displayWeatherData() */
    displayWeatherData();

    /* Adding an event listener to the previous button. When the button is clicked, it will decrease
    the solIndex by 1. If the solIndex is less than 0, it will set the solIndex to the length of the
    solKeys array minus 1. Then it will call the displayWeatherData() function. */
    document.getElementById('previous').addEventListener('click', () => {
      solIndex--;
      if (solIndex < 0) {
        solIndex = solKeys.length - 1;
      }
      displayWeatherData();
    });

    /* Adding an event listener to the next button. When the button is clicked, it will increase the
    solIndex by 1. If the solIndex is greater than or equal to the length of the solKeys array, it
    will set the solIndex to 0. Then it will call the displayWeatherData() function. */
    document.getElementById('next').addEventListener('click', () => {
      solIndex++;
      if (solIndex >= solKeys.length) {
        solIndex = 0;
      }
      displayWeatherData();
    });
  })
  /* Catching any errors that may occur and logging them to the console. */
  .catch(error => console.error(error));