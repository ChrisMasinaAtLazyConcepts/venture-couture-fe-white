import FeaturedProducts from '../components/FeaturedProducts';
import CategoryShowcase from '../components/CategoryShowcase';
import Features from '../components/Features';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import { useCart } from '../contexts/CartContext';

const HomePage: React.FC = () => {
  const { state } = useCart();
  
  return (
    <div className={`${state.itemCount > 0 ? 'pb-20' : ''}`}>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
};

export default HomePage;

