import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
<section className="py-16 bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-block mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto border-2 border-blue-200">
          <Mail className="text-blue-600" size={32} />
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Stay Connected
      </h2>
      
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-6 py-4 rounded-lg border border-blue-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Subscribe
        </button>
      </form>

      <p className="text-gray-500 text-sm mt-6">
        By subscribing, you agree to receive marketing emails from Venture Couture
      </p>
    </div>
  </div>
</section>
  );
}