import { create } from "zustand";
import { getServiceUrl } from "../components/utils/GlobalAPIs";
import type { Products } from "../components/Types/ProductsTypes";
import { toast } from 'sonner'

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasMore: boolean;
  limit: number;
}

interface ProductState {
  products: Products[];
  setProducts: (products: Products[]) => void;
  gettingProducts: boolean;
  getProducts: () => Promise<boolean>;
  getProductsPaginated: (page?: number, limit?: number, filters?: { search?: string; category?: string }) => Promise<boolean>;
  pagination: PaginationInfo | null;
  loadingMore: boolean;
  mainImage: string | null;
  setMainImage: (src: string) => void;
  handleAddToCart: (productId: string, addToCart: (id: string, qty: number) => void) => void;
  resetPagination: () => void;
  filteredProducts: Products[];
  setFilteredProducts: (products: Products[]) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  gettingProducts: false,
  loadingMore: false,
  pagination: null,
  setProducts: (products) => set({ products }),
  setFilteredProducts: (products) => set({ filteredProducts: products }),
  mainImage: null,
  setMainImage: (src: string) => set({ mainImage: src }),

  handleAddToCart: (productId, addToCart) => {
    addToCart(productId, 1);
  },

  resetPagination: () => {
    set({ products: [], filteredProducts: [], pagination: null });
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

      set({ products: data.products, filteredProducts: data.products });
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

  getProductsPaginated: async (page = 1, limit = 10, filters = {}) => {
    const url = new URL(`${getServiceUrl("products")}get-products-paginated`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    
    // Agregar filtros si existen
    if (filters.search) {
      url.searchParams.append('search', filters.search);
    }
    if (filters.category) {
      url.searchParams.append('category', filters.category);
    }

    try {
      if (page === 1) {
        set({ gettingProducts: true });
      } else {
        set({ loadingMore: true });
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (response.status === 404) {
        if (page === 1) {
          set({ products: [], filteredProducts: [], pagination: null });
        }
        return false;
      }

      if (!response.ok) throw new Error(data.msg || "Error desconocido");

      if (page === 1) {
        set({ 
          products: data.products, 
          filteredProducts: data.products,
          pagination: data.pagination
        });
      } else {
        const currentProducts = get().products;
        const newProducts = [...currentProducts, ...data.products];
        set({ 
          products: newProducts,
          filteredProducts: newProducts,
          pagination: data.pagination
        });
      }
      
      return true;
    } catch (error) {
      if (error instanceof TypeError) return false;
      console.log(error);
      toast.error("Error al cargar más productos", { duration: 3000 });
      return false;
    } finally {
      set({ gettingProducts: false, loadingMore: false });
    }
  },
}));
