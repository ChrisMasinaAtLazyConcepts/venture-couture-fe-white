import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Shield, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Truck className="text-gray-400" size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over R500</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Shield className="text-gray-400" size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Secure Payment</p>
              <p className="text-xs text-gray-500">100% secure</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="p-2 bg-gray-800 rounded-lg">
              <CreditCard className="text-gray-400" size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Easy Returns</p>
              <p className="text-xs text-gray-500">30-day policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Phone className="text-gray-400" size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">24/7 Support</p>
              <p className="text-xs text-gray-500">Dedicated service</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="hidden sm:block">
               <h1 className="text-red-400 text3xl"><strong>Venture Couture Online</strong></h1>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Redefining African luxury fashion with contemporary designs that celebrate heritage and innovation.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition group">
                <Facebook size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition group">
                <Instagram size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition group">
                <Twitter size={18} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Collections</h4>
            <ul className="space-y-2">
              {['Women\'s', 'Men\'s', 'Accessories', 'New Arrivals', 'Limited Edition', 'Bridal'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {['Contact Us', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'FAQ', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-gray-400" />
                <span className="text-sm">123 Commerce Street, Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={16} className="flex-shrink-0 text-gray-400" />
                <span className="text-sm">+27 11 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={16} className="flex-shrink-0 text-gray-400" />
                <span className="text-sm">hello@venturecouture.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Venture Couture. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-gray-500 text-sm">
                Designed by{' '}
                <a 
                  href="https://next-group.co.za" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  Next Group 
                </a>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-300">Terms</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-300">Privacy</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-300">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}