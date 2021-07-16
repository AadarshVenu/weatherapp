import { createSlice } from "@reduxjs/toolkit";

const forecastSlice = createSlice({
    name: "forecast",
    initialState: {
        forecastData: "",
    },
    reducers: {
        displayForecast(state, action) {
            state.forecastData = action.payload.forecastData;
        },
    },
});

export const forecastActions = forecastSlice.actions;

export default forecastSlice;
