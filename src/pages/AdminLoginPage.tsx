import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if page should reload on load
    
      navigate(location.pathname, { replace: true });
  }, [navigate, location.pathname]);

  // Function to trigger reload on next page load
  const setReloadOnNextLoad = () => {
    localStorage.setItem('shouldReloadCurrentPath', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation
    if (email && password) {
      console.log('Admin login attempt:', { email, rememberMe });
      navigate('/admin-dashboard');
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
      {/* Premium Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=3000&q=80")',
        }}
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
              initial={{ y: -100, x: Math.random() * 100 }}
              animate={{
                y: '100vh',
                x: Math.random() * 100 - 50,
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Minimal Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2.5 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl transition-all border border-white/20 hover:border-white/30 shadow-lg"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back to Store</span>
      </motion.button>

      {/* Main Centered Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Brand Logo/Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full" />
              <img 
                src="/assets/images/vc.logo.png" 
                className="relative object-contain w-48 h-16" 
                alt="Venture Couture" 
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-white/90 text-sm font-medium">Admin Portal</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Staff Login</h1>
          <p className="text-white/70 text-sm md:text-base max-w-md">
            Secure access to inventory management, order tracking, and analytics dashboard
          </p>
        </motion.div>

        {/* Centered Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm"
                >
                  <p className="text-red-200 text-sm text-center">{error}</p>
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-white/90 text-sm font-medium">
                  Work Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 z-10" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@venturecouture.com"
                    className="relative w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition z-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-white/90 text-sm font-medium">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 z-10" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="relative w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition z-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white z-10"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded border-white/30 bg-white/10 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-3 h-3 bg-white/20 rounded" />
                    </div>
                  </div>
                  <span className="text-white/80 text-sm">Remember this device</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-300 hover:text-blue-200 text-sm font-medium transition hover:underline"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Security Badge */}
              <div className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Shield size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">256-bit SSL Encryption</p>
                    <p className="text-white/60 text-xs">Your session is secure and monitored</p>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>Sign in to Dashboard</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/10 bg-black/30">
              <div className="text-center space-y-2">
                <p className="text-white/50 text-xs">
                  For security reasons, please log out after each session
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Secure Connection
                  </span>
                  <span>•</span>
                  <span>v2.5.1</span>
                  <span>•</span>
                  <span>ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-white/60 text-sm">
            Need assistance? Contact{' '}
            <a href="mailto:it@venturecouture.com" className="text-blue-300 hover:text-blue-200 font-medium hover:underline">
              IT Support
            </a>
          </p>
          <p className="text-white/40 text-xs mt-2">
            Available 24/7 • Response time: &lt; 15 minutes
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;