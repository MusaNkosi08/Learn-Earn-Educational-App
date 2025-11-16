import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownToLine, ArrowUpRight, Plus, Wallet as WalletIcon, LogOut, X, TrendingUp, Send } from 'lucide-react';
import { Button } from './ui/button';
import { BottomNav } from './BottomNav';
import { Screen, UserData, Transaction } from '../App';
import { toast } from 'sonner';

interface WalletProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
  onUpdateBalance: (newBalance: number) => void;
  onLogout: () => void;
  onTransaction: (type: Transaction['type'], amount: number, description: string) => void;
}

export function Wallet({ userData, onNavigate, currentScreen, onUpdateBalance, onLogout, onTransaction }: WalletProps) {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      onUpdateBalance(userData.celoBalance + depositAmount);
      onTransaction('deposit', depositAmount, 'Deposit to wallet');
      toast.success(`Deposited ${depositAmount.toFixed(2)} CELO successfully! 💰`);
      setAmount('');
      setShowDepositModal(false);
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= userData.celoBalance) {
      onUpdateBalance(userData.celoBalance - withdrawAmount);
      onTransaction('withdraw', withdrawAmount, 'Withdraw from wallet');
      toast.success(`Withdrawn ${withdrawAmount.toFixed(2)} CELO successfully! ✅`);
      setAmount('');
      setShowWithdrawModal(false);
    } else if (withdrawAmount > userData.celoBalance) {
      toast.error('Insufficient balance');
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const handleSend = () => {
    const sendAmount = parseFloat(amount);
    if (!isNaN(sendAmount) && sendAmount > 0 && sendAmount <= userData.celoBalance) {
      onUpdateBalance(userData.celoBalance - sendAmount);
      onTransaction('send', sendAmount, 'Sent to friend');
      toast.success(`Sent ${sendAmount.toFixed(2)} CELO successfully! 🚀`);
      setAmount('');
      setShowSendModal(false);
    } else if (sendAmount > userData.celoBalance) {
      toast.error('Insufficient balance');
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'reward':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'deposit':
        return <Plus className="w-5 h-5 text-blue-600" />;
      case 'withdraw':
        return <ArrowDownToLine className="w-5 h-5 text-purple-600" />;
      case 'send':
        return <Send className="w-5 h-5 text-orange-600" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'reward':
        return 'bg-green-100';
      case 'deposit':
        return 'bg-blue-100';
      case 'withdraw':
        return 'bg-purple-100';
      case 'send':
        return 'bg-orange-100';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header - Balance Card */}
      <div className="bg-gradient-to-br from-green-500 via-green-600 to-blue-600 p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <WalletIcon className="w-6 h-6 text-white" />
            <h1 className="text-white">My Wallet</h1>
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
          {/* Balance Display */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 mb-4">
            <p className="text-green-100 mb-2">Total Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-5xl">{userData.celoBalance.toFixed(2)}</span>
              <span className="text-green-100 text-2xl">CELO</span>
            </div>
            <p className="text-green-100 text-sm mt-2">
              ≈ ${(userData.celoBalance * 0.65).toFixed(2)} USD
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => setShowDepositModal(true)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-xl py-3 flex flex-col items-center justify-center gap-1 backdrop-blur-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs">Deposit</span>
            </Button>
            <Button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-xl py-3 flex flex-col items-center justify-center gap-1 backdrop-blur-sm"
            >
              <ArrowDownToLine className="w-5 h-5" />
              <span className="text-xs">Withdraw</span>
            </Button>
            <Button
              onClick={() => setShowSendModal(true)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-xl py-3 flex flex-col items-center justify-center gap-1 backdrop-blur-sm"
            >
              <ArrowUpRight className="w-5 h-5" />
              <span className="text-xs">Send</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 -mt-2">
        <h2 className="text-gray-900 mb-4">Recent Activity</h2>

        {userData.transactions && userData.transactions.length > 0 ? (
          <div className="space-y-3">
            {userData.transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
              >
                {/* Icon */}
                <div className={`${getTransactionColor(transaction.type)} rounded-full p-3`}>
                  {getTransactionIcon(transaction.type)}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-gray-900 text-sm">{transaction.description}</h3>
                  <p className="text-gray-500 text-xs mt-1">{formatDate(transaction.date)}</p>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className={transaction.type === 'reward' || transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'reward' || transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toFixed(2)} CELO
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <WalletIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No transactions yet</p>
            <p className="text-gray-500 text-sm">
              Complete lessons to earn CELO rewards
            </p>
          </div>
        )}
      </div>

      {/* MiniPay Badge */}
      <div className="px-6 pb-20 flex items-center justify-center gap-2 text-gray-500 text-sm">
        <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">C</span>
        </div>
        <span>MiniPay powered by Celo</span>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <TransactionModal
            title="Deposit CELO"
            description="Enter the amount you want to deposit (Simulated)"
            amount={amount}
            onAmountChange={setAmount}
            onConfirm={handleDeposit}
            onClose={() => setShowDepositModal(false)}
            buttonText="Deposit"
            buttonColor="bg-green-600 hover:bg-green-700"
          />
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <TransactionModal
            title="Withdraw CELO"
            description={`Enter the amount to withdraw (Max: ${userData.celoBalance.toFixed(2)} CELO) (Simulated)`}
            amount={amount}
            onAmountChange={setAmount}
            onConfirm={handleWithdraw}
            onClose={() => setShowWithdrawModal(false)}
            buttonText="Withdraw"
            buttonColor="bg-blue-600 hover:bg-blue-700"
          />
        )}
      </AnimatePresence>

      {/* Send Modal */}
      <AnimatePresence>
        {showSendModal && (
          <TransactionModal
            title="Send CELO"
            description={`Enter the amount to send (Max: ${userData.celoBalance.toFixed(2)} CELO) (Simulated)`}
            amount={amount}
            onAmountChange={setAmount}
            onConfirm={handleSend}
            onClose={() => setShowSendModal(false)}
            buttonText="Send"
            buttonColor="bg-purple-600 hover:bg-purple-700"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TransactionModal({
  title,
  description,
  amount,
  onAmountChange,
  onConfirm,
  onClose,
  buttonText,
  buttonColor,
}: {
  title: string;
  description: string;
  amount: string;
  onAmountChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
  buttonText: string;
  buttonColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-6 max-w-sm w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">{description}</p>

        <div className="mb-6">
          <label className="text-gray-700 text-sm mb-2 block">Amount (CELO)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          <Button
            onClick={onConfirm}
            className={`w-full ${buttonColor} text-white rounded-full py-3`}
          >
            {buttonText}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:border-gray-400 rounded-full py-3"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}