const apiUrl =
  "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const temperature = data.sol_keys[0];
    console.log(`Temperature is: ${temperature}`);
    const tempMin = data[temperature].AT.mn;
    console.log(`Min_temp: ${tempMin}`);
    const tempMax = data[temperature].AT.mx;
    console.log(`Max_temp: ${tempMax}`);
    const windSpeed = data[temperature].HWS.av;
    console.log(`Wind speed: ${windSpeed}`);
    const northernSeason = data[temperature].Season;
    console.log(`Northern Season: ${northernSeason}`);
    const southernSeason = data[temperature].Southern_season;
    console.log(`Southern Season: ${southernSeason}`);
    const windDirection = data[temperature].WD.most_common.compass_point;
    console.log(`Wind Direction: ${windDirection}`);
    const precipitation = data[temperature].PRE.av;
    console.log(`Precipitation: ${precipitation}`);
    const monthOrdinal = data[temperature].Month_ordinal;
    console.log(`Month Ordinal: ${monthOrdinal}`);
    const date = data[temperature].First_UTC;
    console.log(`Date: ${date}`);

    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${temperature}°C`;
    document.getElementById("minTemp").textContent = `Min: ${tempMin}°C`;
  })
  .catch((error) => console.error(error));
