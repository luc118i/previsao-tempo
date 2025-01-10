import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformentions from "./Components/WeatherInformentions/WeatherInformentions";
import SearchInput from "./Components/SearchInput/SearchInput";
import WeatherInformentions5Days from "./Components/WeatherInformentions5days/WeatherInformentions5days";

function App() {
  const [weather, setWeather] = useState(null);
  const [weather5Day, setWeather5Day] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  async function searchCity(city = null) {
    const cityName = city || inputRef.current?.value.trim();
    if (!cityName) {
      alert("Por favor, insira o nome de uma cidade.");
      return;
    }

    setIsLoading(true);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
      const { data } = await axios.get(url);
      setWeather(data);
    } catch (error) {
      console.error("Erro:", error);
      alert("Cidade não encontrada ou problema na conexão.");
    } finally {
      setIsLoading(false);
    }

    try {
      const { data } = await axios.get(url5Days);
      setWeather5Day(data);
    } catch (error) {
      console.error("Erro ao buscar previsão de 5 dias:", error);
      alert("Não foi possível carregar a previsão de 5 dias.");
    }
  }

  useEffect(() => {
    searchCity("Brasília"); // Carrega Brasília ao iniciar
  }, []);

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <SearchInput
        onSearch={() => searchCity()}
        ref={inputRef}
        isLoading={isLoading}
      />
      {weather && <WeatherInformentions weather={weather} />}
      {weather5Day && <WeatherInformentions5Days weather5Day={weather5Day} />}
    </div>
  );
}

export default App;
