import { useState, useCallback } from 'react';
import { WeatherData, ForecastData } from '../types/weather';
import { getWeatherByCity, getWeatherByCoords, getForecastByCity, getForecastByCoords } from '../services/weatherService';

interface UseWeatherState {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching weather data
 */
export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    weather: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const fetchWeatherByCity = useCallback(async (city: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city),
      ]);
      setState({
        weather: weatherData,
        forecast: forecastData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        weather: null,
        forecast: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch weather data.',
      });
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);
      setState({
        weather: weatherData,
        forecast: forecastData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        weather: null,
        forecast: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch weather data.',
      });
    }
  }, []);

  return {
    ...state,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  };
}

