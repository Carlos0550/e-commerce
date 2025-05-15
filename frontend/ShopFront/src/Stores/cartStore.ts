import { create } from "zustand";
import { buildPath } from "../components/utils/PathBuilder";
import type { Cart } from "../components/Types/CartTypes";
import { useProductStore } from "./productStore";
import { toast } from "sonner";

interface CartState {
  showCart: boolean;
  setShowCart: (value: boolean) => void;

  cart: Cart[];
  setCart: (items: Cart[]) => void;

  totalCart: number;

  addProductToCart: (product_id: string) => Promise<boolean>;
  removeProductFromCart: (product_id: string) => void;
  setOneProductQuantity: (product_id: string) => void;
  removeOneProductQuantity: (product_id: string) => void;

  handleGoToWhatsapp: (product_id: string) => void;
}

const handleGetTotalCart = (cart: Cart[]) => {
  const total = cart.reduce((acc, item) => {
    return acc + parseFloat(item.product_price) * item.product_quantity;
  }, 0);
  return total;
};

export const useCartStore = create<CartState>((set, get) => ({
  showCart: false,
  setShowCart: (value) => set({ showCart: value }),

  cart: (() => {
    try {
      const saved = localStorage.getItem("cart");
      const parsed = saved ? JSON.parse(saved) : [];
      const total = parsed.reduce((acc:any, item:any) => acc + parseFloat(item.product_price) * item.product_quantity, 0);
      // seteás ambos de una
      setTimeout(() => set({ totalCart: total }), 100); 
      return parsed;
    } catch {
      return [];
    }
  })(),
  

  setCart: (items) => {
    set({ cart: items });
    localStorage.setItem("cart", JSON.stringify(items));
    // actualizar totalCart
    const total = items.reduce((acc, item) => {
      return acc + parseFloat(item.product_price) * item.product_quantity;
    }, 0);
    set({ totalCart: total });
  },

  totalCart: 0,

  addProductToCart: async (product_id) => {
    const productStore = useProductStore.getState();
  
    if (productStore.products.length === 0) {
      const success = await productStore.getProducts();
      if (!success) {
        toast.error("No se pudieron cargar los productos");
        return false;
      }
    }
  
    const products = useProductStore.getState().products;
    const prod = products.find((p) => p.product_id === product_id);
    if (!prod) {
      toast.error("El producto no existe", {
        duration: 3000,
        description: "El producto que intentas agregar no existe",
      });
      return false;
    }
  
    const cart = get().cart;
    const exists = cart.find((item) => item.product_id === product_id);
  
    let updatedCart;
  
    if (exists) {
      updatedCart = cart.map((item) =>
        item.product_id === product_id
          ? { ...item, product_quantity: item.product_quantity + 1 }
          : item
      );
    } else {
      const firstImg = prod.product_images.path;
      const imageUrl = firstImg ? buildPath(firstImg) : "";
      const newItem: Cart = {
        product_id: prod.product_id,
        product_name: prod.product_name,
        product_price: prod.product_price,
        product_quantity: 1,
        product_stock: prod.product_stock,
        product_images: imageUrl,
      };
      updatedCart = [...cart, newItem];
    }
  
    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    const total = updatedCart.reduce(
      (acc, item) => acc + parseFloat(item.product_price) * item.product_quantity,
      0
    );
    set({ totalCart: total });
  
    toast.success("Producto agregado al carrito", {
      duration: 3000,
      description: `El producto ${prod.product_name} se agregó al carrito`,
    });
  
    return true;
  },

  removeProductFromCart: (product_id) => {
    const updated = get().cart.filter((item) => item.product_id !== product_id);
    set({ cart: updated });
    localStorage.setItem("cart", JSON.stringify(updated));
    const total = updated.reduce((acc, item) => acc + parseFloat(item.product_price) * item.product_quantity, 0);
    set({ totalCart: total });
  },

  setOneProductQuantity: (product_id) => {
    const updated = get().cart.map((item) =>
      item.product_id === product_id
        ? { ...item, product_quantity: item.product_quantity + 1 }
        : item
    );
    set({ cart: updated });
    localStorage.setItem("cart", JSON.stringify(updated));
    const total = updated.reduce((acc, item) => acc + parseFloat(item.product_price) * item.product_quantity, 0);
    set({ totalCart: total });
  },

  removeOneProductQuantity: (product_id) => {
    const updated = get().cart
      .map((item) =>
        item.product_id === product_id
          ? { ...item, product_quantity: item.product_quantity - 1 }
          : item
      )
      .filter((item) => item.product_quantity > 0);

    set({ cart: updated });
    localStorage.setItem("cart", JSON.stringify(updated));
    const total = updated.reduce((acc, item) => acc + parseFloat(item.product_price) * item.product_quantity, 0);
    set({ totalCart: total });
  },

  handleGoToWhatsapp: (product_name) => {
    
    const message = `Hola! Me interesa el producto ${product_name}. ¿Sigue disponible?`;
    const number = "5403764757599";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  },
}));
