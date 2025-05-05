import { useEffect, useRef, useState } from "react";
import WaitingLoader from "../../../../Loaders/WaitingLoader/WaitingLoader";
import Navbar from "../Navbar/Navbar";
import { handleAddToCart, handleBuyWhatsApp, swapMainImage } from "./utils/ProductViewHidratation";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../../Context/AppContext";
import "./HomeProductView.css"
import HomeCart from "../HomeCart/HomeCart";

function HomeProductView() {
    const { product_id } = useParams();
    const [gettingProducts, setGettingProducts] = useState(false);
    const [productHTML, setProductHTML] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const { 
        productsHook: { getProductDetails },
        cartHook
     } = useAppContext();

    const handleGetProduct = async () => {
        setGettingProducts(true);
        const html = await getProductDetails(product_id || "");
        setGettingProducts(false);
        if (typeof html === "string") setProductHTML(html);
    };

    useEffect(() => {
        if (product_id) handleGetProduct();
    }, [product_id]);

    const onContainerClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const container = containerRef.current!;

        if (target.matches(".thumbnail img")) {
            swapMainImage(container, target as HTMLImageElement);
            return;
        }

        const addBtn = target.closest<HTMLButtonElement>(".add-to-cart");
        if (addBtn) {
            handleAddToCart(addBtn, cartHook.addProductToCart);
            return;
        }

        const whatsappBtn = target.closest<HTMLButtonElement>(".buy-now");
        if (whatsappBtn) {
            handleBuyWhatsApp(whatsappBtn, cartHook.handleGoToWhatsapp);
            return;
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener("click", onContainerClick);
        return () => container.removeEventListener("click", onContainerClick);
    }, [productHTML]);

    return (
        <div className="home-product-view-container">
            {!gettingProducts && (
                 <Navbar navbarScrolled={true} />
            )}
            {gettingProducts ? <WaitingLoader /> : (
                <div
                    ref={containerRef}
                    className="product-detail"
                    dangerouslySetInnerHTML={{ __html: productHTML }}
                />
            )}
            {cartHook.showCart && <HomeCart />}
        </div>
    );
}

export default HomeProductView