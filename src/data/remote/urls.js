
const apiKey = '60989022778c254dd43568777b92b238';

const baseUrl = 'https://api.openweathermap.org/';
const apiUrl = `${baseUrl}data/2.5/weather`;

const search = (q) => `${apiUrl}?q=${q.trim()}&units=metric&lang=ar&appid=${apiKey}`;
const current = (lat, lon) => `${apiUrl}?lat=${lat}&lon=${lon}&lang=ar&appid=${apiKey}`;



export { search, current};
