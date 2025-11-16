import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Edit, Trophy, Flame, BookOpen, Coins, LogOut, X } from 'lucide-react';
import { Button } from './ui/button';
import { BottomNav } from './BottomNav';
import { Screen, UserData } from '../App';

interface ProfileProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  onLogout: () => void;
  onUpdateProfile: (username: string, avatar: string) => void;
}

export function Profile({ userData, onNavigate, currentScreen, onLogout, onUpdateProfile }: ProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState(userData.username);
  const [editAvatar, setEditAvatar] = useState(userData.avatar);

  const avatarOptions = ['👤', '😊', '🎓', '🌟', '💪', '🚀', '🎯', '🔥', '💡', '🏆'];

  const handleSaveProfile = () => {
    if (editUsername.trim()) {
      onUpdateProfile(editUsername.trim(), editAvatar);
      setShowEditModal(false);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 pb-8 rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            Profile
          </motion.h1>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('settings')}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={onLogout}
              className="text-white hover:bg-white/20 p-2 rounded-full"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
        >
          {/* Avatar */}
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
            {userData.avatar}
          </div>

          {/* Username */}
          <h2 className="text-white mb-2">{userData.username}</h2>

          {/* XP Bar */}
          <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
              style={{ width: `${(userData.xp % 1000) / 10}%` }}
            />
          </div>
          <p className="text-purple-100 text-sm">
            Level {Math.floor(userData.xp / 1000)} • {userData.xp} XP
          </p>

          {/* Edit Button */}
          <Button
            onClick={() => setShowEditModal(true)}
            className="mt-4 bg-white/20 hover:bg-white/30 text-white rounded-full py-2 px-6 flex items-center gap-2 mx-auto backdrop-blur-sm"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 -mt-2">
        <h3 className="text-gray-900 mb-4">Statistics</h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-5"
          >
            <Flame className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-orange-900 text-3xl mb-1">{userData.streak}</p>
            <p className="text-orange-700 text-sm">Day Streak</p>
          </motion.div>

          {/* Lessons Completed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-5"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-blue-900 text-3xl mb-1">{userData.lessonsCompleted}</p>
            <p className="text-blue-700 text-sm">Lessons Done</p>
          </motion.div>

          {/* Total Rewards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-5"
          >
            <Coins className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-yellow-900 text-3xl mb-1">{userData.totalRewards.toFixed(1)}</p>
            <p className="text-yellow-700 text-sm">CELO Earned</p>
          </motion.div>

          {/* XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-5"
          >
            <Trophy className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-purple-900 text-3xl mb-1">{userData.xp}</p>
            <p className="text-purple-700 text-sm">Total XP</p>
          </motion.div>
        </div>

        {/* Current Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <h3 className="text-gray-900 mb-3">Current Language</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-xl">
              🇿🇦
            </div>
            <div>
              <p className="text-gray-900">{userData.selectedLanguage}</p>
              <p className="text-gray-600 text-sm">
                {userData.completedLessons[userData.selectedLanguage]?.length || 0} lessons completed
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
          onClick={() => setShowEditModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-sm w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Avatar Selection */}
            <div className="mb-6">
              <label className="text-gray-700 text-sm mb-3 block">Choose Avatar</label>
              <div className="grid grid-cols-5 gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setEditAvatar(avatar)}
                    className={`w-full aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                      editAvatar === avatar
                        ? 'bg-purple-100 ring-2 ring-purple-500 scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {/* Username Input */}
            <div className="mb-6">
              <label className="text-gray-700 text-sm mb-2 block">Username</label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                minLength={2}
              />
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSaveProfile}
                disabled={!editUsername.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setShowEditModal(false)}
                variant="outline"
                className="w-full border-2 border-gray-300 hover:border-gray-400 rounded-full py-3"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}