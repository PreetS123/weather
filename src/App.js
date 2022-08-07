// import UilReact from '@iconscout/react-unicons/icons/uil-react';

import { useEffect, useState } from 'react';
import './App.css';
import { Forecast } from './Components/Forecast';
import { Inputs } from './Components/Inputs';
import { TempDetails } from './Components/TempDetails';
import { TimeLocation } from './Components/TimeLocation';
import { TopButtons } from './Components/TopButtons';
import { getFormattedWeatherData } from './Service/WeatherService';

function App() {
  const [querry, setQuerry] = useState({ q: 'delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);



  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ ...querry, units }).then(
      (data) => {
        setWeather(data);
      }
    )
    console.log(data);
  }


  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
    return 'from-yellow-700 to-orange-700'
  }


  useEffect(() => {
    fetchWeather();
  }, [querry, units]);


  return (
    <div className={`
      mx-auto
      max-w-screen-md
      mt-4 py-5 px-32 
      bg-gradient-to-br 
      from-cyan-700 to-blue-700 
      h-fit 
      shadow-xl 
      shadow-gray-400 
      ${formatBackground()} `}>
      <TopButtons setQuerry={setQuerry} />
      <Inputs setQuerry={setQuerry} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeLocation weather={weather} />
          <TempDetails weather={weather} />
          <Forecast title='hourly forecast' items={weather.hourly} />
          <Forecast title='daily forecast' items={weather.daily} />
        </>
      )}

    </div>
  );
}

export default App;
