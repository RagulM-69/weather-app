import { TemperatureUnit } from '../types/weather';

/**
 * Convert temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9/5 + 32);
};

/**
 * Convert temperature from Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round((fahrenheit - 32) * 5/9);
};

/**
 * Convert temperature based on unit preference
 * Input is in Celsius (from API with units=metric)
 */
export const convertTemperature = (celsius: number, unit: TemperatureUnit): number => {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : Math.round(celsius);
};

/**
 * Format temperature with unit symbol
 * Input is in Celsius (from API with units=metric)
 */
export const formatTemperature = (celsius: number, unit: TemperatureUnit): string => {
  const temp = convertTemperature(celsius, unit);
  return `${temp}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
};

