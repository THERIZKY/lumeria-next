import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MENU_ITEMS as DEFAULT_MENU_ITEMS, type MenuItem } from "@/data/menu";

interface MenuStore {
  items: MenuItem[];
  setItems: (items: MenuItem[]) => void;
  addItem: (item: MenuItem) => void;
  updateItem: (id: string, updates: Partial<MenuItem>) => void;
  removeItem: (id: string) => void;
  resetToDefault: () => void;
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      items: DEFAULT_MENU_ITEMS,
      setItems: (items) => set({ items }),
      addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.ID === id ? { ...item, ...updates } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.ID !== id),
        })),
      resetToDefault: () => set({ items: DEFAULT_MENU_ITEMS }),
    }),
    {
      name: "lumeria-menu",
    }
  )
);
