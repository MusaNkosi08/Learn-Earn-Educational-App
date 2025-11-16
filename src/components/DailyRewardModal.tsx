import { motion } from 'motion/react';
import { Gift, Flame, Coins } from 'lucide-react';
import { Button } from './ui/button';

interface DailyRewardModalProps {
  amount: number;
  streak: number;
  onClaim: () => void;
}

export function DailyRewardModal({ amount, streak, onClaim }: DailyRewardModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-8"
    >
      <motion.div
        initial={{ scale: 0.5, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 opacity-50" />
        
        {/* Floating Coins */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          >
            <Coins className="w-4 h-4 text-yellow-500" />
          </motion.div>
        ))}

        {/* Gift Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="relative z-10"
        >
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-full p-6 inline-block shadow-2xl mb-4">
            <Gift className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10"
        >
          <h2 className="text-gray-900 mb-2">Daily Reward! 🎁</h2>
          <p className="text-gray-600 mb-6">
            Welcome back! Here's your daily bonus
          </p>
        </motion.div>

        {/* Reward Amount */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 mb-4 relative z-10 shadow-xl"
        >
          <p className="text-white text-4xl mb-1">+{amount.toFixed(2)}</p>
          <p className="text-yellow-100">CELO</p>
        </motion.div>

        {/* Streak Bonus */}
        {streak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6 relative z-10"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-600" />
              <p className="text-orange-900">{streak} Day Streak!</p>
            </div>
            <p className="text-orange-700 text-sm">
              +{(streak * 0.01).toFixed(2)} CELO streak bonus included
            </p>
          </motion.div>
        )}

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-500 text-sm mb-6 relative z-10"
        >
          Come back daily to keep your streak going and earn bigger rewards!
        </motion.p>

        {/* Claim Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10"
        >
          <Button
            onClick={onClaim}
            className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 hover:from-yellow-600 hover:via-orange-600 hover:to-pink-600 text-white rounded-full py-6 text-lg shadow-xl"
          >
            Claim Reward 🎉
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
