import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, CloudRain, CloudLightning, Snowflake, Cloud, Thermometer, MapPin, Loader2, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

function WeatherCard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [latt, setLatt] = useState('27.68');
    const [long, setLong] = useState('83.37');
    const [city , setCity] = useState('butwal')
    const url = import.meta.env.VITE_WEATHER_URL;
    const api = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async ( cit) => {
        if (!cit) return;
        try {
            setLoading(true);
            setError(false); // Reset error status on new attempts

            // FIX 1: Swapped to the correct data engine subdomain URL
            const res = await axios.get(url, {
                params: {
                    
                    q:cit,
                    appid: api,
                    units: 'metric',
                },
            });

            setWeather(res.data);


        } catch (err) {
            console.error('Weather data fetch encountered an error', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, [api]); // Added api dependency to avoid linting warnings

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather( city.trim());

    }

    // Helper to render dynamic vector icons based on the API response string
    const getWeatherIcon = (mainCondition) => {
        switch (mainCondition?.toLowerCase()) {
            case 'clear': return <Sun className='h-8 w-8 text-amber-500' />;
            case 'rain':
            case 'drizzle': return <CloudRain className='h-8 w-8 text-sky-500 animate-pulse' />;
            case 'thunderstorm': return <CloudLightning className='h-8 w-8 text-purple-500' />;
            case 'snow': return <Snowflake className='h-8 w-8 text-blue-300' />;
            case 'clouds': return <Cloud className='h-8 w-8 text-slate-400' />;
            default: return <Sun className='h-8 w-8 text-amber-500' />;
        }
    };



    // Complete presentation markup using your lucide icons
    return (
        <div className='flex flex-col gap-2 p-4 mb-4  bg-white shadow-md rounded-2xl border border-slate-100 max-w-sm w-full font-sans'>
            {/* 🚀 NEW CARD TITLE SECTION */}
            <div className="text-left">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                    Check weather of your city
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                    Enter coordinates to fetch the local workspace forecast
                </p>
            </div>

            {/*Manual co-ordinates entry form*/}
            <form onSubmit={handleSubmit} className='flex gap-2 items-end border-b border-slate-100 pb-3'>
                <div className='flex-1 flex gap-2 '>
                    <div className=' flex flex-col gap-1 w-full'>
                        <label className='flex justify-start text-l  font-bold text-slate-600 uppercase tracking-wider'>Enter your City.</label>
                        <Input
                            type='text'
                            placeholder='e.g: butwal'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 text-slate-700 bg-slate-50' />
                    </div>
                    {/*  these are for lattitude and longitude.
                     <div className='flex-1 flex flex-col gap-1'>
                        <label className='text-l  font-bold text-slate-600 uppercase tracking-wider'>Lattitude.</label>
                        <Input
                            type='text'
                            placeholder='e.g: 27.68'
                            value={latt}
                            onChange={(e) => setLatt(e.target.value)}
                            className='w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 text-slate-700 bg-slate-50' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label className='text-l  font-bold text-slate-600 uppercase tracking-wider'>Longitude.</label>
                        <Input
                            type='text'
                            placeholder='e.g: 83.37'
                            value={long}
                            onChange={(e) => setLong(e.target.value)}
                            className='w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 text-slate-700 bg-slate-50' />
                    </div>
                    
                    
                    */}
                    
                </div>
                <Button
                    type='submit'
                    disabled={loading}
                    className='bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors shadow-sm disabled:opacity-50 h-8.5 flex items-center justify-center aspect-square '
                >
                    {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Search className='h-4 w-4' />}
                </Button>
            </form>
            {
                loading ? (
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl">
                        <Loader2 className='h-8 w-8 animate-spin text-slate-600' />
                        <div className='text-xs text-slate-500 font-medium animate-pulse tracking-wide py-2'>
                            Loading local workspace environment forecast....
                        </div>
                    </div>)
                    : error ? (
                        <div className='text-center py-4 text-xs font-medium text-rose-500'>
                            ⚠️ Invalid coordinate or network failure.

                        </div>)
                        : weather ? (
                            <div className="flex items-center gap-4 p-6 bg-white shadow-md rounded-2xl border border-slate-100 max-w-sm">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    {getWeatherIcon(weather.weather[0].main)}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>{weather.name}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-2xl font-bold tracking-tight text-slate-800">
                                            {Math.round(weather.main.temp)}°C
                                        </span>
                                        <span className="text-xs text-slate-400 capitalize font-medium">
                                            {weather.weather[0].description}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                                        <Thermometer className="h-3 w-3" />
                                        <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
                                    </div>
                                </div>
                            </div>

                        )

                            : null
            }

        </div>

    );
}

export default WeatherCard;
