import { create } from "zustand";
import { getServiceUrl } from "../components/utils/GlobalAPIs";
import type { Products } from "../components/Types/ProductsTypes";
import { toast } from 'sonner'
interface ProductState {
  allProducts: Products[];
  products: Products[];
  setProducts: (products: Products[]) => void;
  gettingProducts: boolean;
  getProducts: () => Promise<boolean>;
  mainImage: string | null;
  setMainImage: (src: string) => void;
  handleAddToCart: (productId: string, addToCart: (id: string, qty: number) => void) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  allProducts: [],
  products: [],
  gettingProducts: false,
  setProducts: (products) => set({ products }),
  mainImage: null,
  setMainImage: (src: string) => set({ mainImage: src }),

  handleAddToCart: (productId, addToCart) => {
    addToCart(productId, 1);
  },

  getProducts: async () => {
    const url = new URL(`${getServiceUrl("products")}get-products`);
    try {
      set({ gettingProducts: true });

      const response = await fetch(url);
      const data = await response.json();
      if (response.status === 404) {
        set({ products: [] });
        return false;
      }

      if (!response.ok) throw new Error(data.msg || "Error desconocido");

      set({ allProducts: data.products, products: data.products });
      return true;
    } catch (error) {
      if (error instanceof TypeError) return false;
      console.log(error);
      toast.success("Error al obtener los productos", { duration: 3000 });
      return false;
    } finally {
      set({ gettingProducts: false });
    }
  },
}));
