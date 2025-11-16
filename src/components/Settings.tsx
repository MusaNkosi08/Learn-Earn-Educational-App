import { motion } from 'motion/react';
import { ChevronLeft, Volume2, Bell, HelpCircle, LogOut, Target, Info } from 'lucide-react';
import { Switch } from './ui/switch';
import { UserData } from '../App';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
  userData: UserData;
  onUpdateSettings: (settings: Partial<UserData>) => void;
}

export function Settings({ onBack, onLogout, userData, onUpdateSettings }: SettingsProps) {
  const handleSoundToggle = (enabled: boolean) => {
    onUpdateSettings({ soundEnabled: enabled });
  };

  const handleDailyGoalChange = (goal: number) => {
    onUpdateSettings({ dailyGoal: goal });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 pb-8 rounded-b-3xl">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/20 p-2 rounded-full -ml-2 mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white"
        >
          Settings
        </motion.h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-12 -mt-2">
        {/* Preferences Section */}
        <div className="mb-6">
          <h3 className="text-gray-600 mb-3 text-sm uppercase tracking-wide">
            Preferences
          </h3>

          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
            {/* Sound */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Sound Effects</p>
                <p className="text-gray-600 text-sm">Haptic feedback</p>
              </div>
              <Switch
                checked={userData.soundEnabled}
                onCheckedChange={handleSoundToggle}
              />
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Notifications</p>
                <p className="text-gray-600 text-sm">Daily reminders</p>
              </div>
              <Switch
                checked={true}
                onCheckedChange={() => {}}
              />
            </motion.div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="mb-6">
          <h3 className="text-gray-600 mb-3 text-sm uppercase tracking-wide">
            Learning Goals
          </h3>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Daily Goal</p>
                  <p className="text-gray-600 text-sm">Lessons per day</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleDailyGoalChange(goal)}
                    className={`py-3 rounded-xl transition-all ${
                      userData.dailyGoal === goal
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h3 className="text-gray-600 mb-3 text-sm uppercase tracking-wide">
            About
          </h3>

          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 mb-2">About Learn&Earn</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn South African languages and earn crypto tokens. Powered by MiniPay and Celo blockchain for secure, instant rewards.
                </p>
              </div>
            </motion.div>

            {/* Help Center */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Help Center</p>
                <p className="text-gray-600 text-sm">FAQs and support</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-gray-600 mb-3 text-sm uppercase tracking-wide">
            Account
          </h3>

          <div className="bg-white rounded-2xl shadow-sm">
            {/* Logout */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              onClick={onLogout}
              className="w-full p-4 flex items-center gap-4 hover:bg-red-50 rounded-2xl transition-colors"
            >
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-red-600">Log Out</p>
                <p className="text-gray-600 text-sm">Sign out of your account</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>Learn&Earn v1.0.0</p>
          <p className="mt-1">Made with ❤️ in South Africa 🇿🇦</p>
          <p className="mt-2 text-xs">Powered by Celo & MiniPay</p>
        </motion.div>
      </div>
    </div>
  );
}