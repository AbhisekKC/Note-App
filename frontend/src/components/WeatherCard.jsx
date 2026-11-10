import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Sun,
  CloudRain,
  CloudLightning,
  Snowflake,
  Cloud,
  Thermometer,
  MapPin,
  Loader2,
  Search,
  Clock,
  Wind,
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [city, setCity] = useState('butwal');
  const [now, setNow] = useState(Date.now());

  const url = import.meta.env.VITE_WEATHER_URL;
  const api = import.meta.env.VITE_WEATHER_API_KEY;

  // Tick every second so the local city clock stays live
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchWeather = async (cit) => {
    if (!cit) return;
    try {
      setLoading(true);
      setError(false);

      const res = await axios.get(url, {
        params: {
          q: cit,
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
  }, [api]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city.trim());
  };

  // Helper to render dynamic vector icons based on the API response string
  const getWeatherIcon = (mainCondition) => {
    switch (mainCondition?.toLowerCase()) {
      case 'clear':
        return <Sun className="h-8 w-8 text-amber-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="h-8 w-8 text-sky-500 animate-pulse" />;
      case 'thunderstorm':
        return <CloudLightning className="h-8 w-8 text-purple-500" />;
      case 'snow':
        return <Snowflake className="h-8 w-8 text-blue-300" />;
      case 'clouds':
        return <Cloud className="h-8 w-8 text-slate-400" />;
      default:
        return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };

  // Format local city time & UTC offset from weather.timezone (in seconds)
  const formatCityTime = (timezoneOffsetSeconds = 0) => {
    const cityDate = new Date(now + timezoneOffsetSeconds * 1000);
    const timeString = cityDate.toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const sign = timezoneOffsetSeconds >= 0 ? '+' : '-';
    const absSeconds = Math.abs(timezoneOffsetSeconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const utcOffset =
      minutes > 0 ? `UTC${sign}${hours}:${String(minutes).padStart(2, '0')}` : `UTC${sign}${hours}`;

    return { timeString, utcOffset };
  };

  const cityTime = weather ? formatCityTime(weather.timezone) : null;

  return (
    <div className="flex flex-col gap-3 p-4 mb-4 bg-white shadow-md rounded-2xl border border-slate-100 max-w-sm w-full font-sans">
      {/* Card Title Section */}
      <div className="text-left">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Check weather of your city
        </h3>
        <p className="text-[11px] text-slate-400 font-medium">
          Enter a city name to fetch the local workspace forecast
        </p>
      </div>

      {/* City Search Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-end border-b border-slate-100 pb-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Enter your City
          </label>
          <Input
            type="text"
            placeholder="e.g. Butwal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 text-slate-700 bg-slate-50"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors shadow-sm disabled:opacity-50 h-9 flex items-center justify-center aspect-square"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {/* Weather Content States */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <div className="text-xs text-slate-500 font-medium animate-pulse tracking-wide py-2 text-center">
            Loading local workspace environment forecast...
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-xs font-medium text-rose-500 bg-rose-50/60 rounded-xl">
          ⚠️ City not found or network failure.
        </div>
      ) : weather ? (
        <div className="flex items-start gap-4 p-4 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="p-3 bg-white rounded-xl shadow-xs shrink-0">
            {getWeatherIcon(weather.weather?.[0]?.main)}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            {/* Location & Country */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold truncate">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {weather.name}, {weather.sys?.country}
                </span>
              </div>
            </div>

            {/* Temperature & Condition */}
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold tracking-tight text-slate-800">
                {Math.round(weather.main.temp)}°C
              </span>
              <span className="text-xs text-slate-500 capitalize font-medium">
                {weather.weather?.[0]?.description}
              </span>
            </div>

            {/* Feels Like */}
            <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
              <Thermometer className="h-3.5 w-3.5 text-green-600" />
              <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
            </div>

            {/* Wind Speed & Gust */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 text-xs">
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <Wind className="h-3.5 w-3.5 text-green-600" />
                Wind:
              </span>
              <span className="text-slate-700">{weather.wind?.speed} m/s</span>
              {weather.wind?.gust !== undefined && (
                <span className="text-slate-400 font-medium">
                  (Gust {weather.wind.gust} m/s)
                </span>
              )}
            </div>

            {/* Local Time & Timezone */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 text-xs">
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-green-600" />
                Local Time:
              </span>
              <span className="font-semibold text-slate-800">{cityTime?.timeString}</span>
              <span className="text-slate-400 font-medium">({cityTime?.utcOffset})</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherCard;
