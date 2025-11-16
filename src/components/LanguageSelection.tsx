import { motion } from 'motion/react';
import { ChevronRight, LogOut } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { Screen } from '../App';
import { lessonsData } from '../data/lessons';

interface LanguageSelectionProps {
  onSelectLanguage: (language: string) => void;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  onLogout: () => void;
}

const languages = [
  {
    name: 'isiZulu',
    flag: '🇿🇦',
    icon: '🏔️',
    color: 'from-green-400 to-green-600',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Afrikaans',
    flag: '🇿🇦',
    icon: '🌻',
    color: 'from-yellow-400 to-yellow-600',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'Sesotho',
    flag: '🇿🇦',
    icon: '🎭',
    color: 'from-blue-400 to-blue-600',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'isiXhosa',
    flag: '🇿🇦',
    icon: '🎨',
    color: 'from-purple-400 to-purple-600',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
];

export function LanguageSelection({ onSelectLanguage, onNavigate, currentScreen, onLogout }: LanguageSelectionProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-900"
          >
            Choose a Language
          </motion.h1>
          <button
            onClick={onLogout}
            className="text-gray-700 hover:bg-gray-200 p-2 rounded-full flex items-center gap-2"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-1"
        >
          Select the language you want to learn
        </motion.p>
      </div>

      {/* Language Cards */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-4">
          {languages.map((language, index) => {
            const lessonCount = lessonsData[language.name]?.length || 0;
            
            return (
              <motion.button
                key={language.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectLanguage(language.name)}
                className={`w-full ${language.bgColor} rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform shadow-sm hover:shadow-md`}
              >
                {/* Icon & Flag */}
                <div className={`bg-gradient-to-br ${language.color} rounded-xl p-4 flex items-center justify-center relative`}>
                  <span className="text-3xl">{language.icon}</span>
                  <span className="absolute -top-1 -right-1 text-xl">{language.flag}</span>
                </div>

                {/* Language Info */}
                <div className="flex-1 text-left">
                  <h3 className={language.textColor}>{language.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {lessonCount} lessons available
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className={`w-6 h-6 ${language.textColor}`} />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
}