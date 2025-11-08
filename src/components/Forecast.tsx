import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ForecastData, ForecastItem, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';

interface ForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

export function Forecast({ forecast, unit }: ForecastProps) {
  // Group forecast by day and get one entry per day (around noon)
  const dailyForecasts: ForecastItem[] = [];
  const seenDays = new Set<string>();
  
  // First, try to get forecasts around noon (11-15)
  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000);
    const dayKey = format(date, 'yyyy-MM-dd');
    const hour = date.getHours();
    
    if (!seenDays.has(dayKey) && hour >= 11 && hour <= 15) {
      dailyForecasts.push(item);
      seenDays.add(dayKey);
      if (dailyForecasts.length >= 5) break;
    }
  }
  
  // Fill remaining days with first available forecast of each day
  for (const item of forecast.list) {
    if (dailyForecasts.length >= 5) break;
    const date = new Date(item.dt * 1000);
    const dayKey = format(date, 'yyyy-MM-dd');
    if (!seenDays.has(dayKey)) {
      dailyForecasts.push(item);
      seenDays.add(dayKey);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const condition = item.weather[0];
          const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

          return (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-white/10"
            >
              <div className="text-center">
                <div className="text-sm font-medium text-white/80 mb-2">
                  {index === 0 ? 'Today' : format(date, 'EEE')}
                </div>
                <div className="text-xs text-white/60 mb-3">
                  {format(date, 'MMM d')}
                </div>
                <img
                  src={iconUrl}
                  alt={condition.description}
                  className="w-16 h-16 mx-auto mb-3"
                />
                <div className="text-lg font-bold text-white mb-1">
                  {formatTemperature(item.main.temp, unit)}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                  <span>{formatTemperature(item.main.temp_max, unit)}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/50">{formatTemperature(item.main.temp_min, unit)}</span>
                </div>
                <div className="text-xs text-white/60 mt-2 capitalize">
                  {condition.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

