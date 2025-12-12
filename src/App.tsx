import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import ProductManagement from './pages/ProductManagement';
import OrderTracking from './pages/OrderTracking';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage'; 
import MensPage from './pages/MensPage'; MensPage
import WomensPage from './pages/WomensPage'; 
import AccessoriesPage from './pages/AccessoriesPage'; 
import ManagePromotionsPage from './pages/ManagePromotionsPage'; 
import CheckoutPage from './pages/CheckoutPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import AdminLayout from './components/AdminLayout';
import RefundsAndReturnsPage from './pages/RefundsAndReturnsPage';
import AdminLoginPage from './pages/AdminLoginPage'; 
import InventoryManagementPage from './pages/InventoryManagementPage';
import SupportCentrePage from './pages/SupportCentrePage'; 
import NewArrivalsPage from './pages/NewArrivalsPage';
import LocalPage from './pages/LocalPage';
import AdvertisingPage from './pages/AdvertisingPage';
import PastPurchachesPage from './pages/PastPurchachesPage';
import OrderFulfilmentPage from './pages/OrderFulfilmentPage';
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
	 const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
    {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
         <Route path="/admin-dashboard" element={<AnalyticsDashboardPage />} />
         <Route path="/mens" element={<MensPage />} />
         <Route path="/womens" element={<WomensPage />} />
         <Route path="/new" element={<NewArrivalsPage />} />
         <Route path="/collections" element={<LocalPage />} />
         <Route path="/admin/orders" element={<OrderFulfilmentPage />} />
         <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/admin-layout" element={<AdminLayout />} />
          <Route path="/support-center" element={<SupportCentrePage />} />
          <Route path="/admin/inventory" element={<InventoryManagementPage />} />
          <Route path="/admin/supply-chain" element={<InventoryManagementPage />} />
          <Route path="/admin/advertising" element={<AdvertisingPage />} />
          <Route path="/manage-promotions" element={<ManagePromotionsPage />} />
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>
{!isAdminRoute && <Footer />}
      <CartModal /> 
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
  </CartProvider>
  );
}

export default App;