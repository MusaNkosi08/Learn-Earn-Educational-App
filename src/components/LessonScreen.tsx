import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { RewardModal } from './RewardModal';
import { Lesson } from '../data/lessons';

interface LessonScreenProps {
  lesson: Lesson;
  language: string;
  onComplete: () => void;
  onReward: (amount: number) => void;
  onBack: () => void;
  onViewWallet: () => void;
  soundEnabled: boolean;
}

export function LessonScreen({ lesson, language, onComplete, onReward, onBack, onViewWallet, soundEnabled }: LessonScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const question = lesson.questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    const correct = index === question.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTotalEarned(prev => prev + question.reward);
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < lesson.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsFlipped(false);
      } else {
        // Show reward modal
        const finalReward = totalEarned + (correct ? question.reward : 0);
        onReward(finalReward);
        setShowRewardModal(true);
      }
    }, 2000);
  };

  const handleContinue = () => {
    setShowRewardModal(false);
    onComplete();
  };

  const handleViewWallet = () => {
    setShowRewardModal(false);
    onComplete();
    onViewWallet();
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-700 hover:bg-gray-200 p-2 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-green-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / lesson.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-gray-700">
          {currentQuestion + 1}/{lesson.questions.length}
        </span>
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm"
          >
            {/* Question Card */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="bg-white rounded-3xl p-8 shadow-xl min-h-[200px] flex items-center justify-center cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h2 className="text-gray-900 text-center">
                  {question.front}
                </h2>
              </div>
            </motion.div>

            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl transition-all ${
                    showFeedback
                      ? index === question.correct
                        ? 'bg-green-500 text-white'
                        : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-900'
                      : selectedAnswer === index
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  } ${
                    !showFeedback && 'hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && index === question.correct && (
                      <span className="text-xl">✓</span>
                    )}
                    {showFeedback && index === selectedAnswer && index !== question.correct && (
                      <span className="text-xl">✗</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-6 p-4 rounded-xl ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  <p className="text-center">
                    {isCorrect ? `🎉 Correct! +${question.reward.toFixed(4)} CELO` : '❌ Incorrect. Try again next time!'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <RewardModal
            amount={totalEarned}
            onContinue={handleContinue}
            onViewWallet={handleViewWallet}
          />
        )}
      </AnimatePresence>
    </div>
  );
}