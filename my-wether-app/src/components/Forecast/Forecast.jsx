import { useState } from "react";
import "./Forecast.css/";
import getDay from "../../Utils/getDay";

function Forecast({ onUnitSelect, unitSelect, week, todayForecast }) {
  const [dayToogle, setDayToogle] = useState(true);

  console.log(todayForecast.forecast.forecastday[0]);
  const forecast = todayForecast.forecast.forecastday[0];

  function weekItems() {
    return week.forecastday.map((id) => (
      <div className="days">
        <p>{getDay(id.date).day.substring(0, 3)}</p>
        <img src={id.day.condition.icon} alt="id" />
        <p>
          {Math.ceil(
            Number(unitSelect === "fare" ? id.day.maxtemp_c : id.day.maxtemp_f)
          )}
          <span>
            {" "}
            {Math.ceil(
              Number(
                unitSelect === "fare" ? id.day.mintemp_c : id.day.mintemp_f
              )
            )}
          </span>
        </p>
      </div>
    ));
  }

  function dayItems() {
    return forecast.hour
      .filter((obj, index) => {
        return (index + 1) % 3 === 0;
      })
      .map((obj) => {
        return (
          <div className="days">
            <p>{getDay(obj?.time).time}</p>
            <img src={obj?.condition?.icon} alt="id" />
            <p>{unitSelect === "fare" ? obj?.temp_c : obj?.temp_f}</p>
          </div>
        );
      });
  }
  console.log(dayItems());
  return (
    <div className="forecast">
      <div className="forecast-header">
        <div className="select-forecast">
          <h2
            className={dayToogle ? "selected-forecast" : ""}
            onClick={() => setDayToogle(!dayToogle)}
          >
            Today
          </h2>
          <h2
            className={dayToogle ? "" : "selected-forecast"}
            onClick={() => setDayToogle(!dayToogle)}
          >
            Week
          </h2>
        </div>
        <div className="select-unit">
          <p
            className={unitSelect === "fare" ? "unit selected-unit" : "unit"}
            onClick={(e) => {
              onUnitSelect(e.target.innerText);
            }}
          >
            °C
          </p>
          <p
            className={unitSelect === "fare" ? "unit " : "unit selected-unit"}
            onClick={(e) => {
              onUnitSelect(e.target.innerText);
            }}
          >
            °F
          </p>
        </div>
      </div>
      <div className="forecast-items">
        {!dayToogle ? forecast && dayItems() : week && weekItems()}
      </div>
      <h2>Today's Detail</h2>
      <div className="grid-items">
        <div className="grid-item">
          <p>UV Index</p>
          <div className="item">
            <h2>{todayForecast?.current?.uv}</h2>
          </div>
        </div>
        <div className="grid-item">
          <p>Wind status</p>
          <div className="item">
            <h2>
              {todayForecast?.current?.wind_kph}
              <span> Km/hr</span>
            </h2>
          </div>
        </div>

        <div className="grid-item">
          <p>Sunrise & Sunset</p>
          <div className=" sun-item">
            <div className="sun-time">
              <img src="/src/assets/sunrise.png" alt="" srcset="" />
              <p>{forecast?.astro?.sunrise}</p>
            </div>
            <div className="sun-time">
              <img src="/src/assets/sunset.png" alt="" srcset="" />
              <p>{forecast?.astro?.sunset}</p>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <p>Humidity</p>
          <div className="item">
            <h2>{todayForecast?.current?.humidity}</h2>
          </div>
        </div>
        <div className="grid-item">
          <p>Visibility</p>
          <div className="item">
            <h2>{todayForecast?.current?.vis_km} km</h2>
          </div>{" "}
        </div>
        <div className="grid-item">
          <p>Wind Degree</p>
          <div className="item">
            <h2>{todayForecast?.current?.wind_degree} </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
