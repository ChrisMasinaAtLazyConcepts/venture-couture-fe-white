import { useState, useEffect, useRef } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Navigation } from 'lucide-react';
import Footer from '../components/Footer';

// Import Leaflet for maps
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [vehiclePosition, setVehiclePosition] = useState({ lat: -26.107, lng: 28.058 });
  const animationRef = useRef<number | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapSticky, setIsMapSticky] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [isLoadingVisible, setIsLoadingVisible] = useState(true);

  const mockOrder = {
    orderNumber: 'VC-2025-001',
    status: 'in_transit',
    estimatedDelivery: '2025-10-10',
    items: [
      { name: 'Ankara Print Maxi Dress', quantity: 1, size: 'M', price: 999 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2025-10-06 10:30', completed: true, icon: CheckCircle },
      { status: 'Order Confirmed', date: '2025-10-06 11:15', completed: true, icon: CheckCircle },
      { status: 'Processing', date: '2025-10-06 14:00', completed: true, icon: Package },
      { status: 'Shipped', date: '2025-10-07 09:00', completed: true, icon: Truck },
      { status: 'In Transit', date: '2025-10-07 16:30', completed: true, icon: Truck, current: true },
      { status: 'Out for Delivery', date: 'Pending', completed: false, icon: MapPin },
      { status: 'Delivered', date: 'Pending', completed: false, icon: CheckCircle }
    ]
  };

  // Delivery route coordinates (Johannesburg area)
  const deliveryRoute = [
    { lat: -26.107, lng: 28.058 }, // Warehouse (Sandton)
    { lat: -26.112, lng: 28.065 },
    { lat: -26.118, lng: 28.072 },
    { lat: -26.125, lng: 28.080 },
    { lat: -26.132, lng: 28.086 },
    { lat: -26.140, lng: 28.092 }, // Customer location (approx)
  ];

  // Create custom delivery truck icon
  const createTruckIcon = () => {
    return L.divIcon({
      html: `
        <div class="relative">
          <div class="w-8 h-8 bg-red-600 rounded-lg transform rotate-45 relative">
            <div class="absolute -top-1 -left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
            <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
            <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>
      `,
      className: 'truck-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  };

  // Initialize map
  const initMap = () => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView([-26.107, 28.058], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add delivery route polyline
    const routePolyline = L.polyline(deliveryRoute, {
      color: '#B84037',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(mapRef.current);

    // Add start and end markers
    L.marker(deliveryRoute[0]).addTo(mapRef.current)
      .bindPopup('<b>Warehouse</b><br>Dispatch Center')
      .openPopup();

    L.marker(deliveryRoute[deliveryRoute.length - 1]).addTo(mapRef.current)
      .bindPopup('<b>Delivery Address</b><br>123 Main Street, Sandton')
      .openPopup();

    // Add truck marker
    markerRef.current = L.marker(vehiclePosition, { 
      icon: createTruckIcon(),
      zIndexOffset: 1000 
    }).addTo(mapRef.current);

    // Start animation
    animateDelivery();
  };

  // Animate delivery truck
  const animateDelivery = () => {
    let currentIndex = 0;
    const speed = 1000; // ms per segment

    const moveTruck = () => {
      if (currentIndex < deliveryRoute.length - 1) {
        const start = deliveryRoute[currentIndex];
        const end = deliveryRoute[currentIndex + 1];
        const steps = 20;
        let step = 0;

        const moveStep = () => {
          if (step < steps) {
            const progress = step / steps;
            const lat = start.lat + (end.lat - start.lat) * progress;
            const lng = start.lng + (end.lng - start.lng) * progress;
            
            setVehiclePosition({ lat, lng });
            
            if (markerRef.current) {
              markerRef.current.setLatLng([lat, lng]);
            }

            step++;
            setTimeout(moveStep, speed / steps);
          } else {
            currentIndex++;
            setTimeout(moveTruck, 500);
          }
        };

        moveStep();
      } else {
        // Reset animation when reaching destination
        setTimeout(() => {
          currentIndex = 0;
          moveTruck();
        }, 2000);
      }
    };

    moveTruck();
  };

  // Handle scroll to make map sticky and hide loading state
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // When scrolled past 200px, make map sticky
      setIsMapSticky(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use Intersection Observer to hide loading state when map enters viewport
  useEffect(() => {
    if (!loadingRef.current || !orderData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Hide loading state with delay for smooth transition
            setTimeout(() => {
              setIsLoadingVisible(false);
            }, 500);
            
            // Initialize map when it becomes visible
            setTimeout(initMap, 100);
            
            // Disconnect observer after first intersection
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '50px' // Add 50px margin to trigger earlier
      }
    );

    observer.observe(loadingRef.current);

    return () => {
      observer.disconnect();
    };
  }, [orderData]);

  // Cleanup animation
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      setOrderData(mockOrder);
      // Reset loading state when tracking new order
      setIsLoadingVisible(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-50 via-red-50 to-amber-50 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <Package size={48} className="mx-auto mb-4 text-orange-600" />
          <h1 className="text-5xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-black">Enter your tracking number to see your order status</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking or order number (e.g., VC-2025-001)"
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#B84037] hover:from-orange-700 hover:via-red-700 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Track Order
              </button>
            </form>
          </div>

          {orderData && (
            <>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order {orderData.orderNumber}</h2>
                    <p className="text-gray-600">Estimated Delivery: <span className="font-bold text-orange-600">{orderData.estimatedDelivery}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                      {orderData.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">R{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Tracking Map and Timeline Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative">
                {/* Map Section - Takes 2/3 width */}
                <div className="lg:col-span-2">
                  <div 
                    className={`bg-white rounded-xl shadow-lg p-6 h-full transition-all duration-300 ${
                      isMapSticky 
                        ? 'sticky top-20 z-[9999] max-h-[80vh] overflow-auto shadow-2xl' 
                        : 'relative'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                          <Navigation className="text-red-600" />
                          Live Delivery Tracking
                        </h3>
                        <p className="text-gray-600 mt-1">Real-time tracking of your delivery vehicle</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                        <span>ACTIVE • EN ROUTE</span>
                      </div>
                    </div>

                    {/* Map Container */}
                    <div className="relative">
                      <div 
                        ref={mapContainerRef}
                        className={`w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm ${
                          isMapSticky ? 'h-[60vh]' : 'h-96'
                        }`}
                      >
                        {/* Loading state - hides when map enters viewport */}
                        <div 
                          ref={loadingRef}
                          className={`absolute inset-0 bg-gray-100 flex items-center justify-center z-0 transition-opacity duration-300 ${
                            isLoadingVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading live map...</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Map Controls Overlay */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
                        <button 
                          onClick={() => mapRef.current?.setView([-26.107, 28.058], 13)}
                          className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition"
                          title="Reset View"
                        >
                          <Navigation size={20} />
                        </button>
                        {isMapSticky && (
                          <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition"
                            title="Back to Top"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      {/* Vehicle Status Card */}
                      <div className={`absolute ${isMapSticky ? 'bottom-4 left-4 right-4' : 'bottom-4 left-4 right-4'} bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000]`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Current Location</p>
                            <p className="font-bold text-gray-900">
                              {vehiclePosition.lat.toFixed(4)}, {vehiclePosition.lng.toFixed(4)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Next Stop</p>
                            <p className="font-bold text-gray-900">Sandton CBD</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">ETA</p>
                            <p className="font-bold text-orange-600">45-60 min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map Legend */}
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                        <span className="text-sm text-gray-600">Delivery Route</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-4 h-4 bg-red-600 rounded-lg transform rotate-45"></div>
                        <span className="text-sm text-gray-600">Delivery Vehicle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Start/End Points</span>
                      </div>
                    </div>

                    {/* Sticky Map Indicator */}
                    {isMapSticky && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                          <p className="text-sm font-medium text-orange-800">
                            Map is pinned for easier tracking • Scroll to see details below
                          </p>
                        </div>
                        <button 
                          onClick={() => setIsMapSticky(false)}
                          className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                        >
                          Unpin
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Section - Takes 1/3 width */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Timeline</h3>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                      {orderData.timeline.map((event: any, index: number) => {
                        const Icon = event.icon;
                        return (
                          <div key={index} className="relative flex items-start mb-8 last:mb-0">
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                              event.completed
                                ? event.current
                                  ? 'bg-gradient-to-br from-orange-600 to-red-600 ring-4 ring-orange-200'
                                  : 'bg-gradient-to-br from-green-500 to-green-600'
                                : 'bg-gray-300'
                            }`}>
                              <Icon className="text-white" size={24} />
                            </div>
                            <div className="ml-6 flex-1">
                              <h4 className={`font-bold mb-1 ${
                                event.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {event.status}
                              </h4>
                              <p className={`text-sm ${
                                event.completed ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {event.date}
                              </p>
                              {event.current && (
                                <div className="mt-2 inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                                  Current Status
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start gap-4">
                      <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Delivery Address</h4>
                        <p className="text-gray-700">123 Main Street, Sandton</p>
                        <p className="text-gray-700">Johannesburg, 2196</p>
                        <p className="text-gray-700">South Africa</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-start gap-4">
                      <Truck className="text-green-600 flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Delivery Details</h4>
                        <p className="text-gray-700"><strong>Carrier:</strong> VC Express</p>
                        <p className="text-gray-700"><strong>Tracking ID:</strong> VC{Date.now().toString().slice(-10)}</p>
                        <p className="text-gray-700"><strong>Service:</strong> Next Day Priority</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {!orderData && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Clock size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Tracking Number</h3>
              <p className="text-gray-600">Track your order in real-time and see when it will arrive</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}