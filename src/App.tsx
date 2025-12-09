import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import ProductManagement from './pages/ProductManagement';
import OrderTracking from './pages/OrderTracking';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import ProductSearch from './pages/ProductSearch';
import Sale from './pages/Sale';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider } from './contexts/CartContext'; // Make sure this path is correct
import CartFooter from './components/CartFooter';

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <CheckoutModal />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
    <Router>
        <AppContent />
    </Router>
      <CartFooter />
  </CartProvider>
  );
}

export default App;