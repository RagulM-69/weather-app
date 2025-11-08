import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherData } from '../types/weather';
import { getWeatherType, getWeatherGradient } from '../utils/weatherConditions';
import { useTheme } from '../contexts/ThemeContext';

interface WeatherBackgroundProps {
  weather: WeatherData | null;
}

export function WeatherBackground({ weather }: WeatherBackgroundProps) {
  const { theme } = useTheme();
  const [gradient, setGradient] = useState('from-blue-400 via-blue-500 to-blue-600');
  const isDark = theme === 'dark';

  useEffect(() => {
    if (weather) {
      const weatherType = getWeatherType(weather.weather[0].id);
      const newGradient = getWeatherGradient(weatherType, isDark);
      setGradient(newGradient);
    }
  }, [weather, isDark]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`fixed inset-0 bg-gradient-to-br ${gradient} -z-10`}
      >
        {/* Optional animated particles overlay */}
        {weather && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {getWeatherType(weather.weather[0].id) === 'rain' && (
              <div className="absolute inset-0 opacity-20">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-8 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10%',
                    }}
                    animate={{
                      y: ['0vh', '100vh'],
                    }}
                    transition={{
                      duration: Math.random() * 0.5 + 0.3,
                      repeat: Infinity,
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </div>
            )}
            {getWeatherType(weather.weather[0].id) === 'snow' && (
              <div className="absolute inset-0 opacity-30">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10%',
                    }}
                    animate={{
                      y: ['0vh', '100vh'],
                      x: [0, Math.random() * 50 - 25],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

