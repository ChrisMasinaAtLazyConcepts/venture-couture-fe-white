// contexts/CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
  isCartOpen: boolean;
  showCheckout: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CHECKOUT' }
  | { type: 'CLOSE_CHECKOUT' }
  | { type: 'CLOSE_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newTotal,
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newTotal,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newTotal,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    
    case 'OPEN_CHECKOUT':
      return {
        ...state,
        showCheckout: true,
        isCartOpen: false,
      };
    
    case 'CLOSE_CHECKOUT':
      return {
        ...state,
        showCheckout: false,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false,
      };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
  isCartOpen: false,
  showCheckout: false,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};