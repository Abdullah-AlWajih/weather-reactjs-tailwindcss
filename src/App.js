import React, {useRef, useState} from 'react';
import * as urls from "./data/remote/urls";
import * as images from "./data/remote/images";
import Input from "./components/Input";

function App() {

    const [apiData, setApiData] = useState(null);
    // const [showWeather, setShowWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);

    const successCallback = async (position) => {
        const url = urls.current(position.coords.latitude, position.coords.longitude);
        await fetchWeather(url);
    };

    const errorCallback = async (error) => {
        const url = urls.search(inputRef.current.value);
        await fetchWeather(url);
    };

    const searchWeather = async () => {
        setLoading(true);
        if (inputRef.current.value.trim() === '') {
            await navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            const url = urls.search(inputRef.current.value);
            await fetchWeather(url);
        }
    }

    const fetchWeather = async (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === '404' || data.cod === '400') {
                    setApiData(
                        {
                            type: "Not Found",
                            description: 'لا توجد بيانات',
                            img: images.weatherTypes.notFound,
                        }
                    )
                    console.log(apiData);
                } else {
                    setApiData(
                        {
                            description: data?.weather[0]?.description,
                            temp: data?.main?.temp,
                            type: data.weather[0].type,
                            name: data?.name,
                            country: data?.sys?.country,
                            img: images.weatherTypes[data.weather[0].main],
                        }
                    )
                }

                // setApiData(data);
            })
            .catch((error) => {
                    // setApiData(null);

                    if (error.message === 'Failed to fetch') {
                        setApiData(
                            {
                                type: "لا يوجد اتصال بالشبكة",
                                description: 'لا يوجد اتصال بالشبكة',
                                img: images.weatherTypes.noWifi,
                            }
                        )

                    }
                }
            ).finally(() => setLoading(false));
    };


    return (
        <div className='bg-secondary min-h-screen justify-center flex items-center   px-8'>
            <div className='bg-white drop-shadow-xl dark:bg-slate-800  w-96 p-4 rounded-md'>
                <Input searchWeather={searchWeather} inputRef={inputRef}/>
                <div className={`duration-300 delay-75 overflow-hidden ${apiData || loading ? 'h-[27rem]' : 'h-0'} `}>
                    {
                        loading ? <div className='grid place-items-center h-full'><img
                            src={images.weatherTypes.loading} alt=""
                            className='w-14 mx-auto mb-2 animate-spin'
                        />
                        </div> : (
                            apiData && (<div className='text-center flex flex-col gap-6 mt-10'>
                                {
                                    apiData?.name && (
                                        <p className='text-xl text-gray-900 font-semibold'>{apiData?.name + ', ' + apiData?.country} </p>)
                                }
                                <img src={apiData?.img} alt="" className='w-52 mx-auto'/>
                                <h3 className='text-2xl text-gray-900  font-bold'>
                                    {apiData?.description}
                                </h3>
                                {
                                    apiData?.temp && (<div className='flex justify-center'>
                                        <h2 className='text-4xl text-gray-900 font-extrabold'>{apiData?.temp}&#176;C</h2>
                                        <img src={images.weatherTypes.temp} alt=""
                                             className='h-9 mt-1'/>
                                    </div>)
                                }
                            </div>)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default App;
