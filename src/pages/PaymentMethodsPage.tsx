import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, ArrowLeft, Plus, Trash2, Edit, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CardMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  expiry: string;
  name: string;
  isDefault: boolean;
}

interface PayPalAccount {
  id: string;
  email: string;
  isDefault: boolean;
}

interface OzowBank {
  id: string;
  bankName: string;
  accountType: string;
  isDefault: boolean;
}

const PaymentMethodsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'card' | 'paypal' | 'ozow'>('card');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const [cards, setCards] = useState<CardMethod[]>([
    { id: '1', type: 'visa', lastFour: '4242', expiry: '12/25', name: 'Chris Thato', isDefault: true },
    { id: '2', type: 'mastercard', lastFour: '8888', expiry: '08/24', name: 'Chris Thato', isDefault: false },
  ]);
  
  const [paypalAccounts, setPaypalAccounts] = useState<PayPalAccount[]>([
    { id: '1', email: 'chris.thato@example.com', isDefault: true },
  ]);
  
  const [ozowBanks, setOzowBanks] = useState<OzowBank[]>([
    { id: '1', bankName: 'Standard Bank', accountType: 'Cheque Account', isDefault: true },
    { id: '2', bankName: 'FNB', accountType: 'Savings Account', isDefault: false },
  ]);
  
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    makeDefault: false,
  });
  
  const [newPaypal, setNewPaypal] = useState({
    email: '',
    makeDefault: false,
  });
  
  const [newOzow, setNewOzow] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'cheque',
    makeDefault: false,
  });

  const handleAddCard = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvv || !newCard.name) return;
    
    const newCardMethod: CardMethod = {
      id: Date.now().toString(),
      type: newCard.number.startsWith('4') ? 'visa' : newCard.number.startsWith('5') ? 'mastercard' : 'amex',
      lastFour: newCard.number.slice(-4),
      expiry: newCard.expiry,
      name: newCard.name,
      isDefault: newCard.makeDefault || cards.length === 0,
    };
    
    // If making default, unset others
    const updatedCards = newCard.makeDefault 
      ? cards.map(card => ({ ...card, isDefault: false }))
      : [...cards];
    
    setCards([...updatedCards, newCardMethod]);
    setNewCard({ number: '', expiry: '', cvv: '', name: '', makeDefault: false });
    setIsAddingNew(false);
  };
  
  const handleAddPaypal = () => {
    if (!newPaypal.email) return;
    
    const newAccount: PayPalAccount = {
      id: Date.now().toString(),
      email: newPaypal.email,
      isDefault: newPaypal.makeDefault || paypalAccounts.length === 0,
    };
    
    const updatedAccounts = newPaypal.makeDefault
      ? paypalAccounts.map(acc => ({ ...acc, isDefault: false }))
      : [...paypalAccounts];
    
    setPaypalAccounts([...updatedAccounts, newAccount]);
    setNewPaypal({ email: '', makeDefault: false });
    setIsAddingNew(false);
  };
  
  const handleAddOzow = () => {
    if (!newOzow.bankName || !newOzow.accountNumber) return;
    
    const newBank: OzowBank = {
      id: Date.now().toString(),
      bankName: newOzow.bankName,
      accountType: newOzow.accountType === 'cheque' ? 'Cheque Account' : 'Savings Account',
      isDefault: newOzow.makeDefault || ozowBanks.length === 0,
    };
    
    const updatedBanks = newOzow.makeDefault
      ? ozowBanks.map(bank => ({ ...bank, isDefault: false }))
      : [...ozowBanks];
    
    setOzowBanks([...updatedBanks, newBank]);
    setNewOzow({ bankName: '', accountNumber: '', accountType: 'cheque', makeDefault: false });
    setIsAddingNew(false);
  };
  
  const setAsDefault = (id: string, type: 'card' | 'paypal' | 'ozow') => {
    switch (type) {
      case 'card':
        setCards(cards.map(card => ({ ...card, isDefault: card.id === id })));
        break;
      case 'paypal':
        setPaypalAccounts(paypalAccounts.map(acc => ({ ...acc, isDefault: acc.id === id })));
        break;
      case 'ozow':
        setOzowBanks(ozowBanks.map(bank => ({ ...bank, isDefault: bank.id === id })));
        break;
    }
  };
  
  const deleteMethod = (id: string, type: 'card' | 'paypal' | 'ozow') => {
    switch (type) {
      case 'card':
        setCards(cards.filter(card => card.id !== id));
        break;
      case 'paypal':
        setPaypalAccounts(paypalAccounts.filter(acc => acc.id !== id));
        break;
      case 'ozow':
        setOzowBanks(ozowBanks.filter(bank => bank.id !== id));
        break;
    }
  };
  
  const getCardLogo = (type: 'visa' | 'mastercard' | 'amex') => {
    switch (type) {
      case 'visa':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png';
      case 'mastercard':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png';
      case 'amex':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
              <p className="text-gray-600 mt-2">Manage your saved payment methods</p>
            </div>
            
            {/* Trust Badges */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-600" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock size={16} className="text-green-600" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Navigation */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Options</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('card')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                    activeTab === 'card' ? 'bg-red-50 border-red-600 border' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className={activeTab === 'card' ? 'text-red-600' : 'text-gray-500'} />
                    <span className={`font-medium ${activeTab === 'card' ? 'text-red-700' : 'text-gray-700'}`}>
                      Credit/Debit Cards
                    </span>
                  </div>
                  {activeTab === 'card' && (
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('paypal')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                    activeTab === 'paypal' ? 'bg-red-50 border-red-600 border' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" 
                        alt="PayPal" 
                        className="h-4 object-contain"
                      />
                    </div>
                    <span className={`font-medium ${activeTab === 'paypal' ? 'text-red-700' : 'text-gray-700'}`}>
                      PayPal
                    </span>
                  </div>
                  {activeTab === 'paypal' && (
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('ozow')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                    activeTab === 'ozow' ? 'bg-red-50 border-red-600 border' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm tracking-wide">OZOW</span>
                    </div>
                    <span className={`font-medium ${activeTab === 'ozow' ? 'text-red-700' : 'text-gray-700'}`}>
                      Ozow EFT
                    </span>
                  </div>
                  {activeTab === 'ozow' && (
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  )}
                </button>
              </div>
              
              {/* Security Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <Shield size={16} className="text-green-600" />
                  <span>Your payment details are securely stored with tokenization</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Lock size={16} className="text-green-600" />
                  <span>We never store your full card numbers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Cards Tab */}
              {activeTab === 'card' && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Cards</h2>
                  
                  <div className="space-y-4 mb-8">
                    {cards.map((card) => (
                      <div key={card.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8">
                            <img 
                              src={getCardLogo(card.type)} 
                              alt={card.type} 
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">
                                {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.lastFour}
                              </p>
                              {card.isDefault && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">Expires {card.expiry} • {card.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!card.isDefault && (
                            <button
                              onClick={() => setAsDefault(card.id, 'card')}
                              className="px-3 py-1 text-sm text-gray-700 hover:text-red-600"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteMethod(card.id, 'card')}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isAddingNew ? (
                    <div className="border border-gray-300 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Card</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="•••• •••• •••• ••••"
                            value={newCard.number}
                            onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={newCard.expiry}
                              onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="•••"
                              value={newCard.cvv}
                              onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                          <input
                            type="text"
                            placeholder="Chris Thato"
                            value={newCard.name}
                            onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="makeDefaultCard"
                            checked={newCard.makeDefault}
                            onChange={(e) => setNewCard({...newCard, makeDefault: e.target.checked})}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <label htmlFor="makeDefaultCard" className="text-sm text-gray-700">
                            Set as default payment method
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddCard}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                          >
                            Save Card
                          </button>
                          <button
                            onClick={() => setIsAddingNew(false)}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingNew(true)}
                      className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-red-600 hover:border-red-300 transition"
                    >
                      <Plus size={20} />
                      Add New Card
                    </button>
                  )}
                </>
              )}
              
              {/* PayPal Tab */}
              {activeTab === 'paypal' && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">PayPal Accounts</h2>
                  
                  <div className="space-y-4 mb-8">
                    {paypalAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 flex items-center justify-center">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" 
                              alt="PayPal" 
                              className="h-6 object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{account.email}</p>
                              {account.isDefault && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">Connected via PayPal</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!account.isDefault && (
                            <button
                              onClick={() => setAsDefault(account.id, 'paypal')}
                              className="px-3 py-1 text-sm text-gray-700 hover:text-red-600"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteMethod(account.id, 'paypal')}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isAddingNew ? (
                    <div className="border border-gray-300 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Add PayPal Account</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Email</label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={newPaypal.email}
                            onChange={(e) => setNewPaypal({...newPaypal, email: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="makeDefaultPaypal"
                            checked={newPaypal.makeDefault}
                            onChange={(e) => setNewPaypal({...newPaypal, makeDefault: e.target.checked})}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <label htmlFor="makeDefaultPaypal" className="text-sm text-gray-700">
                            Set as default payment method
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddPaypal}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                          >
                            Connect PayPal
                          </button>
                          <button
                            onClick={() => setIsAddingNew(false)}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingNew(true)}
                      className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-red-600 hover:border-red-300 transition"
                    >
                      <Plus size={20} />
                      Connect PayPal Account
                    </button>
                  )}
                </>
              )}
              
              {/* Ozow Tab */}
              {activeTab === 'ozow' && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Linked Bank Accounts</h2>
                  
                  <div className="space-y-4 mb-8">
                    {ozowBanks.map((bank) => (
                      <div key={bank.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 flex items-center justify-center">
                            <span className="text-green-600 font-bold text-lg tracking-wide">OZOW</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{bank.bankName}</p>
                              {bank.isDefault && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{bank.accountType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!bank.isDefault && (
                            <button
                              onClick={() => setAsDefault(bank.id, 'ozow')}
                              className="px-3 py-1 text-sm text-gray-700 hover:text-red-600"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteMethod(bank.id, 'ozow')}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isAddingNew ? (
                    <div className="border border-gray-300 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Link Bank Account via Ozow</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                          <select
                            value={newOzow.bankName}
                            onChange={(e) => setNewOzow({...newOzow, bankName: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="">Select Bank</option>
                            <option value="Standard Bank">Standard Bank</option>
                            <option value="FNB">First National Bank (FNB)</option>
                            <option value="Nedbank">Nedbank</option>
                            <option value="ABSA">ABSA</option>
                            <option value="Capitec">Capitec Bank</option>
                            <option value="Investec">Investec</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                          <input
                            type="text"
                            placeholder="•••• •••• ••••"
                            value={newOzow.accountNumber}
                            onChange={(e) => setNewOzow({...newOzow, accountNumber: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                          <select
                            value={newOzow.accountType}
                            onChange={(e) => setNewOzow({...newOzow, accountType: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="cheque">Cheque Account</option>
                            <option value="savings">Savings Account</option>
                            <option value="transmission">Transmission Account</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="makeDefaultOzow"
                            checked={newOzow.makeDefault}
                            onChange={(e) => setNewOzow({...newOzow, makeDefault: e.target.checked})}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <label htmlFor="makeDefaultOzow" className="text-sm text-gray-700">
                            Set as default payment method
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddOzow}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                          >
                            Link Account
                          </button>
                          <button
                            onClick={() => setIsAddingNew(false)}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingNew(true)}
                      className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-red-600 hover:border-red-300 transition"
                    >
                      <Plus size={20} />
                      Link New Bank Account
                    </button>
                  )}
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm tracking-wide">OZOW</span>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800">
                          <strong>How Ozow works:</strong> Your bank details are securely stored with Ozow's PCI-compliant system. 
                          Payments are processed instantly via secure EFT without sharing your banking login details.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;