import { motion } from 'motion/react';
import { Trophy, LogOut } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { Screen, UserData } from '../App';

interface LeaderboardProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  onLogout: () => void;
}

export function Leaderboard({ userData, onNavigate, currentScreen, onLogout }: LeaderboardProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-white" />
            <h1 className="text-white">Leaderboard</h1>
          </div>
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
          <p className="text-yellow-100">
            Track Your Progress
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 -mt-4">
        {userData.xp > 0 ? (
          <div className="space-y-4">
            {/* User Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">
                  {userData.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-white mb-2">{userData.username}</h2>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <p className="text-yellow-100 text-sm mb-1">Total XP</p>
                  <p className="text-white text-3xl">{userData.xp}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-yellow-100 text-xs mb-1">Lessons</p>
                    <p className="text-white text-xl">{userData.lessonsCompleted}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-yellow-100 text-xs mb-1">Streak</p>
                    <p className="text-white text-xl">🔥 {userData.streak}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-gray-900 mb-4">Your Achievements</h3>
              <div className="space-y-3">
                {userData.lessonsCompleted >= 1 && (
                  <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">🎓</span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm">First Lesson</p>
                      <p className="text-gray-600 text-xs">Completed your first lesson</p>
                    </div>
                  </div>
                )}
                {userData.lessonsCompleted >= 5 && (
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white">⭐</span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm">Fast Learner</p>
                      <p className="text-gray-600 text-xs">Completed 5 lessons</p>
                    </div>
                  </div>
                )}
                {userData.streak >= 3 && (
                  <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white">🔥</span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm">On Fire</p>
                      <p className="text-gray-600 text-xs">{userData.streak} day streak</p>
                    </div>
                  </div>
                )}
                {userData.totalRewards >= 1 && (
                  <div className="flex items-center gap-3 bg-yellow-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white">💰</span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm">Crypto Earner</p>
                      <p className="text-gray-600 text-xs">Earned {userData.totalRewards.toFixed(2)} CELO</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Next Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-gray-900 mb-4">Next Goals</h3>
              <div className="space-y-3">
                {userData.lessonsCompleted < 10 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span>🎯</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Complete 10 lessons</p>
                      <div className="bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(userData.lessonsCompleted / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {userData.streak < 7 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span>🔥</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Build a 7-day streak</p>
                      <div className="bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(userData.streak / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Start Your Learning Journey</p>
            <p className="text-gray-500 text-sm">
              Complete lessons to track your progress and earn achievements!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
}