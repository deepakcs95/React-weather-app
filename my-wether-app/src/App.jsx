import { useEffect, useState } from "react";
import CurrentWeather from "./components/currentWeather";
import Forecast from "./components/Forecast/Forecast";

import "./App.css";

function App() {
  const [searchResult, setsearchResult] = useState([]);
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("degree");
  const [weekForecast, setweekForecast] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/ipinfo?&apiKey=${REACT_APP_API_KEY}`
        );
        const data = await response.json();

        console.log(data.city?.name.split(" ")[0]);
        if (data) {
          fetchWeather(data.city?.name.split(" ")[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, []);

  async function fetchWeather(locattion) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${REACT_WETHER_API_KEY}&q=${locattion}&q=${locattion}&days=1&aqi=no&alerts=no`
      );
      const data = await response.json();

      console.log(data);
      if (data) {
        setWeather((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const responseWeek = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${REACT_WETHER_API_KEY}&q=${locattion}&days=7&aqi=no&alerts=no&hour=12`
      );
      const dataWeek = await responseWeek.json();

      console.log(dataWeek?.forecast);
      if (dataWeek?.forecast) {
        setweekForecast((prev) => ({ ...prev, ...dataWeek?.forecast }));
        console.log(weekForecast);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(weather);

  // onSearch

  function onSearch(e, reset = false) {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=${REACT_WETHER_API_KEY}&q=${e}
`
        );
        const data = await response.json();

        console.log(data);
        if (data) {
          setsearchResult(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(e);
    if (e.length > 3) fetchLocation(e);
    if (reset) setsearchResult([]);
  }

  //handle set Location
  function handleLocation(location) {
    fetchWeather(location);
  }

  //handle UNit slection

  function handleUnit(u) {
    unit === "degree" ? setUnit("fare") : setUnit("degree");
  }

  return (
    <>
      {!weather ? (
        <h1>Loading..</h1>
      ) : (
        <main className="weather-card">
          {weather && weekForecast && (
            <>
              <CurrentWeather
                {...weather}
                handleSearch={onSearch}
                search={searchResult}
                selectLocation={handleLocation}
                unitSelect={unit}
              />
              <Forecast
                onUnitSelect={handleUnit}
                unitSelect={unit}
                week={weekForecast}
                todayForecast={weather}
              />
            </>
          )}
        </main>
      )}
    </>
  );
}

export default App;
