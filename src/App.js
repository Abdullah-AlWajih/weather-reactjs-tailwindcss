import React, {useRef, useState} from 'react';
import * as urls from "./data/remote/urls";

function App() {

    const [apiData, setApiData] = useState(null);
    const [showWeather, setShowWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);
    const fetchWeather = async () => {
        setLoading(true);
        const url = urls.search(inputRef.current.value);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setApiData(null);
                if (data.cod === '404' || data.cod === '400') {
                    setShowWeather(
                        [
                            {
                                type: "Not Found",
                                img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
                            }
                        ]
                    )
                }
                setShowWeather(
                    urls.weatherTypes.filter(
                        (weather) => weather.type === data.weather[0].main
                    )
                );
                console.log(data);
                setApiData(data);
            })
            .catch(
                (error => (error) => {
                    // setShowWeather(
                    //     [
                    //         {
                    //             type: "Not Found",
                    //             img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
                    //         }
                    //     ]
                    // )
                })
            ).finally(() => setLoading(false));
    };
    return (
        <div className='bg-gray-800 h-screen grid place-items-center'>
            <div className='bg-white w-96 p-4 rounded-md'>
                <div className='flex items-center justify-between'>
                    <input type="text"
                           ref={inputRef}
                           placeholder="Enter Your Location"
                           className='text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1'
                    />
                    <button onClick={fetchWeather}>
                        <img src="https://cdn-icons-png.flaticon.com/512/758/758651.png" alt="" className='w-8'/>
                    </button>
                </div>

                <div className={`duration-300 delay-75 overflow-hidden ${showWeather ? 'h-[27rem]' : 'h-0'} `}>
                    {
                        loading ? <div className='grid place-items-center h-full'><img
                            src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png" alt=""
                            className='w-14 mx-auto mb-2 animate-spin'
                        />

                        </div> : (
                            showWeather && (<div className='text-center flex flex-col gap-6 mt-10'>
                                {
                                    apiData && (
                                        <p className='text-xl font-semibold'>{apiData?.name + ', ' + apiData?.sys?.country} </p>)
                                }

                                <img src={showWeather[0]?.img} alt="" className='w-52 mx-auto'/>
                                <h3 className='text-2xl font-bold text-zinc-800'>
                                    {showWeather[0]?.type}
                                </h3>


                                {
                                    apiData && (<div className='flex justify-center'>
                                        <img src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png" alt=""
                                             className='h-9 mt-1'/>
                                        <h2 className='text-4xl font-extrabold'>{apiData?.main?.temp}&#176;C</h2>
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
