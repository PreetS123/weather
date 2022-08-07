import { DateTime } from "luxon";

const API_KEY = "be91ef7e65966566f810b5efd818c387"
const BASE_URL = "https://api.openweathermap.org/data/2.5";


// 

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=be91ef7e65966566f810b5efd818c387&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

    return fetch(url)
        .then(res => res.json())
    // .then(data=>data)

}


const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;
    const { main: details, icon } = weather[0];
    return { 
        lat,
         lon,
          temp, 
          feels_like, 
          temp_min, 
          temp_max, 
          humidity, 
          name, 
          dt, 
          country, 
          sunrise, 
          sunset, 
          details, 
          icon, 
          speed, 
         };
};


const formatForeCast = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });

    return { timezone, daily, hourly };
};




export const getFormattedWeatherData = async (searchParams) => {
    const formattedWeather =
        await getWeatherData('weather', searchParams)
            .then(formatCurrentWeather);

    const { lat, lon } = formattedWeather;
    const formattedForeCast = await getWeatherData('onecall', {
        lat, lon, 
        exclude: 'current,minutely,alerts',
         units:searchParams.units,
    }).then(formatForeCast);

    return {...formattedWeather, ...formattedForeCast};
}

 export const formatToLocalTime = (
    secs, 
    zone, 
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
    ) => 
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


  export  const iconUrlFromCode=(code)=>
        `http://openweathermap.org/img/wn/${code}@2x.png`;
    