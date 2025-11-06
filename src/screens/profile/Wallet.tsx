import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { Button, Card, BottomNavigation } from '../../components/ui';

const tokenPackages = [
  { tokens: 100, price: 4.99, bonus: 0, popular: false },
  { tokens: 500, price: 19.99, bonus: 50, popular: true },
  { tokens: 1000, price: 34.99, bonus: 150, popular: false },
  { tokens: 2500, price: 79.99, bonus: 500, popular: false },
];

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { balance, transactions, purchaseTokens } = useTokens();

  const handlePurchase = (tokens: number, price: number) => {
    // Mock purchase - in real app would integrate with Stripe
    if (confirm(`Purchase ${tokens} tokens for $${price}?`)) {
      purchaseTokens(tokens);
      alert('Purchase successful!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">
            ←
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        </div>
      </header>

      {/* Balance Display */}
      <div className="p-6">
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center">
          <p className="text-sm opacity-80 mb-2">Current Balance</p>
          <div className="flex items-center justify-center space-x-2 mb-1">
            <span className="text-5xl">💎</span>
            <span className="text-5xl font-bold">{balance}</span>
          </div>
          <p className="text-sm opacity-80">Tokens</p>
        </Card>
      </div>

      {/* Token Packages */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Purchase Tokens</h2>
        <div className="grid grid-cols-2 gap-4">
          {tokenPackages.map((pkg) => (
            <Card
              key={pkg.tokens}
              className={`p-4 text-center relative ${pkg.popular ? 'border-gray-900' : ''}`}
              hover
            >
              {pkg.popular && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}
              <div className="text-4xl mb-2">💎</div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {pkg.tokens}
                {pkg.bonus > 0 && <span className="text-sm text-green-600"> +{pkg.bonus}</span>}
              </p>
              <p className="text-sm text-gray-600 mb-3">tokens</p>
              <Button
                variant={pkg.popular ? 'primary' : 'outline'}
                size="small"
                fullWidth
                onClick={() => handlePurchase(pkg.tokens + pkg.bonus, pkg.price)}
              >
                ${pkg.price}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Token Uses */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use Tokens</h2>
        <Card className="p-6 space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎭</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">AI Tools</p>
              <p className="text-sm text-gray-600">10-15 tokens per creation</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">💎</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Premium Templates</p>
              <p className="text-sm text-gray-600">Unlock exclusive styles</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📈</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Boost Visibility</p>
              <p className="text-sm text-gray-600">Promote your creations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✨</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Extra Generations</p>
              <p className="text-sm text-gray-600">Beyond daily limits</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <Card className="divide-y-2 divide-gray-200">
          {transactions.slice(0, 10).map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {transaction.type === 'earn' ? '📥' : transaction.type === 'purchase' ? '💳' : '📤'}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                className={`font-bold ${
                  transaction.type === 'spend' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {transaction.type === 'spend' ? '-' : '+'}
                {transaction.amount}
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Wallet;
