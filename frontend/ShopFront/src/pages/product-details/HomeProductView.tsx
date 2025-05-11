import { useCallback, useEffect, useRef, useState } from "react";
import WaitingLoader from "../../Loaders/WaitingLoader/WaitingLoader";
import { handleAddToCart, handleBuyWhatsApp, swapMainImage } from "./utils/ProductViewHidratation";

import "./HomeProductView.css"
import useProductsDetails from "./utils/useProductsDetails";
import { FaArrowLeft } from "react-icons/fa6";
import HomeCart from "../../components/HomeCart/HomeCart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCartStore } from "../../Stores/cartStore";
function HomeProductView() {
    const setShowCart = useCartStore((state) => state.setShowCart);
    const handleGoToWhatsapp = useCartStore((state) => state.handleGoToWhatsapp)
    const addProductToCart = useCartStore((state) => state.addProductToCart)
    const [productId, setProductId] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 1];
        setProductId(id);
    }, []);
    const [gettingProducts, setGettingProducts] = useState(false);
    const [productHTML, setProductHTML] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    
    const {
        getProductDetails
    } = useProductsDetails()


    const handleGetProduct = async () => {
        setGettingProducts(true);
        const { html } = await getProductDetails(productId || "");
        setGettingProducts(false);
        if (typeof html === "string") setProductHTML(html);
    };

    useEffect(() => {
        if (productId) handleGetProduct();
    }, [productId]);

    const onContainerClick = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const container = containerRef.current!;
      
        if (target.matches(".thumbnail img")) {
          swapMainImage(container, target as HTMLImageElement);
          return;
        }
      
        const addBtn = target.closest<HTMLButtonElement>(".add-to-cart");
        if (addBtn) {
          event.stopImmediatePropagation(); // 👈 importante
          handleAddToCart(addBtn, addProductToCart);
          return;
        }
      
        const whatsappBtn = target.closest<HTMLButtonElement>(".buy-now");
        if (whatsappBtn) {
          handleBuyWhatsApp(whatsappBtn, handleGoToWhatsapp);
          return;
        }
      }, [addProductToCart, handleGoToWhatsapp]);
      useEffect(() => {
        setTimeout(() => {
            const container = containerRef.current;
        if (!container) return;
      
        container.addEventListener("click", onContainerClick);
        return () => {
          container.removeEventListener("click", onContainerClick);
        };
        }, 100);
      }, [onContainerClick]);
      

    return (
        <div className="home-product-view-container">
            <div className="go-back-container">
                <a href="/"><FaArrowLeft color="#59362e"/></a>
            </div>
            <div className="shopping-container" onClick={() => setShowCart(true)}>
                <span><MdOutlineShoppingCart onClick={() => setShowCart(true)} color="#59362e" /></span>
            </div>
            {gettingProducts ? <WaitingLoader /> : (
                <div
                    ref={containerRef}
                    className="product-detail"
                    dangerouslySetInnerHTML={{ __html: productHTML }}
                />
            )}
            <HomeCart />
        </div>
    );
}

export default HomeProductView