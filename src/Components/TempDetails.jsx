import React from 'react';
 import {FaTemperatureHigh} from 'react-icons/fa';
 import {GiWindmill} from 'react-icons/gi';
 import {WiHumidity} from 'react-icons/wi';
 import {FiSun} from 'react-icons/fi';
 import {WiSunset} from 'react-icons/wi';
 import {AiOutlineArrowUp,AiOutlineArrowDown} from 'react-icons/ai';
import { formatToLocalTime, iconUrlFromCode } from '../Service/WeatherService';


export const TempDetails = ({weather:{
  details,
  icon,
  temp,
  temp_min,
  temp_max,
  sunrise,
  sunset,
  speed,
  humidity,
  feels_like,
  timezone
}}) => {
  return (
    <div>


        <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
          <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img className='w-20 '
            src={iconUrlFromCode(icon)}
            alt="" />
              <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
              <div className='flex flex-col space-y-2 items-center'>


                <div className='flex font-light text-sm items-center justify-center'>
                    <FaTemperatureHigh size={18} className='mr-1'  />
                    Real fell:
                    <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                </div>


                <div className='flex font-light text-sm items-center justify-center'>
                    <WiHumidity size={18} className='mr-1'  />
                    Humidity:
                    <span className='font-medium ml-1'>{`${humidity.toFixed()}%`} </span>
                </div>


                <div className='flex font-light text-sm items-center justify-center'>
                    <GiWindmill size={18} className='mr-1'  />
                     Wind Speed:
                    <span className='font-medium ml-1'>{`${speed.toFixed()}kmph`} </span>
                </div>


              </div>



        </div>

        <div className='flex flex-row items-center justify-center space-x-2 text-white  text-sm py-3'>
            <FiSun/>
            <p className='font-light'>Rise: 
            <span className='font-medium ml-2'>{formatToLocalTime(sunrise,timezone,"hh:mm a")}</span>
            </p>
            <p className='font-light'></p>

            <WiSunset/>
            <p className='font-light'>Set: 
            <span className='font-medium ml-2'>{formatToLocalTime(sunset,timezone,"hh:mm a")}</span>
            </p>
            <p className='font-light'></p>

            <AiOutlineArrowUp/>
            <p className='font-light'>High: 
            <span className='font-medium ml-2'>{`${temp_max.toFixed()}`}</span>
            </p>
            <p className='font-light'></p>

            <AiOutlineArrowDown/>
            <p className='font-light'>Low: 
            <span className='font-medium ml-2'>{`${temp_min.toFixed()}`}</span>
            </p>
            


        </div>
    </div>
  )
}
