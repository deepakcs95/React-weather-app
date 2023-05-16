import { FaSearch, FaBullseye } from "react-icons/fa";
import "./currentWeather.css/";
import React, { useState } from "react";
import getDay from "../Utils/getDay";

function CurrentWeather({
  location,
  current,
  handleSearch,
  search,
  selectLocation,
  unitSelect,
}) {
  //get time and day
  const { day, time } = getDay(location?.localtime);
  //get icon
  let filename = "113.png";
  const url = current?.condition?.icon;
  if (url) {
    const segments = url.split("/");
    filename = segments[segments.length - 1];
  }

  //get rain percentage
  const maxPrecipMm = 10; // maximum possible precipitation amount in millimeters
  const rainPercentage = (current?.precip_mm / maxPrecipMm) * 100;

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="current-div">
      <form className="search" action="">
        <div className="search-box">
          <FaSearch className="search-icon" size="1.3rem" />
          <input
            onChange={(e) => {
              handleSearch(e.target.value);
              setInputValue(e.target.value);
            }}
            className="search-input"
            type="text"
            placeholder="search the city"
            value={inputValue}
          />
          <button className="search-btn" type="button">
            <FaBullseye
              onClick={(e) => {
                e.preventDefault;
                handleSearch("", true);
                setInputValue("");
              }}
              size="1.3rem"
            />
          </button>
        </div>
        <ul className="search-result">
          {search.map((suggestion) => (
            <li
              onClick={(e) => {
                selectLocation(e.target.innerText);
                handleSearch("", true);
                setInputValue("");
              }}
              key={suggestion.id}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      </form>

      <>
        {location && current && (
          <>
            <img
              className="current-icon"
              src={current?.condition?.icon}
              alt=""
            />
            {unitSelect === "degree" ? (
              <h2>{current?.temp_c}°C</h2>
            ) : (
              <h2>{current?.temp_f}°F</h2>
            )}

            <p>
              {day}, <span>{time}</span>
            </p>

            <hr className="style2" />

            <div className="current-sub-icon">
              <img src={current?.condition?.icon} alt="" />
              <p> {current?.condition?.text}</p>
            </div>
            <div className="current-sub-icon">
              <img src={current?.condition?.icon} alt="" />
              <p>Rain percentage: {rainPercentage}%</p>
            </div>
            <div className="city">
              <performance>
                {location?.name}, {location?.country}
              </performance>
            </div>
          </>
        )}
      </>
    </div>
  );
}
export default CurrentWeather;
