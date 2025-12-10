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
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size?: string; color?: string; quantity: number } }
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

const getItemKey = (item: CartItem): string => {
  // Create a unique key combining id, size, and color
  return `${item.id}-${item.size || 'default'}-${item.color || 'default'}`;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItemKey = getItemKey(action.payload);
      const existingItemIndex = state.items.findIndex(item => 
        getItemKey(item) === newItemKey
      );
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Item with same id, size, and color exists - update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
      } else {
        // New item - add to cart
        updatedItems = [...state.items, action.payload];
      }
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      );
      
      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: newItemCount,
        total: newTotal,
      };
    }
    
    case 'REMOVE_ITEM': {
      // action.payload is the item key (id-size-color)
      const updatedItems = state.items.filter(item => 
        getItemKey(item) !== action.payload
      );
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      );
      
      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: newItemCount,
        total: newTotal,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      // Find item by id, size, and color
      const targetKey = `${action.payload.id}-${action.payload.size || 'default'}-${action.payload.color || 'default'}`;
      
      const updatedItems = state.items.map(item => {
        if (getItemKey(item) === targetKey) {
          return {
            ...item,
            quantity: Math.max(1, action.payload.quantity)
          };
        }
        return item;
      });
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
      );
      
      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: newItemCount,
        total: newTotal,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: 0,
        isCartOpen: false,
        showCheckout: false,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        showCheckout: false,
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