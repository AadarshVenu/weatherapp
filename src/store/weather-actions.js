import { weatherActions } from "./weather-slice";

export const fetchWeatherData = (place) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=7ce1c44895dcd040796d6ff228a3248d&units=metric`
            );
            if (!response.ok) {
                alert("City not found");
                return;
            } else {
                const data = await response.json();
                // console.log(data);
                return data;
            }
        };
        const weatherData = await fetchData();
        dispatch(
            weatherActions.displayWeather({
                weatherData: weatherData,
            })
        );
    };
};
