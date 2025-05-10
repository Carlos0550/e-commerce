import { useEffect, useRef, useState } from "react";
import WaitingLoader from "../../Loaders/WaitingLoader/WaitingLoader";
import { handleAddToCart, handleBuyWhatsApp, swapMainImage } from "./utils/ProductViewHidratation";

// import { useAppContext } from "../../../../Context/AppContext";
import "./HomeProductView.css"
import useProductsDetails from "./utils/useProductsDetails";
import useCart from "../../components/utils/useCart";
// import HomeCart from "../HomeCart/HomeCart";

function HomeProductView() {
    const [productId, setProductId] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 1]; // asumiendo que es /product/:id
        setProductId(id);
    }, []);
    const [gettingProducts, setGettingProducts] = useState(false);
    const [productHTML, setProductHTML] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    // const { 
    //     productsHook: { getProductDetails },
    //     cartHook
    //  } = useAppContext();

    const {
        getProductDetails
    } = useProductsDetails()
    const {
        showCart, addProductToCart, handleGoToWhatsapp
    } = useCart()

    const handleGetProduct = async () => {
        setGettingProducts(true);
        const html = await getProductDetails(productId || "");
        setGettingProducts(false);
        if (typeof html === "string") setProductHTML(html);
    };

    useEffect(() => {
        if (productId) handleGetProduct();
    }, [productId]);

    const onContainerClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const container = containerRef.current!;

        if (target.matches(".thumbnail img")) {
            swapMainImage(container, target as HTMLImageElement);
            return;
        }

        const addBtn = target.closest<HTMLButtonElement>(".add-to-cart");
        if (addBtn) {
            handleAddToCart(addBtn, addProductToCart);
            return;
        }

        const whatsappBtn = target.closest<HTMLButtonElement>(".buy-now");
        if (whatsappBtn) {
            handleBuyWhatsApp(whatsappBtn, handleGoToWhatsapp);
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
            {/* {!gettingProducts && (
                 <Navbar navbarScrolled={true} />
            )} */}
            {gettingProducts ? <WaitingLoader /> : (
                <div
                    ref={containerRef}
                    className="product-detail"
                    dangerouslySetInnerHTML={{ __html: productHTML }}
                />
            )}
            {/* {cartHook.showCart && <HomeCart />} */}
        </div>
    );
}

export default HomeProductView