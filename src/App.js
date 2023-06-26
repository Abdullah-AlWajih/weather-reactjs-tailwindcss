import React from 'react';
import {weatherTypes} from "./data/remote/images";
import Input from "./components/Input";
import {useFetchData} from "./data/api";

function App() {
    const [apiData, loading, inputRef, searchWeather] = useFetchData();

    return (
        <div
            className="bg-secondary bg-[url('./assets/weather.jpg')] min-h-screen justify-center flex items-center px-8">
            <div className='backdrop-blur-sm bg-white/10 drop-shadow-xl  w-96 p-4 rounded-md'>
                <Input searchWeather={searchWeather} inputRef={inputRef}/>
                <div
                    className={`duration-300 grid place-items-center delay-75 overflow-hidden ${apiData || loading ? 'h-[27rem]' : 'h-0'} `}>
                    {loading ? (
                        <img src={weatherTypes.loading} alt="" className='w-14 mx-auto mb-2 animate-spin'/>
                    ) : (
                        apiData && (
                            <div className='text-center flex flex-col gap-6 mt-10' key={apiData.name}>
                                {apiData.name && (
                                    <p className='text-xl text-gray-100 font-semibold'>
                                        {apiData.name + ', ' + apiData.country}
                                    </p>
                                )}
                                <img src={apiData.img} alt="" className='w-52 mx-auto'/>
                                <h3 className='text-2xl text-gray-100 font-bold'>{apiData.description}</h3>
                                {apiData.temp && (
                                    <div className='flex justify-center'>
                                        <h2 className='text-4xl text-gray-300 font-extrabold'>{apiData.temp}&#176;C</h2>
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
