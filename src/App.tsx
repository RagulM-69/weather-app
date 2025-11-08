import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiShare2 } from 'react-icons/fi';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TemperatureUnit } from './types/weather';
import { formatTemperature } from './utils/temperature';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { WeatherBackground } from './components/WeatherBackground';
import { LoadingSpinner } from './components/LoadingSpinner';
import { UnitToggle } from './components/UnitToggle';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>('temperatureUnit', 'celsius');
  const [lastCity, setLastCity] = useLocalStorage<string | null>('lastCity', null);
  const { weather, forecast, loading, error, fetchWeatherByCity, fetchWeatherByCoords } = useWeather();
  const { coordinates, error: geoError, loading: geoLoading, requestLocation } = useGeolocation();

  // Load last searched city on mount
  useEffect(() => {
    if (lastCity && !weather && !loading) {
      fetchWeatherByCity(lastCity);
    } else if (!lastCity && !weather && !loading && !coordinates) {
      // Try to get location on first load
      requestLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch weather when geolocation is available
  useEffect(() => {
    if (coordinates && !weather && !loading) {
      fetchWeatherByCoords(coordinates.lat, coordinates.lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const handleSearch = (city: string) => {
    setLastCity(city);
    fetchWeatherByCity(city);
  };

  const handleLocationClick = () => {
    requestLocation();
  };

  const handleShare = async () => {
    if (!weather) return;

    const tempText = formatTemperature(weather.main.temp, unit);
    const text = `Current weather in ${weather.name}, ${weather.sys.country}: ${weather.weather[0].description}, ${tempText}. Check it out!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Weather in ${weather.name}`,
          text: text,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        alert('Weather summary copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground weather={weather} />

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span>🌤️</span>
            <span>Weather App</span>
          </motion.h1>

          <div className="flex items-center gap-3">
            {weather && (
              <motion.button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Share weather"
              >
                <FiShare2 />
              </motion.button>
            )}
            <UnitToggle unit={unit} onToggle={() => setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius')} />
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Toggle theme"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 p-4 md:p-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <SearchBar
              onSearch={handleSearch}
              onLocationClick={handleLocationClick}
              loading={loading}
              locationLoading={geoLoading}
              error={error || geoError || undefined}
            />
          </motion.div>

          {/* Weather Display */}
          {loading && <LoadingSpinner />}

          {!loading && weather && (
            <>
              <WeatherCard weather={weather} unit={unit} />
              {forecast && <Forecast forecast={forecast} unit={unit} />}
            </>
          )}

          {!loading && !weather && !error && !geoError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/80 mt-20"
            >
              <p className="text-xl mb-4">Search for a city or use your location to get started</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

