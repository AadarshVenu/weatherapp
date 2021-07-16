import { fetchWeatherData } from "../store/weather-actions";
import { fetchForecastData } from "../store/forecast-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import "./Weather.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Weather = () => {
    const classes = makeStyles();
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };
    const [place, setPlace] = useState("");
    const [cityEntered, setCityEntered] = useState(false);
    const weatherData = useSelector((state) => state.weather.weatherData);
    const forecastData = useSelector((state) => state.forecast.forecastData);

    const dispatch = useDispatch();

    const placeChangeHandler = (e) => {
        setPlace(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (place.trim() === "") {
            setCityEntered(false);
            return;
        }
        dispatch(fetchWeatherData(place));
        dispatch(fetchForecastData(place));
    };
    useEffect(() => {
        setCityEntered(true);
    }, [place]);

    const nameInputClasses = cityEntered ? "place" : "blank-place";    

    return (
        <>
            <div>
                <form onSubmit={submitHandler} className="form">
                    <input
                        type="text"
                        value={place}
                        onChange={placeChangeHandler}
                        placeholder="Enter name of the City...."
                        className={nameInputClasses}
                    />
                    <button className="button">Get Weather</button>
                </form>
                <div className="empty">
                    {!cityEntered && (
                        <p className="error">City name must not be empty</p>
                    )}
                </div>
            </div>

            <div className="default">
                {!weatherData ? (
                    "Search your favourite city..." 
                ) : (
                    <div>
                        {" "}
                        {weatherData.name} , {weatherData.sys.country}
                    </div>
                )}
            </div>

            {weatherData && (
                <>
                    <div className="main">
                        <div className="main-temperature">
                            {parseInt(weatherData.main.temp)}
                            <span>&deg;C</span>
                        </div>
                        <div className="condition">
                            {weatherData.weather.map((item) => item.main)}
                        </div>
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                            alt="icon"
                        />
                    </div>
                    <div className="weather-data">
                        <div className="weather-conditions">
                            <div>
                                Feels-Like{" "}
                                <span className="values">
                                    {parseInt(weatherData.main.feels_like)}
                                </span>
                                <span className="values">&deg;C</span>
                            </div>
                            <div>
                                Max Temperature{" "}
                                <span className="values">
                                    {" "}
                                    {parseInt(weatherData.main.temp_max)}
                                </span>
                                <span className="values">&deg;C</span>
                            </div>
                            <div>
                                Min Temperature{" "}
                                <span className="values">
                                    {parseInt(weatherData.main.temp_min)}
                                </span>
                                <span className="values">&deg;C</span>
                            </div>
                            <div>
                                Humidity{" "}
                                <span className="values">
                                    {weatherData.main.humidity} %
                                </span>
                            </div>

                            <div>
                                Wind{" "}
                                <span className="values">
                                    {weatherData.wind.speed} mph
                                </span>
                            </div>
                            <div>
                                Pressure{" "}
                                <span className="values">
                                    {weatherData.main.pressure} hPa
                                </span>
                            </div>
                        </div>

                        {!forecastData ? (
                            <Backdrop className={classes.backdrop} open>
                                <CircularProgress color="inherit" />)
                            </Backdrop>
                        ) : (
                            <div className="forecast">
                                <Slider {...settings}>
                                    {forecastData &&
                                        forecastData.list.map((lists) => (
                                            <div
                                                className="each-forecast"
                                                key={lists.dt}
                                            >
                                                <div>{lists.dt_txt}</div>
                                                <div>
                                                    {" "}
                                                    {lists.main.temp}
                                                    <span>
                                                        &deg;C
                                                    </span>
                                                </div>
                                                <div>
                                                    {lists.main.temp_min}/
                                                    {lists.main.temp_max}
                                                    <span>
                                                        &deg;C
                                                    </span>
                                                </div>
                                                <div>
                                                    {" "}
                                                    {lists.main.pressure} hPa
                                                </div>
                                                <div>
                                                    {" "}
                                                    {lists.main.humidity}%
                                                </div>
                                                <div>
                                                    {lists.weather[0].main}
                                                </div>
                                                <div>
                                                    <img
                                                        src={`http://openweathermap.org/img/wn/${lists.weather[0].icon}.png`}
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </Slider>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Weather;
