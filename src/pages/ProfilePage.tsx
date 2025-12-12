import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Calendar, 
  CreditCard, Bell, Shield, Camera, Edit, 
  Save, X, Eye, EyeOff, CheckCircle, Package, 
  Truck, MessageSquare, Gift, CreditCard as CardIcon,
  Lock, Smartphone, Globe as GlobeIcon, // Changed from Globe to GlobeIcon if Globe exists
  Download // Added Download icon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'preferences' | 'payment'>('personal');

  const [profile, setProfile] = useState({
    personal: {
      firstName: 'Kalenda',
      lastName: 'Admin',
      email: 'kalenda@venture-couture.co.za',
      phone: '+27 83 123 4567',
      dateOfBirth: '1990-05-15',
      gender: 'male',
      nationality: 'South African'
    },
    address: {
      street: '123 Main Street',
      city: 'Cape Town',
      province: 'Western Cape',
      postalCode: '8001',
      country: 'South Africa'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: true,
      lastLogin: '2024-01-20 14:30',
      loginAttempts: 0
    },
    communication: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      orderUpdates: true,
      priceDropAlerts: false,
      newsletter: true,
      preferredContact: 'email' as 'email' | 'sms' | 'whatsapp'
    },
    payment: {
      defaultMethod: 'card' as 'card' | 'paypal' | 'ozow',
      savePaymentInfo: true,
      autoTopUp: false,
      topUpAmount: 500
    },
    preferences: {
      language: 'en',
      currency: 'ZAR',
      timezone: 'Africa/Johannesburg',
      theme: 'light' as 'light' | 'dark' | 'auto',
      fontSize: 'medium' as 'small' | 'medium' | 'large',
      notificationsSound: true
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face');

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, you would send this to your backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (section: keyof typeof profile, field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="text-blue-500" size={20} />;
      case 'paypal': return <div className="text-blue-600 font-bold text-sm">PayPal</div>;
      case 'ozow': return <div className="text-green-600 font-bold text-sm">OZOW</div>;
      default: return <CreditCard size={20} />;
    }
  };

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case 'email': return <Mail className="text-red-500" size={20} />;
      case 'sms': return <Smartphone className="text-green-500" size={20} />;
      case 'whatsapp': return <MessageSquare className="text-green-600" size={20} />;
      default: return <Mail size={20} />;
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
            Back to Account
          </button>
          <div className="flex justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                <Edit size={20} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  <X size={20} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Summary & Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-1/4 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.personal.firstName} {profile.personal.lastName}
                </h2>
                <p className="text-gray-600">{profile.personal.email}</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield size={14} className="text-green-500" />
                  <span>Verified Account</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-600">Orders</p>
                </div>
                
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                    activeTab === 'personal' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User size={20} />
                  <span className="font-medium">Personal Info</span>
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                    activeTab === 'payment' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="font-medium">Payment Methods</span>
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                    activeTab === 'preferences' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bell size={20} />
                  <span className="font-medium">Preferences</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                    activeTab === 'security' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Shield size={20} />
                  <span className="font-medium">Security</span>
                </button>
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/payment-methods')}
                  className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <CardIcon size={16} />
                  Manage Payment Methods
                </button>
                <button
                  onClick={() => navigate('/address-book')}
                  className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <MapPin size={16} />
                  Address Book
                </button>
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Package size={16} />
                  Order History
                </button>
                <button
                  onClick={() => navigate('/wishlist')}
                  className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Gift size={16} />
                  Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Tab Header */}
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {activeTab === 'personal' && 'Personal Information'}
                    {activeTab === 'payment' && 'Payment & Billing'}
                    {activeTab === 'preferences' && 'Preferences'}
                    {activeTab === 'security' && 'Security Settings'}
                  </h2>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-8">
                    {/* Personal Details */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User size={20} className="text-red-600" />
                        Personal Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            value={isEditing ? editedProfile.personal.firstName : profile.personal.firstName}
                            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={isEditing ? editedProfile.personal.lastName : profile.personal.lastName}
                            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="email"
                              value={isEditing ? editedProfile.personal.email : profile.personal.email}
                              onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                              disabled={!isEditing}
                              className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <div className="p-2 bg-green-100 text-green-800 rounded-lg">
                              <CheckCircle size={20} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={isEditing ? editedProfile.personal.phone : profile.personal.phone}
                            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <input
                            type="date"
                            value={isEditing ? editedProfile.personal.dateOfBirth : profile.personal.dateOfBirth}
                            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                          <select
                            value={isEditing ? editedProfile.personal.gender : profile.personal.gender}
                            onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-red-600" />
                        Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                          <input
                            type="text"
                            value={isEditing ? editedProfile.address.street : profile.address.street}
                            onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            value={isEditing ? editedProfile.address.city : profile.address.city}
                            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                          <select
                            value={isEditing ? editedProfile.address.province : profile.address.province}
                            onChange={(e) => handleInputChange('address', 'province', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="Eastern Cape">Eastern Cape</option>
                            <option value="Free State">Free State</option>
                            <option value="Gauteng">Gauteng</option>
                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                            <option value="Limpopo">Limpopo</option>
                            <option value="Mpumalanga">Mpumalanga</option>
                            <option value="Northern Cape">Northern Cape</option>
                            <option value="North West">North West</option>
                            <option value="Western Cape">Western Cape</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                          <input
                            type="text"
                            value={isEditing ? editedProfile.address.postalCode : profile.address.postalCode}
                            onChange={(e) => handleInputChange('address', 'postalCode', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                          <input
                            type="text"
                            value={isEditing ? editedProfile.address.country : profile.address.country}
                            disabled
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment & Billing Tab */}
                {activeTab === 'payment' && (
                  <div className="space-y-8">
                    {/* Default Payment Method */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard size={20} className="text-red-600" />
                        Default Payment Method
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {['card', 'paypal', 'ozow'].map((method) => (
                          <button
                            key={method}
                            onClick={() => isEditing && handleInputChange('payment', 'defaultMethod', method)}
                            disabled={!isEditing}
                            className={`p-4 border rounded-lg transition-all ${
                              (isEditing ? editedProfile.payment.defaultMethod : profile.payment.defaultMethod) === method
                                ? 'border-red-600 bg-red-50'
                                : 'border-gray-300 hover:border-gray-400'
                            } ${!isEditing ? 'cursor-default' : ''}`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              {getPaymentMethodIcon(method)}
                              <span className={`font-medium ${
                                (isEditing ? editedProfile.payment.defaultMethod : profile.payment.defaultMethod) === method
                                  ? 'text-red-700'
                                  : 'text-gray-700'
                              }`}>
                                {method === 'card' && 'Credit Card'}
                                {method === 'paypal' && 'PayPal'}
                                {method === 'ozow' && 'Ozow EFT'}
                              </span>
                              {(isEditing ? editedProfile.payment.defaultMethod : profile.payment.defaultMethod) === method && (
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                  <CheckCircle size={14} />
                                  <span>Default</span>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Payment Preferences */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Lock size={20} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Save Payment Information</p>
                              <p className="text-sm text-gray-600">Securely save your payment methods for faster checkout</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isEditing ? editedProfile.payment.savePaymentInfo : profile.payment.savePaymentInfo}
                              onChange={(e) => handleInputChange('payment', 'savePaymentInfo', e.target.checked)}
                              disabled={!isEditing}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CreditCard size={20} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Auto Top-Up Wallet</p>
                              <p className="text-sm text-gray-600">Automatically add funds when balance is low</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isEditing ? editedProfile.payment.autoTopUp : profile.payment.autoTopUp}
                              onChange={(e) => handleInputChange('payment', 'autoTopUp', e.target.checked)}
                              disabled={!isEditing}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        {editedProfile.payment.autoTopUp && isEditing && (
                          <div className="ml-12">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Top-Up Amount (R)</label>
                            <input
                              type="number"
                              value={editedProfile.payment.topUpAmount}
                              onChange={(e) => handleInputChange('payment', 'topUpAmount', parseInt(e.target.value))}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              min="100"
                              step="50"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Linked Accounts */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Linked Accounts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 font-bold">PayPal</div>
                            <div>
                              <p className="font-medium text-gray-900">PayPal Account</p>
                              <p className="text-sm text-gray-600">Connected for quick payments</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-green-600 font-bold">OZOW</div>
                            <div>
                              <p className="font-medium text-gray-900">Ozow EFT</p>
                              <p className="text-sm text-gray-600">Secure bank payments</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Connected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-8">
                    {/* Communication Preferences */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Bell size={20} className="text-red-600" />
                        Communication Preferences
                      </h3>
                      <div className="space-y-4">
                        {/* Preferred Contact Method */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Contact Method</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['email', 'sms', 'whatsapp'].map((method) => (
                              <button
                                key={method}
                                onClick={() => isEditing && handleInputChange('communication', 'preferredContact', method)}
                                disabled={!isEditing}
                                className={`p-4 border rounded-lg transition-all ${
                                  (isEditing ? editedProfile.communication.preferredContact : profile.communication.preferredContact) === method
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                } ${!isEditing ? 'cursor-default' : ''}`}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  {getCommunicationIcon(method)}
                                  <span className={`font-medium ${
                                    (isEditing ? editedProfile.communication.preferredContact : profile.communication.preferredContact) === method
                                      ? 'text-red-700'
                                      : 'text-gray-700'
                                  }`}>
                                    {method.charAt(0).toUpperCase() + method.slice(1)}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="space-y-3">
                          {[
                            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive order updates via email' },
                            { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive order updates via SMS' },
                            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional offers and news' },
                            { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about order status changes' },
                            { key: 'priceDropAlerts', label: 'Price Drop Alerts', description: 'Get notified when items in your wishlist go on sale' },
                            { key: 'newsletter', label: 'Weekly Newsletter', description: 'Receive our curated weekly newsletter' },
                          ].map((setting) => (
                            <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{setting.label}</p>
                                <p className="text-sm text-gray-600">{setting.description}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isEditing ? editedProfile.communication[setting.key as keyof typeof editedProfile.communication] : profile.communication[setting.key as keyof typeof profile.communication]}
                                  onChange={(e) => handleInputChange('communication', setting.key, e.target.checked)}
                                  disabled={!isEditing}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Display Preferences */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Display Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                          <select
                            value={isEditing ? editedProfile.preferences.language : profile.preferences.language}
                            onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="en">English</option>
                            <option value="af">Afrikaans</option>
                            <option value="zu">Zulu</option>
                            <option value="xh">Xhosa</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                          <select
                            value={isEditing ? editedProfile.preferences.currency : profile.preferences.currency}
                            onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="ZAR">South African Rand (R)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">British Pound (£)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                          <select
                            value={isEditing ? editedProfile.preferences.theme : profile.preferences.theme}
                            onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto (System)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                          <select
                            value={isEditing ? editedProfile.preferences.fontSize : profile.preferences.fontSize}
                            onChange={(e) => handleInputChange('preferences', 'fontSize', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    {/* Password Change */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Lock size={20} className="text-red-600" />
                        Change Password
                      </h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={editedProfile.security.currentPassword}
                              onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-500"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={editedProfile.security.newPassword}
                              onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={editedProfile.security.confirmPassword}
                              onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (editedProfile.security.newPassword !== editedProfile.security.confirmPassword) {
                              alert('Passwords do not match!');
                              return;
                            }
                            alert('Password updated successfully!');
                            handleInputChange('security', 'currentPassword', '');
                            handleInputChange('security', 'newPassword', '');
                            handleInputChange('security', 'confirmPassword', '');
                          }}
                          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield size={20} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isEditing ? editedProfile.security.twoFactorEnabled : profile.security.twoFactorEnabled}
                              onChange={(e) => handleInputChange('security', 'twoFactorEnabled', e.target.checked)}
                              disabled={!isEditing}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <Calendar size={20} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Last Login</p>
                              <p className="text-sm text-gray-600">{profile.security.lastLogin}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Shield size={20} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Login Attempts</p>
                              <p className="text-sm text-gray-600">{profile.security.loginAttempts} failed attempts this month</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => alert('Session list would open')}
                            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                          >
                            <p className="font-medium text-gray-900">Manage Active Sessions</p>
                            <p className="text-sm text-gray-600">View and manage devices that are logged into your account</p>
                          </button>
                          <button
                            onClick={() => alert('Account activity would be shown')}
                            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                          >
                            <p className="font-medium text-gray-900">Account Activity</p>
                            <p className="text-sm text-gray-600">Review recent account activity and security events</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => alert('Exporting data...')}
                  className="flex items-center justify-center gap-2 p-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  <Download size={20} />
                  Export Personal Data
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      alert('Account deletion requested. Please check your email to confirm.');
                    }
                  }}
                  className="flex items-center justify-center gap-2 p-4 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition"
                >
                  <X size={20} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;