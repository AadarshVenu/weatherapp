import { forecastActions } from "./forecast-slice";

export const fetchForecastData = (place) => {
    return async (dispatch) => {
        const forecastData = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=7ce1c44895dcd040796d6ff228a3248d&units=metric`
            );
            if (response.ok) {
                const forecast = await response.json();
                // console.log(forecast);
                return forecast;
            }
        };
        const fivedayForecast = await forecastData();
        dispatch(
            forecastActions.displayForecast({
                forecastData: fivedayForecast,
            })
        );
    };
};
