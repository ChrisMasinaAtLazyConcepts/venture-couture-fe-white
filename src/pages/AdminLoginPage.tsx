import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation - replace with actual authentication logic
    if (email && password) {
      console.log('Admin login attempt:', { email, rememberMe });
      // In a real app, you would validate credentials here
      // For demo, we'll accept any non-empty credentials
       navigate('/admin-dashboard'); // Uncomment when you have a dashboard
    } else {
      setError('Please enter valid credentials');
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    alert('A password reset link would be sent to your email.');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=3000&q=80")',
          // Alternative logistics/warehouse image suggestions:
          // "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" - Modern warehouse
          // "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d" - Clothing sorting
          // Note: Use royalty-free images from Shutterstock or similar services[citation:1]
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-black/90" />
        
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              initial={{ y: -100, x: Math.random() * 100 }}
              animate={{
                y: '100vh',
                x: Math.random() * 100 - 50,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back to Store</span>
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Premium Header */}
            <div className="bg-black p-8 text-center border-b border-white/10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-black rounded-xl">
                 
                </div>
                <div className="text-left">
                  <img 
						src="/assets/images/vc.logo.png" 
						className="object-contain w-40 h-25" 
						alt="Venture Couture" 
					  />
                  <p className="text-white/70 text-sm">CRM Portal</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                Secure access to inventory, orders, and analytics
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-200 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@venturecouture.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 checked:bg-blue-500 focus:ring-blue-500/50"
                    disabled={isLoading}
                  />
                  <span className="text-white/70 text-sm">Remember this device</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-300 hover:text-blue-200 text-sm font-medium transition"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Security Note */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white/70 text-xs">
                    This portal uses 256-bit SSL encryption. Your session is secure and monitored.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-red-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Sign in
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/10 bg-black/20">
              <div className="text-center">
                <p className="text-white/50 text-xs mb-2">
                  For security reasons, please log out after each session
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                  <span>v2.5.1</span>
                  <span>•</span>
                  <span>Last updated: Dec 2024</span>
                  <span>•</span>
                  <span>ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Need help? Contact IT Support at{' '}
              <a href="mailto:it@venturecouture.com" className="text-blue-300 hover:text-blue-200">
                it@venturecouture.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;