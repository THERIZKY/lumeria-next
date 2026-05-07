import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart";

export interface Order {
  orderID: string;
  customerName: string;
  paymentMethod: string;
  items: CartItem[];
  totalAmount: number;
  orderTime: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Omit<Order, "status">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  removeOrder: (orderId: string) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [{ ...order, status: "pending" as const }, ...state.orders],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderID === orderId ? { ...o, status } : o
          ),
        })),
      removeOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.orderID !== orderId),
        })),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "lumeria-orders",
    }
  )
);
