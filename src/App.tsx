import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { LanguageSelection } from './components/LanguageSelection';
import { LessonList } from './components/LessonList';
import { LessonScreen } from './components/LessonScreen';
import { Wallet } from './components/Wallet';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { DailyRewardModal } from './components/DailyRewardModal';
import { lessonsData, Lesson } from './data/lessons';

export type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'language-selection' 
  | 'lesson-list' 
  | 'lesson' 
  | 'wallet' 
  | 'leaderboard' 
  | 'profile'
  | 'settings';

export interface Transaction {
  id: string;
  type: 'reward' | 'deposit' | 'withdraw' | 'send';
  amount: number;
  date: string;
  description: string;
}

export interface UserData {
  username: string;
  password: string;
  avatar: string;
  xp: number;
  streak: number;
  celoBalance: number;
  lessonsCompleted: number;
  totalRewards: number;
  selectedLanguage: string;
  completedLessons: { [language: string]: string[] };
  lastLogin: string;
  dailyGoal: number;
  dailyProgress: number;
  transactions: Transaction[];
  soundEnabled: boolean;
  lastDailyReward: string;
}

const STORAGE_KEY = 'learnearn_users';

// Haptic feedback simulation
const haptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = { light: 10, medium: 20, heavy: 30 };
    navigator.vibrate(patterns[type]);
  }
};

// Load all users from localStorage
const loadUsers = (): { [username: string]: UserData } => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading users:', error);
    return {};
  }
};

