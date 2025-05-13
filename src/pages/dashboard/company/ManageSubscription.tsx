import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Calendar, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const ManageSubscription: React.FC = () => {
  // Mock subscription data
  const subscription = {
    plan: 'Professional',
    status: 'active',
    billingCycle: 'monthly',
    nextBillingDate: '2023-08-15',
    amount: 49.99,
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      expiry: '12/24',
    },
    features: {
      modulesUsed: 8,
      maxModules: 15,
      usersCount: 12,
      maxUsers: 25,
      storage: 45,
      maxStorage: 100,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Subscription</h1>
        <Link to="/dashboard/billing/upgrade">
          <Button>Upgrade Plan</Button>
        </Link>
      </div>

      {/* Current Plan Overview */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {subscription.plan} Plan
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Billing {subscription.billingCycle} · Next payment on {subscription.nextBillingDate}
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            Active
          </span>
        </div>
      </Card>

      {/* Payment Method */}
      <Card title="Payment Method">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">
                {subscription.paymentMethod.type} ending in {subscription.paymentMethod.last4}
              </p>
              <p className="text-sm text-gray-500">
                Expires {subscription.paymentMethod.expiry}
              </p>
            </div>
          </div>
          <Button variant="outline">Update Payment Method</Button>
        </div>
      </Card>

      {/* Usage Overview */}
      <Card title="Usage Overview">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Modules Used</span>
              <span className="text-sm font-medium text-gray-900">
                {subscription.features.modulesUsed}/{subscription.features.maxModules}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${(subscription.features.modulesUsed / subscription.features.maxModules) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Team Members</span>
              <span className="text-sm font-medium text-gray-900">
                {subscription.features.usersCount}/{subscription.features.maxUsers}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-600"
                style={{ width: `${(subscription.features.usersCount / subscription.features.maxUsers) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Storage Used (GB)</span>
              <span className="text-sm font-medium text-gray-900">
                {subscription.features.storage}/{subscription.features.maxStorage}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-purple-600"
                style={{ width: `${(subscription.features.storage / subscription.features.maxStorage) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Billing History */}
      <Card title="Billing History">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">July 2023</p>
              <p className="text-sm text-gray-500">Professional Plan</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$49.99</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">June 2023</p>
              <p className="text-sm text-gray-500">Professional Plan</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$49.99</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">May 2023</p>
              <p className="text-sm text-gray-500">Professional Plan</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$49.99</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full flex items-center justify-center">
            View All Invoices <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Cancel Subscription */}
      <Card>
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Cancel Subscription</h3>
            <p className="mt-1 text-sm text-gray-500">
              Canceling your subscription will disable access to all premium features at the end of your billing period.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ManageSubscription;