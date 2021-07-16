import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        weatherData: "",
        
    },
    reducers: {
        displayWeather(state, action) {
            state.weatherData = action.payload.weatherData;
            
        },
    },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice;
