import {create} from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export interface CartProduct {
  id: string;
  productPrice: string;
  productAmount: number;
  price: string;
  productId: string;
  cartId: string;
  product: Product;
}

export interface CartState {
  id: string;
  total: string;
  isOrdered: boolean;
  userId: string;
  createdAt: string;
  cartProduct: CartProduct[];
}

interface CartStore {
  cart: CartState | null;
  orders: CartState[];
  fetchCart: (token: string) => Promise<void>;
  updateCart: (cart: CartState) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  orders: [],
  updateCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: null }),
  fetchCart: async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/history`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart history');
      }

      const data: CartState[] = await response.json();

      // Find the cart with isOrdered: false
      const activeCart = data.find((cart) => !cart.isOrdered);
      set({ orders: data });

      if (activeCart) {
        set({ cart: activeCart });
        console.log(activeCart, 'active')
      } else {
        console.log('No active cart found.');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  },
}));
