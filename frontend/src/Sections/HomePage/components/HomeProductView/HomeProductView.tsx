import { useParams } from "react-router-dom"
import "./HomeProductView.css"
import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../../../../Context/AppContext"
import Navbar from "../Navbar/Navbar"
import WaitingLoader from "../../../../Loaders/WaitingLoader/WaitingLoader"


function HomeProductView() {
    const { product_id } = useParams();
    const [gettingProducts, setGettingProducts] = useState(false);
    const [productHTML, setProductHTML] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);

    const { productsHook: { getProductDetails } } = useAppContext();

    const handleGetProduct = async () => {
        setGettingProducts(true);
        const html = await getProductDetails(product_id || "");
        setGettingProducts(false);
        if (typeof html === "string") setProductHTML(html);
    };

    useEffect(() => {
        if (product_id) handleGetProduct();
    }, [product_id]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.matches(".thumbnail img")) {
                const mainImg = container.querySelector<HTMLImageElement>(".main-product-image");
                if (mainImg) {
                    mainImg.src = (target as HTMLImageElement).src;
                }
            }
        };

        container.addEventListener("click", onClick);
        return () => {
            container.removeEventListener("click", onClick);
        };
    }, [productHTML]);




    return (
        <div className="home-product-view-container">
            {!gettingProducts && (
                <div className="home-navbar-container">
                    <Navbar navbarScrolled={true} />
                </div>
            )}
            {gettingProducts ? <WaitingLoader /> : (
                <div
                    ref={containerRef}
                    className="product-detail"
                    dangerouslySetInnerHTML={{ __html: productHTML }}
                />
            )}
        </div>
    )
}

export default HomeProductView
