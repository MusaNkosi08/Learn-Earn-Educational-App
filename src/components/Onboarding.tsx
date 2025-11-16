import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Coins, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: BookOpen,
    title: 'Learn isiZulu, Afrikaans, and more',
    description: 'Master South African languages with fun, bite-sized lessons designed for everyone.',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: Trophy,
    title: 'Complete lessons and quizzes',
    description: 'Test your knowledge with interactive quizzes and track your progress.',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: Coins,
    title: 'Earn CELO tokens with MiniPay',
    description: 'Get rewarded with real crypto tokens for every lesson you complete.',
    color: 'from-blue-400 to-blue-600',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Skip Button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700"
        >
          Skip
        </button>
      </div>

      {/* Slides Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`bg-gradient-to-br ${slides[currentSlide].color} rounded-full p-8 mb-8`}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-16 h-16 text-white" />;
              })()}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-900 mb-4 max-w-xs"
            >
              {slides[currentSlide].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 max-w-sm"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-green-600'
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Next/Get Started Button */}
      <div className="px-8 pb-12">
        <Button
          onClick={handleNext}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6 flex items-center justify-center gap-2"
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
