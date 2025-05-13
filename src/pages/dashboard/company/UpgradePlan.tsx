import React, { useState } from 'react';
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
    </div>
  );
};

export default UpgradePlan;