import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, CreditCard } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';
import { PricingTier } from '../../../types';

// Mock pricing tiers
const mockPricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'monthly',
    features: [
      'Up to 3 team members',
      'Basic module library (5 modules)',
      'Standard support',
      'Basic analytics',
    ],
    limitations: {
      teamMembers: 3,
      moduleDownloads: 5,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49.99,
    billingPeriod: 'monthly',
    features: [
      'Up to 10 team members',
      'Extended module library (15 modules)',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    limitations: {
      teamMembers: 10,
      moduleDownloads: 15,
    },
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199.99,
    billingPeriod: 'monthly',
    features: [
      'Unlimited team members',
      'Full module library access',
      'Dedicated support',
      'Advanced analytics with AI insights',
      'Custom module development',
      'White-label solution',
      'SSO integration',
      'Dedicated account manager',
    ],
    limitations: {
      teamMembers: 999,
      moduleDownloads: 999,
    },
  },
];

const UpgradePlan: React.FC = () => {
  const { auth } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  // Get current plan from auth context or use a default
  const currentPlan = auth.company?.plan || 'free';
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleBillingPeriodChange = (period: 'monthly' | 'annual') => {
    setBillingPeriod(period);
  };
  
  const getAnnualPrice = (monthlyPrice: number) => {
    // 20% discount for annual billing
    return (monthlyPrice * 12 * 0.8).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h1>
        <Link to="/billing/manage">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Subscription
          </Button>
        </Link>
      </div>
      
      {/* Billing Period Toggle */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Choose Billing Period</h2>
            <p className="text-sm text-gray-600 mt-1">
              Save 20% with annual billing
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => handleBillingPeriodChange('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${billingPeriod === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleBillingPeriodChange('annual')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${billingPeriod === 'annual' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                Annual
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPricingTiers.map((tier) => {
          const isCurrentPlan = tier.id === currentPlan;
          const isSelected = tier.id === selectedPlan;
          const price = billingPeriod === 'monthly' ? tier.price : Number(getAnnualPrice(tier.price));
          
          return (
            <Card key={tier.id} className={`relative ${tier.recommended ? 'border-blue-500 border-2' : ''}`}>
              {tier.recommended && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  Recommended
                </div>
              )}
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">${price}</span>
                  <span className="text-gray-500 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  {isCurrentPlan ? (
                    <Button fullWidth disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      fullWidth 
                      variant={isSelected ? 'default' : 'outline'}
                      onClick={() => handlePlanSelect(tier.id)}
                    >
                      {isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Checkout Section */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Complete Your Upgrade</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {mockPricingTiers.find(tier => tier.id === selectedPlan)?.name} Plan
                </h3>
                <p className="text-sm text-gray-600">
                  Billed {billingPeriod === 'monthly' ? 'monthly' : 'annually'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${billingPeriod === 'monthly' 
                    ? mockPricingTiers.find(tier => tier.id === selectedPlan)?.price
                    : getAnnualPrice(mockPricingTiers.find(tier => tier.id === selectedPlan)?.price || 0)
                  }
                </p>
                <p className="text-xs text-gray-500">
                  {billingPeriod === 'annual' && '(20% discount applied)'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
          </div>
        </div>
      </Card>
=======
import { Check, CreditCard } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const UpgradePlan: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 29 : 290,
      description: 'Perfect for small teams just getting started',
      features: [
        'Up to 5 team members',
        '10 modules included',
        'Basic reporting',
        'Email support',
        '5GB storage',
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 49 : 490,
      description: 'Great for growing businesses',
      features: [
        'Up to 25 team members',
        'Unlimited modules',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Custom branding',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 99 : 990,
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited team members',
        'Unlimited modules',
        'Custom analytics',
        'Dedicated support',
        'Unlimited storage',
        'White labeling',
        'API access',
        'Custom integrations',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h1>
        <p className="mt-2 text-gray-600">
          Choose the perfect plan for your team's needs
        </p>
      </div>

      {/* Billing Cycle Toggle */}
      <Card>
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === 'annual'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              plan.popular ? 'border-2 border-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Popular
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                fullWidth
                className="mt-8"
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Payment Section */}
      <Card title="Payment Details">
        <div className="space-y-4">
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="card-number"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="4242 4242 4242 4242"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="123"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button fullWidth>
            Upgrade Now
          </Button>
        </div>
      </Card>

      {/* Terms and Conditions */}
      <div className="text-center text-sm text-gray-500">
        By upgrading your plan, you agree to our{' '}
        <a href="#" className="text-blue-600 hover:text-blue-500">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </a>
      </div>
>>>>>>> de34be0debf5e974a1c9ee65007065aa93bc85bd
    </div>
  );
};

export default UpgradePlan;