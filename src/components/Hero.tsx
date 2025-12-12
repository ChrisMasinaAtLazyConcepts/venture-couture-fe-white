import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="African Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-block mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              New Collection 2025
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Embrace Summer 25
            <span className="block text-gray-300">
              African Heritage
            </span>
          </h1>
          <p className="text-xl mb-8 text-gray-200 leading-relaxed">
            Discover our stunning summer collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/shop"
              className="group bg-black hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              Shop Collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="/new-arrivals"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center"
            >
              View New Arrivals
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    
	  {/* CTA Button */}
        <button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg lg:text-xl py-4 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <span className="relative z-10 flex items-center justify-center">
            Start Shopping Now
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
	</section>
  );
}