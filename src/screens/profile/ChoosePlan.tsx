import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    billing: 'Free Forever',
    tokens: 30,
    features: [
      'Standard quality',
      'Watermarked outputs',
      '5 downloads/day',
      'Access to 3 tools daily',
    ],
    popular: false,
    color: 'gray',
  },
  {
    id: 'creator',
    name: 'Creator',
    monthlyPrice: 19,
    annualPrice: 15,
    tokens: 500,
    features: [
      'HD quality',
      'No watermarks',
      'Unlimited downloads',
      'Priority processing',
      'Early access features',
      '20% token discount',
    ],
    popular: true,
    color: 'blue',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 49,
    annualPrice: 39,
    tokens: 2000,
    features: [
      'Ultra HD quality',
      'Batch processing',
      'Custom backgrounds',
      'API access (1000 calls/mo)',
      'White-label option',
      '40% token discount',
      'Priority support',
    ],
    popular: false,
    color: 'purple',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    billing: 'Contact Sales',
    tokens: 'Unlimited',
    features: [
      'Unlimited tokens',
      'Custom AI model training',
      'Dedicated support',
      'SLA guarantees',
      'Custom integrations',
      'Team management',
    ],
    popular: false,
    color: 'gold',
  },
];

const ChoosePlan: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (planId: string) => {
    if (planId === 'enterprise') {
      alert('Please contact sales@lorven.ai for Enterprise pricing');
    } else if (planId === 'starter') {
      alert('You are already on the free Starter plan');
    } else {
      alert(`Subscription to ${planId} plan would be processed here with Stripe`);
      // In real app: integrate with Stripe
    }
  };

  const getPrice = (plan: any) => {
    if (plan.id === 'starter') return 'Free';
    if (plan.id === 'enterprise') return 'Custom';
    return billingCycle === 'monthly' ? `$${plan.monthlyPrice}/mo` : `$${plan.annualPrice}/mo`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-2xl mr-4">
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Choose Your Plan</h1>
          </div>
        </div>
      </header>

      {/* Billing Toggle */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="space-y-6">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 relative ${
                plan.popular ? 'border-4 border-gray-900' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {typeof plan.tokens === 'string' ? plan.tokens : `${plan.tokens} tokens/month`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{getPrice(plan)}</p>
                  {plan.id !== 'starter' && plan.id !== 'enterprise' && (
                    <p className="text-sm text-gray-600">
                      {billingCycle === 'annual' ? 'billed annually' : 'billed monthly'}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                size="large"
                fullWidth
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.id === 'starter'
                  ? 'Current Plan'
                  : plan.id === 'enterprise'
                  ? 'Contact Sales'
                  : `Choose ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-8 p-6 bg-white rounded-xl border-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All Plans Include:</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">All 7 AI tools</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Discovery feed & social features</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Rewards & missions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Community support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Regular updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
