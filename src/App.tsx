import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import ProductManagement from './pages/ProductManagement';
import OrderTracking from './pages/OrderTracking';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import RefundsAndReturnsPage from './pages/RefundsAndReturnsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PastPurchachesPage from './pages/PastPurchachesPage';
import InvoicesPage from './pages/InvoicesPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProductSearch from './pages/ProductSearch';
import Sale from './pages/Sale';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider } from './contexts/CartContext'; // Make sure this path is correct
import CartFooter from './components/CartFooter';
import CartModal from './components/CartModal';
import PromoVideo from './components/PromoVideo';


function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/orders" element={<PastPurchachesPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/returns" element={<RefundsAndReturnsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>
      <Footer />
      <CartModal /> 
      <CheckoutModal />
      <PromoVideo />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
    <Router>
        <AppContent />
    </Router>
  </CartProvider>
  );
}

export default App;