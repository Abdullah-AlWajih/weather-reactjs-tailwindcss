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
            <div className='bg-white dark:bg-slate-800 w-96 p-4 rounded-md'>
                <div className="flex">
                    <input type="text" id="website-admin"
                           ref={inputRef}
                           onChange={fetchWeather}
                           className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-xl border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="ادخل موقعك"/>

                    <button onClick={fetchWeather}
                            className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
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
                                <h3 className='text-2xl font-bold'>
                                    {apiData?.weather[0]?.description ?? 'لا توجد بيانات'}
                                </h3>


                                {
                                    apiData && (<div className='flex justify-center'>

                                        <h2 className='text-4xl font-extrabold'>{apiData?.main?.temp}&#176;C</h2>
                                        <img src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png" alt=""
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
