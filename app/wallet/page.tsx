'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/store';
import { createWallet, clearError } from '../../lib/features/wallet/walletSlice';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Copy, Wallet, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/lib/hooks';

export default function WalletPage() {
  const dispatch = useAppDispatch()
  const { wallets, currentWallet, loading, error } = useSelector((state: RootState) => state.wallet);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    try {
      await dispatch(createWallet()).unwrap();
      toast.success('Wallet created successfully!');
    } catch (error) {
      toast.error('Failed to create wallet');
    }
  };

  const copyToClipboard = async (text: string, type: 'address' | 'id') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(type);
      toast.success(`${type === 'address' ? 'Address' : 'ID'} copied to clipboard!`);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pi Wallet Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create and manage Pi wallets for your customers to send payments
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => dispatch(clearError())}
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Create Wallet Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Wallet
            </CardTitle>
            <CardDescription>
              Create a new Pi wallet for your customers to send payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleCreateWallet}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Wallet...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Create Wallet
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Current Wallet Display */}
        {currentWallet && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Current Wallet
              </CardTitle>
              <CardDescription>
                Your active Pi wallet for receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <code className="flex-1 text-sm font-mono break-all">
                      {currentWallet.wallet_address}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(currentWallet.wallet_address, 'address')}
                    >
                      {copiedAddress === 'address' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Wallet ID
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <code className="flex-1 text-sm font-mono">
                      {currentWallet.wallet_id}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(currentWallet.wallet_id, 'id')}
                    >
                      {copiedAddress === 'id' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Created At
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">
                      {formatDate(currentWallet.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wallets History */}
        {wallets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet History
              </CardTitle>
              <CardDescription>
                All wallets created in this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wallets.map((wallet, index) => (
                  <div
                    key={wallet.wallet_address}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="text-sm font-medium">
                          {wallet.wallet_id}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(wallet.created_at)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
                      {wallet.wallet_address}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
            <CardDescription>
              Instructions for using your Pi wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">1. Create a Wallet</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click "Create Wallet" to generate a new Pi wallet address for your customers.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Share the Address</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy the wallet address and share it with your customers for Pi payments.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Track Payments</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use the wallet ID to track payments and manage your wallet through the Zyra API.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
