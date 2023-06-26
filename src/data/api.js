import {useRef, useState} from "react";
import {current as getCurrentUrl, search as getSearchUrl} from "./remote/urls";
import {weatherTypes} from "./remote/images";

export const useFetchData = () => {
   const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const successCallback = async (position) => {
    const url = getCurrentUrl(position.coords.latitude, position.coords.longitude);
    await fetchWeather(url);
  };

  const errorCallback = async (error) => {
    const url = getSearchUrl(inputRef.current.value);
    await fetchWeather(url);
  };

  const searchWeather = async () => {
    setLoading(true);
    if (inputRef.current.value.trim() === '') {
      await navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      const url = getSearchUrl(inputRef.current.value);
      await fetchWeather(url);
    }
  };

  const fetchWeather = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '404' || data.cod === '400') {
        setApiData({
          type: "Not Found",
          description: 'لا توجد بيانات',
          img: weatherTypes.notFound,
        });
      } else {
        setApiData({
          description: data?.weather[0]?.description,
          temp: data?.main?.temp,
          type: data.weather[0].type,
          name: data?.name,
          country: data?.sys?.country,
          img: weatherTypes[data.weather[0].main],
        });
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setApiData({
          type: "لا يوجد اتصال بالشبكة",
          description: 'لا يوجد اتصال بالشبكة',
          img: weatherTypes.noWifi,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return [apiData, loading, inputRef, searchWeather]
}
