import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { FiDroplet, FiWind, FiGauge, FiThermometer } from 'react-icons/fi';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';

interface WeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export function WeatherCard({ weather, unit }: WeatherCardProps) {
  const condition = weather.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
  const lastUpdated = formatDistanceToNow(new Date(weather.dt * 1000), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-white/10"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        >
          {weather.name}, {weather.sys.country}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-sm"
        >
          Updated {lastUpdated}
        </motion.p>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <motion.img
            src={iconUrl}
            alt={condition.description}
            className="w-24 h-24 md:w-32 md:h-32"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          />
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl font-bold text-white"
            >
              {formatTemperature(weather.main.temp, unit)}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/90 capitalize mt-2"
            >
              {condition.description}
            </motion.p>
          </div>
        </div>

        {/* Feels Like */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center md:text-right"
        >
          <div className="flex items-center gap-2 text-white/80 mb-1">
            <FiThermometer />
            <span className="text-sm">Feels like</span>
          </div>
          <div className="text-2xl font-semibold text-white">
            {formatTemperature(weather.main.feels_like, unit)}
          </div>
        </motion.div>
      </div>

      {/* Weather Details Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <FiDroplet />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.main.humidity}%</div>
        </div>

        <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <FiWind />
            <span className="text-sm font-medium">Wind Speed</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {weather.wind.speed} <span className="text-lg">m/s</span>
          </div>
        </div>

        <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <FiGauge />
            <span className="text-sm font-medium">Pressure</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {weather.main.pressure} <span className="text-lg">hPa</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

