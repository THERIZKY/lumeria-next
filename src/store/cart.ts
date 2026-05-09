import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface MenuItem {
  ID: string;
  Name: string;
  Price: number;
  Image: string;
  Category: string;
  Description?: string;
  Rating?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  topping?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateTopping: (id: string, topping: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.ID === item.ID);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.ID === item.ID ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.ID !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.ID !== id),
            };
          }
          return {
            items: state.items.map((item) =>
              item.ID === id ? { ...item, quantity } : item
            ),
          };
        });
      },
      updateTopping: (id, topping) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.ID === id ? { ...item, topping } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.Price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'lumeria-cart',
    }
  )
);
