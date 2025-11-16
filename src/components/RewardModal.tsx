import { motion } from 'motion/react';
import { Coins, Wallet, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface RewardModalProps {
  amount: number;
  onContinue: () => void;
  onViewWallet: () => void;
}

export function RewardModal({ amount, onContinue, onViewWallet }: RewardModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Confetti Effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: i * 0.1,
              ease: 'linear',
            }}
          />
        ))}

        {/* Coin Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative z-10"
        >
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-6 inline-block shadow-xl mb-6">
            <Coins className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-900 mb-2 relative z-10"
        >
          Congratulations! 🎉
        </motion.h2>

        {/* Amount */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 rounded-2xl p-4 mb-4 relative z-10"
        >
          <p className="text-green-900">
            +{amount.toFixed(2)} CELO
          </p>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-6 relative z-10"
        >
          Transaction successful. Reward added to your MiniPay wallet.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 relative z-10"
        >
          <Button
            onClick={onContinue}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6 flex items-center justify-center gap-2"
          >
            Continue Learning
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={onViewWallet}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:border-gray-400 rounded-full py-6 flex items-center justify-center gap-2"
          >
            <Wallet className="w-5 h-5" />
            View Wallet
          </Button>
        </motion.div>

        {/* MiniPay Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm relative z-10"
        >
          <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">C</span>
          </div>
          <span>MiniPay powered by Celo</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}