import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { UserData } from '../App';

interface LoginProps {
  onLogin: (username: string, pin: string, isReturningUser: boolean, existingData?: UserData) => void;
  loadUsers: () => { [username: string]: UserData };
}

export function Login({ onLogin, loadUsers }: LoginProps) {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [existingUserData, setExistingUserData] = useState<UserData | null>(null);

  // Check if username exists when user types
  useEffect(() => {
    if (username.trim().length >= 2) {
      const users = loadUsers();
      const userData = users[username.trim()];
      if (userData) {
        setIsReturningUser(true);
        setExistingUserData(userData);
        setError('');
      } else {
        setIsReturningUser(false);
        setExistingUserData(null);
        setError('');
      }
    } else {
      setIsReturningUser(false);
      setExistingUserData(null);
      setError('');
    }
  }, [username, loadUsers]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 5) {
      setPin(value);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    if (pin.length !== 5) {
      setError('PIN must be exactly 5 digits');
      return;
    }

    // Check if returning user
    if (isReturningUser && existingUserData) {
      // Validate PIN
      if (existingUserData.password !== pin) {
        setError('Incorrect PIN. Please try again.');
        return;
      }
      // PIN correct - log in
      setIsLoading(true);
      setTimeout(() => {
        onLogin(username.trim(), pin, true, existingUserData);
      }, 500);
    } else {
      // New user - create account
      setIsLoading(true);
      setTimeout(() => {
        onLogin(username.trim(), pin, false);
      }, 500);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-white mb-2">Learn&Earn</h1>
          <p className="text-white/80">Master South African Languages</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-gray-900 mb-2 text-center">
            {isReturningUser ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {isReturningUser 
              ? `Hi ${username}! Enter your PIN to continue`
              : 'Enter your details to get started'
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Your Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Thembi"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-gray-900"
                required
                minLength={2}
                disabled={isLoading}
              />
              {isReturningUser && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-xs mt-2 flex items-center gap-1"
                >
                  <span>✓</span> Account found
                </motion.p>
              )}
            </div>

            {/* PIN Field */}
            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                {isReturningUser ? 'Enter Your PIN' : 'Create 5-Digit PIN'}
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pin}
                onChange={handlePinChange}
                placeholder="•••••"
                maxLength={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-gray-900 text-center text-2xl tracking-[0.5em] font-mono"
                required
                disabled={isLoading}
              />
              <p className="text-gray-500 text-xs mt-2 text-center">
                {pin.length}/5 digits
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!username.trim() || pin.length !== 5 || isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full py-3 disabled:opacity-50"
            >
              {isLoading 
                ? 'Loading...' 
                : isReturningUser 
                  ? 'Log In' 
                  : 'Create Account'
              }
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-xs text-center">
              {isReturningUser 
                ? '🔐 Your data is securely stored on this device'
                : '🔒 Your PIN keeps your progress safe'
              }
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-white/70 text-sm"
        >
          <p>🇿🇦 Powered by MiniPay & Celo Blockchain</p>
        </motion.div>
      </motion.div>
    </div>
  );
}