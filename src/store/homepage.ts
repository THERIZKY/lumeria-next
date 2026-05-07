import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  marqueeTexts: string[];
  featuredItemIds: string[];
  testimonials: {
    id: string;
    text: string;
    name: string;
    role: string;
  }[];
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  preOrderText: string;
  preOrderSchedule: string;
}

const DEFAULT_CONTENT: HomepageContent = {
  heroTitle: "Sweetness in every bite",
  heroSubtitle:
    "Nikmati donat lembut, piscok lumer, es lumut segar, dan rice bowl lezat dalam satu tempat.",
  heroImage: "/img/donat_bg.png.png",
  marqueeTexts: [
    "Sweetness in every bite",
    "Lumer di mulut, manis di hati",
    "Grab your favorite lumer treats now",
    "Dibuat dengan cinta untuk harimu yang sibuk",
    "Free wi-fi inside. Stay as long as you like.",
  ],
  featuredItemIds: ["donat-box", "es-lumut-original", "piscok-box"],
  testimonials: [
    {
      id: "1",
      text: "Donat Lumeria beneran lembut banget! Setiap gigitan lumer di mulut. Ini jadi camilan favorit saya setiap pagi.",
      name: "Shafwan N.",
      role: "Mahasiswa",
    },
    {
      id: "2",
      text: "Es Lumut-nya segar banget, apalagi di cuaca panas. Harganya juga terjangkau untuk kantong mahasiswa!",
      name: "Khalisa R.",
      role: "Mahasiswa",
    },
    {
      id: "3",
      text: "Rice Bowl ayam mentega-nya juara! Porsinya pas, bumbu gurih dan creamy. Pasti balik lagi!",
      name: "Sultan M.",
      role: "Mahasiswa",
    },
  ],
  features: [
    {
      id: "1",
      title: "Bahan Pilihan Berkualitas",
      description:
        "Setiap produk dibuat dari bahan-bahan segar pilihan yang berkualitas tinggi.",
      icon: "leaf",
    },
    {
      id: "2",
      title: "Dibuat dengan Cinta",
      description:
        "Proses pembuatan yang higienis dan penuh perhatian di setiap detail.",
      icon: "heart",
    },
    {
      id: "3",
      title: "Harga Terjangkau",
      description:
        "Nikmat tanpa bikin kantong bolong. Cocok untuk semua kalangan.",
      icon: "wallet",
    },
  ],
  preOrderText: "PRE - ORDER TIME",
  preOrderSchedule: "EVERY TUESDAY - FRIDAY",
};

interface HomepageStore {
  content: HomepageContent;
  updateContent: (content: Partial<HomepageContent>) => void;
  resetContent: () => void;
}

export const useHomepageStore = create<HomepageStore>()(
  persist(
    (set) => ({
      content: DEFAULT_CONTENT,
      updateContent: (updates) =>
        set((state) => ({
          content: { ...state.content, ...updates },
        })),
      resetContent: () => set({ content: DEFAULT_CONTENT }),
    }),
    {
      name: "lumeria-homepage",
    }
  )
);
