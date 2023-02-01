
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherSVG from "./img/weather.svg";
import { fetchWeatherAction } from "./redux/slices/weatherSlices";
import './App.css'

//display icon https://openweathermap.org/img/wn/${icon}.png
function App() {
  
  const kToCelsius = (kelvin)=>{
    return Number(kelvin) - 273.15
  }

  const [city, setCity] = useState('Jujuy, AR');
  
  //dspatch acton
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchWeatherAction('Jujuy, AR'));
  }, []);

  // Select state ffreom store
  const state = useSelector(state => state);
  const { weather, loading, error } = state;
  console.log(state);

  console.log(state);
  return (
    <div >
      <section className="background">
       

        <div className="relative container pt-12 px-4 mb-20 mx-auto text-center">
          <h2 className="title-stardew mt-8 mb-2 lg:mb-12 text-white text-4xl lg:text-6xl font-semibold">
            Weather App
          </h2>
          <p className="pixelFont mb-8 text-black-500 font-semibold">
            Built with react and redux
          </p>
          <section className="pixelFont box">

            <p className="pixelFont max-w-3xl mx-auto mb-8 lg:mb-12 text-black text-xl">
              Find out the current weather situation around the world
            </p>
            {/* Input */}
            <input 
              /* onClick={()=>dispatch(fetchWeatherAction(city))} */
              onChange={e=>setCity(e.target.value)}
              value={city}
              placeholder="Search City wather"
              className="relative z-10 inline-block w-full md:w-auto mb-2  px-3 py-2 mr-4  font-medium leading-normal bg-transparent border-2 rounded-md border-black text-black-400 "
            ></input>
            {/* Button */}
            <button
              onClick={()=>dispatch(fetchWeatherAction(city))}
              type="submit"
              className="  btn inline-flex "
            >
              Search
            </button>
          </section>
        </div>



        {/* Content goes here */}
          <div className="box-card max-w-6xl px-4 mx-auto ">

            {loading? (
              <h1 className="pixelFont text-4xl text-center">Loading...</h1>
            ): error || weather == undefined? (
              <h1 className="pixelFont text-2xl text-center">Where is this place right? {error?.message}</h1>
            ):(
              <div className="flex flex-wrap -mx-4 justify-center">
                <div className="w-full  px-4">
                  <div className="flex justify-start  items-center">
                    <span className="flex items-center justify-center w-16 h-16 icon-border">
                      {/* weather logo */}
                      <img
                          className="w-56 "
                          src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                          alt="/"
                        />
                    </span>
                    <h1 className="pixelFont text-black-300 pl-5">
                      {weather?.weather[0].main}
                    </h1>{" "}
                  </div>
                  <h1 className="pixelFont text-black-300 text-center text-4xl mb-10 ">
                    {Math.ceil(kToCelsius(weather?.main.temp))}{" "}
                    <span className="text-black-500 text-4xl">°C</span>
                  </h1>
                  <h3 className="pixelFont mb-6 text-xl text-black font-semibold">
                    {weather?.name}, {weather?.sys?.country}
                  </h3>
                  <p className=" pixelFont mb-8 text-black-300">
                    The weather condition in {weather?.name},{" "}
                      {weather?.sys?.country} is described as :{" "}
                      {weather?.weather[0].description} with a temperature of{" "}
                      {Math.ceil(kToCelsius(weather?.main.temp)) } °C and a humidity of{" "}
                      {weather?.main?.humidity} %
                  </p>
                  <a
                    className="ml-auto flex items-center justify-center w-20 h-20 rounded-full  hover:bg-blue-700 text-white"
                    href="#"
                  >
                    <span className="flex items-center justify-center w-16 h-16 icon-border">
                      {/* weather logo */}
                      <img
                          className="w-56 "
                          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                          alt="/"
                        />
                    </span>
                  </a>
                
              </div>
            </div>
          )}
        </div>


      </section>
      {/* Footer */}
      {/* <div className="text-center bg-red-900">
        <p className="mb-4  text-gray-300">
          Developed by
          <span className="p-2 text-yellow-300">
            <a href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw">
              i-Novotek
            </a>
          </span>
        </p>
        <a
          className="inline-flex text-blue-400 hover:text-blue-500 font-bold"
          href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
        >
          <span className="mb-10">Watch the tutorial</span>
          <svg
            className="ml-4 w-4 h-5"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7383 1.47342L18.7383 10.9304L17.5562 10.9304L17.5562 2.89788L0.834948 19.625L0.00154682 18.7916L16.7228 2.06448L9.28125 2.06448L9.28125 0.882355L18.1472 0.882355C18.4737 0.882355 18.7383 1.14697 18.7383 1.47342Z"
              fill="#1F40FF"
            ></path>
          </svg>
        </a>
      </div> */}
    </div>
  );
}

export default App;

