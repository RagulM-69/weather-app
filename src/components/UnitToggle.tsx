import { motion } from 'framer-motion';
import { TemperatureUnit } from '../types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`text-sm font-medium ${unit === 'celsius' ? 'text-white' : 'text-white/60'}`}>
        °C
      </span>
      <span className="text-white/40">|</span>
      <span className={`text-sm font-medium ${unit === 'fahrenheit' ? 'text-white' : 'text-white/60'}`}>
        °F
      </span>
    </motion.button>
  );
}