// Save all users to localStorage
const saveUsers = (users: { [username: string]: UserData }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Check if user should receive daily reward
const shouldShowDailyReward = (lastRewardDate: string): boolean => {
  if (!lastRewardDate) return true;
  const lastReward = new Date(lastRewardDate);
  const now = new Date();
  const diffHours = (now.getTime() - lastReward.getTime()) / (1000 * 60 * 60);
  return diffHours >= 24;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [dailyRewardAmount, setDailyRewardAmount] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    username: '',
    password: '',
    avatar: '👤',
    xp: 0,
    streak: 0,
    celoBalance: 0,
    lessonsCompleted: 0,
    totalRewards: 0,
    selectedLanguage: 'isiZulu',
    completedLessons: {
      isiZulu: [],
      Afrikaans: [],
      Sesotho: [],
      isiXhosa: []
    },
    lastLogin: new Date().toISOString(),
    dailyGoal: 3,
    dailyProgress: 0,
    transactions: [],
    soundEnabled: true,
    lastDailyReward: ''
  });

  useEffect(() => {
    // Auto-navigate from splash to onboarding after 2.5 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Save user data whenever it changes (except when logged out)
  useEffect(() => {
    if (userData.username) {
      const users = loadUsers();
      users[userData.username] = userData;
      saveUsers(users);
    }
  }, [userData]);

  const addTransaction = (type: Transaction['type'], amount: number, description: string) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      date: new Date().toISOString(),
      description
    };
    setUserData(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions].slice(0, 50) // Keep last 50
    }));
  };

  const addReward = (amount: number, lessonTitle: string) => {
    setUserData(prev => ({
      ...prev,
      celoBalance: prev.celoBalance + amount,
      totalRewards: prev.totalRewards + amount,
      xp: prev.xp + Math.floor(amount * 100),
      dailyProgress: prev.dailyProgress + 1
    }));
    addTransaction('reward', amount, `Completed: ${lessonTitle}`);
    haptic('medium');
    toast.success(`+${amount.toFixed(2)} CELO earned! 🎉`);
  };

  const completeLesson = (lessonId: string, language: string) => {
    setUserData(prev => {
      const completedForLang = prev.completedLessons[language] || [];
      if (!completedForLang.includes(lessonId)) {
        return {
          ...prev,
          lessonsCompleted: prev.lessonsCompleted + 1,
          streak: prev.streak + 1,
          completedLessons: {
            ...prev.completedLessons,
            [language]: [...completedForLang, lessonId]
          }
        };
      }
      return prev;
    });
    haptic('heavy');
  };

  const handleStartLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCurrentScreen('lesson');
    haptic('light');
  };

  const handleLogin = (username: string, pin: string, isReturningUser: boolean, existingData?: UserData) => {
    if (isReturningUser && existingData) {
      // Check for daily reward
      if (shouldShowDailyReward(existingData.lastDailyReward)) {
        const baseReward = 0.05;
        const streakBonus = existingData.streak * 0.01;
        const reward = baseReward + streakBonus;
        setDailyRewardAmount(reward);
        setShowDailyReward(true);
      }
      
      // Load existing user data
      setUserData({
        ...existingData,
        lastLogin: new Date().toISOString(),
        dailyProgress: 0 // Reset daily progress
      });
      
      toast.success(`Welcome back, ${username}! 👋`);
      haptic('medium');
    } else {
      // Create new user
      setUserData({
        username: username,
        password: pin,
        avatar: username.charAt(0).toUpperCase(),
        xp: 0,
        streak: 0,
        celoBalance: 0,
        lessonsCompleted: 0,
        totalRewards: 0,
        selectedLanguage: 'isiZulu',
        completedLessons: {
          isiZulu: [],
          Afrikaans: [],
          Sesotho: [],
          isiXhosa: []
        },
        lastLogin: new Date().toISOString(),
        dailyGoal: 3,
        dailyProgress: 0,
        transactions: [],
        soundEnabled: true,
        lastDailyReward: ''
      });
      
      toast.success(`Account created! Welcome, ${username}! 🎉`);
      haptic('heavy');
    }
    setCurrentScreen('language-selection');
  };

  const handleClaimDailyReward = () => {
    setUserData(prev => ({
      ...prev,
      celoBalance: prev.celoBalance + dailyRewardAmount,
      totalRewards: prev.totalRewards + dailyRewardAmount,
      xp: prev.xp + Math.floor(dailyRewardAmount * 100),
      lastDailyReward: new Date().toISOString()
    }));
    addTransaction('reward', dailyRewardAmount, 'Daily Login Bonus');
    setShowDailyReward(false);
    toast.success(`Daily reward claimed! +${dailyRewardAmount.toFixed(2)} CELO 🎁`);
    haptic('heavy');
  };

  const handleUpdateProfile = (username: string, avatar: string) => {
    setUserData(prev => ({
      ...prev,
      username: username,
      avatar: avatar
    }));
    toast.success('Profile updated! ✅');
    haptic('light');
  };

  const handleLogout = () => {
    toast.info('Logged out successfully. See you soon! 👋');
    haptic('medium');
    setCurrentScreen('login');
    // Reset user data
    setUserData({
      username: '',
      password: '',
      avatar: '👤',
      xp: 0,
      streak: 0,
      celoBalance: 0,
      lessonsCompleted: 0,
      totalRewards: 0,
      selectedLanguage: 'isiZulu',
      completedLessons: {
        isiZulu: [],
        Afrikaans: [],
        Sesotho: [],
        isiXhosa: []
      },
      lastLogin: new Date().toISOString(),
      dailyGoal: 3,
      dailyProgress: 0,
      transactions: [],
      soundEnabled: true,
      lastDailyReward: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Toaster 
        position="top-center" 
        expand={false}
        richColors
        toastOptions={{
          style: {
            marginTop: '60px',
          },
        }}
      />
      
      {/* Mobile Frame */}
      <div className="w-[390px] h-[844px] bg-white relative overflow-hidden shadow-2xl rounded-[3rem] border-8 border-gray-800">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'onboarding' && (
          <Onboarding onComplete={() => setCurrentScreen('login')} />
        )}
        {currentScreen === 'login' && (
          <Login onLogin={handleLogin} loadUsers={loadUsers} />
        )}
        {currentScreen === 'language-selection' && (
          <LanguageSelection 
            onSelectLanguage={(lang) => {
              setUserData(prev => ({ ...prev, selectedLanguage: lang }));
              setCurrentScreen('lesson-list');
              toast.success(`${lang} selected! 🇿🇦`);
              haptic('light');
            }}
            onNavigate={setCurrentScreen}
            currentScreen="language-selection"
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'lesson-list' && (
          <LessonList 
            language={userData.selectedLanguage}
            completedLessons={userData.completedLessons[userData.selectedLanguage] || []}
            onStartLesson={handleStartLesson}
            onNavigate={setCurrentScreen}
            currentScreen="lesson-list"
            onLogout={handleLogout}
            userData={userData}
          />
        )}
        {currentScreen === 'lesson' && currentLesson && (
          <LessonScreen 
            lesson={currentLesson}
            language={userData.selectedLanguage}
            onComplete={() => {
              completeLesson(currentLesson.id, userData.selectedLanguage);
              setCurrentScreen('lesson-list');
            }}
            onReward={(amount) => addReward(amount, currentLesson.title)}
            onBack={() => setCurrentScreen('lesson-list')}
            onViewWallet={() => setCurrentScreen('wallet')}
            soundEnabled={userData.soundEnabled}
          />
        )}
        {currentScreen === 'wallet' && (
          <Wallet 
            userData={userData}
            onNavigate={setCurrentScreen}
            currentScreen="wallet"
            onUpdateBalance={(newBalance) => {
              setUserData(prev => ({ ...prev, celoBalance: newBalance }));
            }}
            onLogout={handleLogout}
            onTransaction={addTransaction}
          />
        )}
        {currentScreen === 'leaderboard' && (
          <Leaderboard 
            userData={userData}
            onNavigate={setCurrentScreen}
            currentScreen="leaderboard"
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'profile' && (
          <Profile 
            userData={userData}
            onNavigate={setCurrentScreen}
            currentScreen="profile"
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {currentScreen === 'settings' && (
          <Settings 
            onBack={() => setCurrentScreen('profile')}
            onLogout={handleLogout}
            userData={userData}
            onUpdateSettings={(settings) => {
              setUserData(prev => ({ ...prev, ...settings }));
              toast.success('Settings saved! ✅');
            }}
          />
        )}
      </div>

      {/* Daily Reward Modal */}
      {showDailyReward && (
        <DailyRewardModal
          amount={dailyRewardAmount}
          streak={userData.streak}
          onClaim={handleClaimDailyReward}
        />
      )}
    </div>
  );
}