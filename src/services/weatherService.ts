import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.warn('VITE_OPENWEATHER_API_KEY is not set. Please add it to your .env file.');
}

/**
 * Fetch current weather by city name
 */
export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
  }

  try {
    const response = await axios.get<WeatherData>(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // This will return temps in Celsius, but we'll use Kelvin for consistency
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      }
      if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

/**
 * Fetch current weather by coordinates
 */
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
  }

  try {
    const response = await axios.get<WeatherData>(`${API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      }
      if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

/**
 * Fetch 5-day weather forecast by city name
 */
export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
  }

  try {
    const response = await axios.get<ForecastData>(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      }
      if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
    throw new Error('Failed to fetch forecast data. Please try again.');
  }
};

/**
 * Fetch 5-day weather forecast by coordinates
 */
export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
  }

  try {
    const response = await axios.get<ForecastData>(`${API_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      }
      if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
    throw new Error('Failed to fetch forecast data. Please try again.');
  }
};

