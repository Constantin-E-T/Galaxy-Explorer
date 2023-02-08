const apiUrl = 'https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const temperature = data.sol_keys[0];
    

    document.getElementById('temperature').innerHTML = temperature;
  })
  .catch(error => console.error(error));