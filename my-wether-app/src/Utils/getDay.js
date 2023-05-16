export default function getDay(params) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //get date,time
  const date = new Date(params);
  const day = weekday[date.getDay()];

  function dayofweek() {
    return day;
  }

  const options = {
    hour12: false, // or false if you want 24-hour format
    hour: "numeric",
    minute: "numeric",
    second: undefined,
  };

  const t = date?.toLocaleTimeString([], options);
  function time() {
    return t;
  }

  return {
    day: dayofweek(),
    time: time(),
  };
}
