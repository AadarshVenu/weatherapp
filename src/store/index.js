import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../store/weather-slice";
import forecastSlice from "./forecast-slice";

const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer,
        forecast: forecastSlice.reducer,
    },
});

export default store;
