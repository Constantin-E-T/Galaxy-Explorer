const apiUrl =
  "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0";

/* Fetch(apiUrl) is calling the apiUrl and returning a promise. */
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
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

      document.getElementById("date").innerHTML = date;
      document.getElementById(
        "last-update-of-data"
      ).innerHTML = `Last Updated: ${lastUpdated}`;
      document.getElementById(
        "temperature_min"
      ).innerHTML = `Min temp.: ${temperatureData.mn.toFixed(1)} &#8451;`;
      document.getElementById(
        "temperature_max"
      ).innerHTML = `Max temp.: ${temperatureData.mx.toFixed(1)} &#8451;`;
      document.getElementById(
        "wind"
      ).innerHTML = `Wind speed: ${windData.av.toFixed(1)} m/s`;
    }

    /* Calling the function displayWeatherData() */
    displayWeatherData();

    /* Adding an event listener to the previous button. When the button is clicked, it will decrease
    the solIndex by 1. If the solIndex is less than 0, it will set the solIndex to the length of the
    solKeys array minus 1. Then it will call the displayWeatherData() function. */
    document.getElementById("previous").addEventListener("click", () => {
      solIndex--;
      if (solIndex < 0) {
        solIndex = solKeys.length - 1;
      }
      displayWeatherData();
    });

    /* Adding an event listener to the next button. When the button is clicked, it will increase the
    solIndex by 1. If the solIndex is greater than or equal to the length of the solKeys array, it
    will set the solIndex to 0. Then it will call the displayWeatherData() function. */
    document.getElementById("next").addEventListener("click", () => {
      solIndex++;
      if (solIndex >= solKeys.length) {
        solIndex = 0;
      }
      displayWeatherData();
    });
  })
  /* Catching any errors that may occur and logging them to the console. */
  .catch((error) => console.error(error));

// Fun Fact generator
const facts = [
  "The temperature on Eris is believed to be between -359 degrees F to -405 F.",
  "Once every second a star somewhere in the universe explodes.",
  "The corona, the outer atmosphere of the sun, can only be seen during a total solar eclipse.",
  "Gas giants have been found around more than a thousand stars by the Kepler mission and are often referred to by such names as Hot Jupiters, Super Jupiters and Giant Neptunes.",
  "The thick atmosphere also protects Venus from meteors as they tend to disintegrate before they can pass through to the planet's surface. This means that Venus has fewer crater impacts than on the other inner planets.",
  "The surface temperature on the sun is increasing and eventually it will be so hot on earth that our water will evaporate (not for about another one billion years).",
  "Because the moon takes almost the same amount of time to complete one revolution as it does one rotation, we see mainly the same side of the moon at all times.",
  "It is believed by some that there may be life on one of Jupiter's moons, Europa.",
  "Most of the world's satellites are located in the ionosphere, which is considered the first part of outer space. The International Space Station is also located in the ionosphere.",
  "The Local Group which includes Andromeda contains 30 total galaxies.",
  "The Moon is said to be 4.5 billion years old.",
  "Jupiter has also been referred to as Zeus (the Greek god of thunder), and Marduk the Mesopotamian.",
  "In the 8th century BC Homer wrote about Orion, Bootes, and Ursa Major in his poem Illiad and the Odyssey. This was the first Greek reference to constellations, which would have been learned from the ancient Egyptians.",
  "The Milky Way is a part of a larger group of galaxies called a Local Group.",
  "In 2013 a skydiver named Felix Baumgartner went to the highest level of the stratosphere and jumped. He was 120,000 feet above the earth's surface.",
  "Inner planets Mercury and Venus do not have any moons.",
  "Dysnomia is the name of Eris' moon. Dysnomia, in Greek mythology, was Eris' daughter. She was also the demon goddess of lawlessness.",
  "The ancient Greeks called Mars 'Ares'.",
  "Because the Moon is slowly drifting away from Earth, in about a million years a solar eclipse will not even be noticeable.",
  "It takes 87.97 Earth days for mercury to orbit the sun. ",
];

function getRandomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

document.addEventListener("DOMContentLoaded", function () {
  const funFact = document.getElementById("funFact");
  const newFactButton = document.getElementById("newFactButton");

  funFact.innerHTML = getRandomFact();

  newFactButton.addEventListener("click", function () {
    event.preventDefault();
    funFact.innerHTML = getRandomFact();
  });
});
