# 🌤️ Interactive Weather App

A modern, beautiful, and highly interactive weather web application built with React, Tailwind CSS, and OpenWeatherMap API.

## ✨ Features

- 🔍 **Search by City**: Search for weather in any city worldwide
- 📍 **Geolocation**: Automatically detect and display weather for your current location
- 🌡️ **Temperature Units**: Toggle between Celsius and Fahrenheit
- 🌓 **Dark/Light Mode**: Beautiful theme switching with smooth transitions
- 🎨 **Dynamic Backgrounds**: Background colors and gradients change based on weather conditions
- 📊 **5-Day Forecast**: View extended weather forecasts with animated cards
- 💾 **LocalStorage**: Saves your preferences and last searched city
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- 🎭 **Smooth Animations**: Powered by Framer Motion for delightful interactions
- 🔗 **Share Weather**: Share current weather conditions with others
- 📲 **PWA Ready**: Install as an app on your device

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

This app can be deployed to:

- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop the `dist` folder or connect your repo
- **GitHub Pages**: Use the `dist` folder contents

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Icons** - Icon library
- **date-fns** - Date formatting
- **OpenWeatherMap API** - Weather data

## 📁 Project Structure

```
src/
  components/       # React components
  contexts/         # React contexts (Theme)
  hooks/            # Custom React hooks
  services/         # API services
  types/            # TypeScript types
  utils/            # Utility functions
  App.tsx           # Main app component
  main.tsx          # Entry point
  index.css         # Global styles
```

## 🎨 Features in Detail

### Dynamic Backgrounds
The app automatically changes background gradients based on weather conditions:
- Clear skies → Blue gradients
- Rain → Dark blue/indigo gradients
- Snow → Light blue gradients
- Clouds → Gray gradients
- And more...

### Weather Conditions
Supports all major weather conditions with appropriate visual feedback:
- Clear, Clouds, Rain, Drizzle, Thunderstorm
- Snow, Mist, Fog, Haze, Dust, Sand
- And more...

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Smooth transitions

## 🔧 Configuration

### API Key Setup
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to `.env` as `VITE_OPENWEATHER_API_KEY`

### PWA Icons (Optional)
To enable full PWA functionality, add icon files to the `public` directory:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can generate these using tools like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator).

### Customization
- Modify colors in `tailwind.config.js`
- Adjust animations in component files
- Update weather condition mappings in `src/utils/weatherConditions.ts`

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

## 🐛 Troubleshooting

### API Key Issues
- Make sure your API key is correctly set in `.env`
- Ensure the key is active and has available requests
- Check browser console for specific error messages

### Geolocation Not Working
- Ensure you've granted location permissions
- Check that your browser supports geolocation
- Try using the search function instead

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v16+)
- Verify all environment variables are set

---

Made with ❤️ using React and Tailwind CSS

