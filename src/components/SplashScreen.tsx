import { motion } from 'motion/react';
import { BookOpen, Coins } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-500 via-yellow-400 to-blue-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating Letters Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
      >
        {['A', 'B', 'C', 'Z', 'X', 'S'].map((letter, i) => (
          <motion.div
            key={i}
            className="absolute text-white text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Coins */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`coin-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Coins className="w-8 h-8 text-yellow-300 opacity-20" />
        </motion.div>
      ))}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10"
      >
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <BookOpen className="w-20 h-20 text-green-600" />
        </div>
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-white mt-8 relative z-10"
      >
        Learn&Earn
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-white/90 mt-2 relative z-10"
      >
        Learn languages. Earn rewards.
      </motion.p>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
