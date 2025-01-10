import "./WeatherInformentions5days.css";
/* eslint-disable react/prop-types */

function WeatherInformentions5days({ weather5Day }) {
  //console.log("dados do weather 5 dias", weather5Day);
  let dailyForecast = {};

  for (let forecast of weather5Day.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
    //console.log("dados do weather 5 dias depois da conversão", weather5Day);
  }

  const nextFiveDays = Object.values(dailyForecast).slice(1, 6);
  //console.log("dados do weather 5 dias depois do slice", nextFiveDays);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
    });

    return newDate;
  }

  return (
    <div className="weather-container">
      <h3>Proximos 5 dias</h3>
      <div className="weather-lista">
        {nextFiveDays.map((forecast) => (
          <dvi key={forecast.dt} className="weather-item">
            <p className="forecast-name">{convertDate(forecast)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt="Ícone do clima"
            ></img>
            <p className="forecast-descripton">
              {forecast.weather[0].description}
            </p>
            <div className="max-min">
              <p>Máx.: {Math.round(forecast.main.temp_max)}ºC</p>
              <div className="vertical-line5day"></div>
              <p>Min.: {Math.round(forecast.main.temp_min)}ºC</p>
            </div>
          </dvi>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformentions5days;
