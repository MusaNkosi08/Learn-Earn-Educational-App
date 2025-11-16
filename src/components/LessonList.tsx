import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, Play, LogOut, Target, TrendingUp } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { Screen, UserData } from '../App';
import { lessonsData, Lesson } from '../data/lessons';

interface LessonListProps {
  language: string;
  completedLessons: string[];
  onStartLesson: (lesson: Lesson) => void;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  onLogout: () => void;
  userData: UserData;
}

export function LessonList({ language, completedLessons, onStartLesson, onNavigate, currentScreen, onLogout, userData }: LessonListProps) {
  const lessons = lessonsData[language] || [];
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('language-selection')}
            className="text-white hover:bg-white/20 p-2 rounded-full -ml-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onLogout}
            className="text-white hover:bg-white/20 p-2 rounded-full flex items-center gap-2"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white">{language} Lessons</h1>
          <p className="text-green-100 mt-1">
            {completedCount} of {totalLessons} completed
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-8 mb-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <p className="text-gray-600 text-xs">Daily Goal</p>
            </div>
            <p className="text-gray-900 text-xl">{userData.dailyProgress}/{userData.dailyGoal}</p>
            <div className="bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-purple-500 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min((userData.dailyProgress / userData.dailyGoal) * 100, 100)}%` }}
              />
            </div>
          </motion.div>

          {/* Language Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-gray-600 text-xs">Progress</p>
            </div>
            <p className="text-gray-900 text-xl">{progressPercentage.toFixed(0)}%</p>
            <p className="text-gray-500 text-xs mt-1">{language}</p>
          </motion.div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <button
                  onClick={() => onStartLesson(lesson)}
                  className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`rounded-xl p-4 flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Play className="w-6 h-6 text-blue-600" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="text-gray-900">{lesson.title}</h3>
                        <span className="text-yellow-600 text-sm">
                          +{lesson.reward} CELO
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {lesson.description}
                      </p>

                      {isCompleted && (
                        <div className="mt-2 text-green-600 text-sm">
                          ✓ Completed
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
}