import { useEffect, useRef, useState } from "react";
import WaitingLoader from "../../Loaders/WaitingLoader/WaitingLoader";

import "./HomeProductView.css"
import useProductsDetails from "./utils/useProductsDetails";
import { FaArrowLeft } from "react-icons/fa6";
import HomeCart from "../../components/HomeCart/HomeCart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCartStore } from "../../Stores/cartStore";
import { FaCartPlus, FaWhatsapp } from "react-icons/fa";
import { buildPath } from "../../components/utils/PathBuilder";
import type { Products } from "../../components/Types/ProductsTypes";
import { useProductStore } from "../../Stores/productStore";
function HomeProductView() {
    const setShowCart = useCartStore((state) => state.setShowCart);
    const handleGoToWhatsapp = useCartStore((state) => state.handleGoToWhatsapp);
    const addToCart = useCartStore((state) => state.addProductToCart);

    const {
        mainImage,
        setMainImage,
        handleAddToCart: addProductToCart,
    } = useProductStore();

    const [productId, setProductId] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 1];
        setProductId(id);
    }, []);
    const [gettingProducts, setGettingProducts] = useState(false);
    const [productData, setProductData] = useState<Products>({
        product_id: "",
        product_name: "",
        product_description: "",
        product_price: "",
        product_stock: "",
        product_category: "",
        pr_category_name: "",
        product_images: []
    });

    useEffect(() => {
        if (productData.product_images.length > 0) {
            setMainImage(buildPath(productData.product_images[0].path));
        }
    }, [productData]);

    const {
        getProductDetails
    } = useProductsDetails()


    const handleGetProduct = async () => {
        setGettingProducts(true);
        const { product } = await getProductDetails(productId || "");
        setGettingProducts(false);
        if (product) setProductData(product);
    };

    useEffect(() => {
        if (productId) handleGetProduct();
    }, [productId]);

    return (
        <div className="home-product-view-container">
            <div className="go-back-container">
                <a href="/"><FaArrowLeft color="#59362e" /></a>
            </div>
            <div className="shopping-container" onClick={() => setShowCart(true)}>
                <span><MdOutlineShoppingCart onClick={() => setShowCart(true)} color="#59362e" /></span>
            </div>
            {gettingProducts ? <WaitingLoader /> : (
                <div
                    className="product-detail"
                >
                    {productData && (
                        <div className="product-layout">
                            <section className="product-images-section">
                                {productData.product_images.length > 0 && (
                                    <div className="main-image-wrapper">
                                        <img
                                            src={mainImage ?? ""}
                                            alt={productData.product_name}
                                            className="main-product-image"
                                        />

                                    </div>
                                )}
                                <div className="thumbnail-gallery">
                                    {productData.product_images.slice(1).map((image, i) => (
                                        <figure key={i} className="product-image-wrapper thumbnail">
                                            <img
                                                src={buildPath(image.path)}
                                                alt={`${productData.product_name} miniatura ${i + 1}`}
                                                className="product-image"
                                                onClick={() => setMainImage(buildPath(image.path))}
                                            />

                                        </figure>
                                    ))}
                                </div>
                            </section>

                            <header className="product-header">
                                <h1 className="product-title">{productData.product_name}</h1>
                                <p className="product-price">${productData.product_price}</p>
                                <div className="product-actions">
                                    <button
                                        className="add-to-cart"
                                        onClick={() => addProductToCart(productData.product_id, addToCart)}
                                    >
                                        Agregar al <FaCartPlus />
                                    </button>
                                    <button
                                        className="buy-now"
                                        onClick={() => handleGoToWhatsapp(productData.product_name)}
                                    >
                                        Comprar directamente <FaWhatsapp size={20} />
                                    </button>

                                </div>
                                <section className="product-info-section">
                                    <div
                                        className="product-description"
                                        dangerouslySetInnerHTML={{
                                            __html: productData.product_description,
                                        }}
                                    ></div>
                                </section>
                            </header>
                        </div>
                    )}

                </div>
            )}
            <HomeCart />
        </div>
    );
}

export default HomeProductView