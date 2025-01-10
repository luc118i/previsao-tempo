/* eslint-disable react/prop-types */
import "./WeatherInformentions.css";
import {
  FaWind,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaTint, // Ícone para Umidade
  FaTachometerAlt,
  FaCompass, // Ícone para Pressão Atmosférica
} from "react-icons/fa";
import { useState } from "react";

function WeatherInformentions({ weather }) {
  const [isMetric, setIsMetric] = useState(true);
  console.log(weather);

  // Alternar unidade de velocidade
  function toggleUnit() {
    setIsMetric(!isMetric);
  }

  // Obter direção do vento com ícones
  function getWindDirectionIcon(deg) {
    if (deg === undefined || deg === null) {
      return { label: "Desconhecida", icon: <FaWind size={20} /> };
    }

    const directions = [
      { label: "N", icon: <FaArrowUp size={20} /> },
      {
        label: "NE",
        icon: <FaArrowUp style={{ transform: "rotate(45deg)" }} size={20} />,
      },
      { label: "E", icon: <FaArrowRight size={20} /> },
      {
        label: "SE",
        icon: <FaArrowRight style={{ transform: "rotate(45deg)" }} size={20} />,
      },
      { label: "S", icon: <FaArrowDown size={20} /> },
      {
        label: "SW",
        icon: <FaArrowDown style={{ transform: "rotate(45deg)" }} size={20} />,
      },
      { label: "W", icon: <FaArrowLeft size={20} /> },
      {
        label: "NW",
        icon: <FaArrowLeft style={{ transform: "rotate(45deg)" }} size={20} />,
      },
    ];
    const index = Math.round(deg / 45) % 8; // Divide os graus em 8 setores
    return directions[index];
  }

  // Velocidade e direção do vento
  const windSpeed = weather.wind?.speed || 0;
  const windDirection = weather.wind?.deg
    ? getWindDirectionIcon(weather.wind.deg)
    : null;

  const displaySpeed = isMetric
    ? `${windSpeed} m/s`
    : `${(windSpeed * 3.6).toFixed(2)} km/h`;

  // Função para capitalizar a primeira letra
  function capitalizeFirstLetter(text) {
    if (!text) return ""; // Retorna uma string vazia se o texto estiver indefinido ou nulo
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div className="weather-container">
      <h2>{weather.name}</h2>

      <div className="weather-infor">
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="Ícone do clima"
        ></img>

        <h2 className="temperatuew-main">{Math.round(weather.main.temp)} ºC</h2>
      </div>
      <div
        className="wind-info"
        onClick={toggleUnit}
        title="Clique para alternar unidades"
      >
        <FaWind size={30} color="#A9A9A9" style={{ cursor: "pointer" }} />
        <p>
          {weather.wind.speed
            ? `${displaySpeed}`
            : "Dados de vento não disponíveis"}
        </p>
        {windDirection?.icon}
      </div>
      <p className="descripton">
        {capitalizeFirstLetter(weather.weather[0].description)}
      </p>
      <div className="max-min">
        <p>Máx.: {Math.round(weather.main.temp_max)}ºC</p>
        <div className="vertical-line"></div>
        <p>Min.: {Math.round(weather.main.temp_min)}ºC</p>
      </div>
      <div className="separator-line"></div>
      <div className="details">
        <p>
          <span className="material-symbols-outlined">device_thermostat</span>
          Sensação térmica: {Math.round(weather.main.feels_like)} ºC
        </p>
        <div className="vertical-line"></div>
        <p>
          <FaTint size={18} style={{ marginRight: "5px" }} />
          Umidade: {weather.main.humidity}%
        </p>
        <div className="vertical-line"></div>
        <p>
          <FaTachometerAlt size={18} style={{ marginRight: "5px" }} />
          Pressão atmosférica: {weather.main.pressure} hPa
        </p>
        <div className="vertical-line"></div>

        <p>
          <FaCompass size={18} style={{ marginRight: "5px" }} />
          Direção do vento: {windDirection?.label}
        </p>
      </div>
    </div>
  );
}

export default WeatherInformentions;
