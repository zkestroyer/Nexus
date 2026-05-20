import React, { useState } from 'react';
import { CreditCard, ArrowDownLeft, ArrowUpRight, Search, X, DollarSign, Building } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  party: string;
  status: 'completed' | 'pending' | 'failed';
}

type ActionType = 'deposit' | 'withdraw' | 'transfer';

export default function PaymentCenter() {
  const [balance, setBalance] = useState(254500.00);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-9982', type: 'transfer', amount: -50000, date: '2026-05-18', party: 'Nexus Tech (Seed Fund)', status: 'completed' },
    { id: 'TX-9981', type: 'deposit', amount: 100000, date: '2026-05-15', party: 'Bank Transfer (...4451)', status: 'completed' },
    { id: 'TX-9980', type: 'transfer', amount: -1500, date: '2026-05-10', party: 'Legal Fees (Smith & Co)', status: 'pending' },
    { id: 'TX-9979', type: 'withdrawal', amount: -5000, date: '2026-05-02', party: 'Bank Transfer (...4451)', status: 'completed' },
  ]);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>('deposit');
  const [txAmount, setTxAmount] = useState('');
  const [txParty, setTxParty] = useState('');
  const [txError, setTxError] = useState('');

  // Opens the custom modal and resets the form
  const openModal = (action: ActionType) => {
    setActiveAction(action);
    setTxAmount('');
    setTxParty(action === 'deposit' ? 'Stripe Gateway' : '');
    setTxError('');
    setIsModalOpen(true);
  };

  // Handles the form submission inside the modal
  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTxError('');

    const amount = parseFloat(txAmount);
    if (isNaN(amount) || amount <= 0) {
      setTxError('Please enter a valid amount greater than 0.');
      return;
    }

    if ((activeAction === 'withdraw' || activeAction === 'transfer') && amount > balance) {
      setTxError('Insufficient funds for this transaction.');
      return;
    }

    // Update Balance
    if (activeAction === 'deposit') setBalance(prev => prev + amount);
    else setBalance(prev => prev - amount);

    // Create new transaction row
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: activeAction === 'withdraw' ? 'withdrawal' : activeAction,
      amount: activeAction === 'deposit' ? amount : -amount,
      date: new Date().toISOString().split('T')[0],
      party: txParty || (activeAction === 'withdraw' ? 'Bank Transfer' : 'Unknown Entity'),
      status: 'completed'
    };

    setTransactions(prev => [newTx, ...prev]);
    setIsModalOpen(false); // Close modal on success
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(amount));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Top Section: Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="p-8 relative z-10">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Available Balance</p>
            <h2 className="text-5xl font-bold mb-8 tracking-tight">{formatCurrency(balance)}</h2>
            
            <div className="flex gap-4">
              <Button onClick={() => openModal('deposit')} className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-2.5 h-auto rounded-full flex items-center gap-2">
                <ArrowDownLeft size={18} /> Add Funds
              </Button>
              <Button onClick={() => openModal('withdraw')} variant="outline" className="border-gray-600 text-white hover:bg-gray-700/50 hover:text-white font-semibold px-6 py-2.5 h-auto rounded-full flex items-center gap-2">
                <ArrowUpRight size={18} /> Withdraw
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-background border-border shadow-sm p-6 flex flex-col justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <CreditCard size={28} />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Fund a Deal</h3>
          <p className="text-sm text-foreground/70 mb-6">Instantly transfer capital to signed contracts.</p>
          <Button onClick={() => openModal('transfer')} className="w-full shadow-md">Initiate Transfer</Button>
        </Card>
      </div>

      {/* Bottom Section: Transaction History Table */}
      <Card className="bg-background border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-foreground">Transaction History</h3>
          <div className="w-full sm:w-64">
            <Input 
              placeholder="Search transactions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startAdornment={<Search size={16} />}
              fullWidth
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-foreground/60 uppercase bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction</th>
                <th className="px-6 py-4 font-semibold">Party/Details</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions
                .filter(tx => tx.party.toLowerCase().includes(searchQuery.toLowerCase()) || tx.type.includes(searchQuery.toLowerCase()))
                .map((tx) => (
                <tr key={tx.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {tx.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">{tx.type}</p>
                        <p className="text-xs text-foreground/50">{tx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/80 font-medium">{tx.party}</td>
                  <td className="px-6 py-4 text-foreground/60">{tx.date}</td>
                  <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'gray'}>
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* --- CUSTOM TRANSACTION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border border-border shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-border bg-secondary/30">
              <h3 className="text-lg font-bold text-foreground capitalize">
                {activeAction === 'transfer' ? 'Initiate Transfer' : `${activeAction} Funds`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleTransactionSubmit} className="p-6 space-y-4">
              {txError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {txError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Amount (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-foreground/50" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {activeAction === 'transfer' ? 'Recipient Entity' : 'Source / Description'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={16} className="text-foreground/50" />
                  </div>
                  <input
                    type="text"
                    value={txParty}
                    onChange={(e) => setTxParty(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={activeAction === 'transfer' ? 'e.g. Nexus Tech Startup' : 'e.g. Chase Bank ...4412'}
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" fullWidth onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" fullWidth>
                  Confirm {activeAction}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}