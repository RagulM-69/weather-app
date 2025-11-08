import { WeatherType } from '../types/weather';

/**
 * Map OpenWeatherMap condition codes to weather types
 */
export const getWeatherType = (conditionId: number): WeatherType => {
  if (conditionId >= 200 && conditionId < 300) return 'thunderstorm';
  if (conditionId >= 300 && conditionId < 400) return 'drizzle';
  if (conditionId >= 500 && conditionId < 600) return 'rain';
  if (conditionId >= 600 && conditionId < 700) return 'snow';
  if (conditionId >= 700 && conditionId < 800) {
    if (conditionId === 701) return 'mist';
    if (conditionId === 711) return 'fog';
    if (conditionId === 721) return 'haze';
    if (conditionId === 731 || conditionId === 761) return 'dust';
    if (conditionId === 751) return 'sand';
    if (conditionId === 762) return 'ash';
    if (conditionId === 771) return 'squall';
    if (conditionId === 781) return 'tornado';
    return 'fog';
  }
  if (conditionId === 800) return 'clear';
  if (conditionId >= 801 && conditionId <= 804) return 'clouds';
  return 'clear';
};

/**
 * Get background gradient colors based on weather type
 */
export const getWeatherGradient = (weatherType: WeatherType, isDark: boolean = false): string => {
  const gradients: Record<WeatherType, { light: string; dark: string }> = {
    clear: {
      light: 'from-blue-400 via-blue-500 to-blue-600',
      dark: 'from-blue-900 via-blue-800 to-blue-700',
    },
    clouds: {
      light: 'from-gray-400 via-gray-500 to-gray-600',
      dark: 'from-gray-800 via-gray-700 to-gray-900',
    },
    rain: {
      light: 'from-blue-500 via-blue-600 to-indigo-700',
      dark: 'from-blue-900 via-indigo-900 to-purple-900',
    },
    drizzle: {
      light: 'from-blue-400 via-blue-500 to-blue-600',
      dark: 'from-blue-800 via-blue-900 to-indigo-900',
    },
    thunderstorm: {
      light: 'from-purple-600 via-indigo-700 to-gray-800',
      dark: 'from-purple-900 via-indigo-900 to-gray-950',
    },
    snow: {
      light: 'from-blue-200 via-blue-300 to-blue-400',
      dark: 'from-blue-800 via-indigo-800 to-purple-800',
    },
    mist: {
      light: 'from-gray-300 via-gray-400 to-gray-500',
      dark: 'from-gray-700 via-gray-800 to-gray-900',
    },
    fog: {
      light: 'from-gray-300 via-gray-400 to-gray-500',
      dark: 'from-gray-700 via-gray-800 to-gray-900',
    },
    haze: {
      light: 'from-yellow-200 via-yellow-300 to-orange-300',
      dark: 'from-yellow-900 via-orange-900 to-red-900',
    },
    dust: {
      light: 'from-yellow-300 via-orange-300 to-orange-400',
      dark: 'from-yellow-800 via-orange-800 to-red-800',
    },
    sand: {
      light: 'from-yellow-300 via-orange-300 to-orange-400',
      dark: 'from-yellow-800 via-orange-800 to-red-800',
    },
    ash: {
      light: 'from-gray-400 via-gray-500 to-gray-600',
      dark: 'from-gray-700 via-gray-800 to-gray-900',
    },
    squall: {
      light: 'from-blue-500 via-indigo-600 to-purple-700',
      dark: 'from-blue-900 via-indigo-900 to-purple-900',
    },
    tornado: {
      light: 'from-gray-500 via-gray-600 to-gray-700',
      dark: 'from-gray-800 via-gray-900 to-black',
    },
  };

  const gradient = gradients[weatherType] || gradients.clear;
  return isDark ? gradient.dark : gradient.light;
};

