import { useState } from "react";

export const WheaterApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'b85a80ffab59f543ced3eeb9149bed14'
    const difKelvin = 273.15

  const [cuidad, setCuidad] = useState("");
  const [dataClima, setDataClima] = useState(null)

  const handleCambioCuidad = (e) => {
    setCuidad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cuidad.length > 0) fetchClima();
  };

  const fetchClima = async () =>{
    try {
        const response = await fetch(`${urlBase}?q=${cuidad}&appid=${API_KEY}`)
        const data = await response.json()
        setDataClima(data)
    } catch (error) {
        console.error('Ocurrio el siguiente problema:', error);
    }
  }

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={cuidad} onChange={handleCambioCuidad} />
        <button type="submit">Buscar</button>
      </form>
      {
        dataClima && (
            <div>
                <h2>{dataClima.name}</h2>
                <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
            </div>
        )
      }
    </div>
  );
};
