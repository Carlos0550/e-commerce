import { useEffect, useRef, useState } from "react"
import "./HomeCart.css"
import { FaMinus, FaPlus, FaTrash, FaWhatsapp } from "react-icons/fa"
import { useCartStore } from "../../Stores/cartStore";
import { toast } from "sonner";

function HomeCart() {

    const showCart = useCartStore((state) => state.showCart);
    const cart = useCartStore((state) => state.cart);
    const totalCart = useCartStore((state) => state.totalCart);
    const setShowCart = useCartStore((state) => state.setShowCart);
    const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);
    const setOneProductQuantity = useCartStore((state) => state.setOneProductQuantity);
    const removeOneProductQuantity = useCartStore((state) => state.removeOneProductQuantity);
    const setCart = useCartStore((state) => state.setCart);
    const cartRef = useRef<HTMLDivElement>(null);

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showGreeting, setShowGreeting] = useState(false)
    const handleConfirmPurchase = () => {
        setShowGreeting(true);

        setCart([]);
        setTimeout(() => {
            setShowConfirmation(false);
            setShowGreeting(false);
            setShowCart(false);
        }, 1500);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (cartRef.current && !cartRef.current.contains(target)) {
                setShowCart(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowCart]);

    const handleFinishPurchase = () => {
        const number = "+5403764757599";
        const greeting = "Hola! Tengo estos productos en mi carrito de compras:\n\n";

        if (cart.length === 0) {
            
            toast.warning("Carrito vacío",{
                position: "top-right",
                description: "Agrega productos antes de finalizar la compra",
                duration: 3000
            })
            return;
        }

        const items = cart.map((item, index) => {
            return `${index + 1}. x${item.product_quantity} ${item.product_name} - $${item.product_price}`;
        }).join("\n");

        const totalLine = `\n\nTotal: $${totalCart}.\n Aguardo tu respuesta para finalizar mi compra!`;
        const fullMessage = greeting + items + totalLine;
        setShowConfirmation(true);
        const encodedMessage = encodeURIComponent(fullMessage);
        const url = `https://wa.me/${number}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };
    useEffect(() => {
    console.log("En HomeCart: ", showCart)  
    },[showCart])
    return (
        <div ref={cartRef} className={showCart ? "home-cart opened" : "home-cart closed"}>
            <h2>Retoma desde donde lo dejaste</h2>
            <div className="cart-items">
                {cart && cart.length > 0
                    ? cart.map((c) => (
                        <div className="cart-item" key={c.product_id}>
                            <picture className="cart-item-image">
                                <img
                                    src={c.product_images}
                                    alt={`${c.product_id}-image`}
                                />
                            </picture>
                            <div className="cart-item-info">
                                <h3>{c.product_name}</h3>
                                <p>{c.product_price} | {c.product_quantity} unidad/es</p>
                                <div className="cart-item-actions">
                                    <button
                                        className="cart-item-remove"
                                        onClick={() => removeProductFromCart(c.product_id)}
                                    >
                                        <FaTrash />
                                    </button>

                                    <button
                                        className="cart-item-quantity"
                                        onClick={() => setOneProductQuantity(c.product_id)}
                                    >
                                        <FaPlus />
                                    </button>

                                    <button
                                        className="cart-item-quantity"
                                        onClick={() => removeOneProductQuantity(c.product_id)}
                                    >
                                        <FaMinus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    : <></>
                }
                <div className="cart-info">
                    {showConfirmation
                        ? (
                            <div >
                                {showGreeting ? (
                                    <>
                                        <p className="cart-greeting">Muchas gracias por tu compra!</p>
                                    </>
                                ) : (
                                    <>
                                        <p>¿Confirmaste la compra?</p>
                                        <div className="cart-confirmation">
                                            <button className="confirm-purchase" onClick={handleConfirmPurchase} color="green">Si</button>
                                            <button className="cancel-purchase" onClick={() => setShowConfirmation(false)} color="red">No</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                        : (
                            <div className="cart-total-container">
                                <p className="cart-total">Total: {totalCart.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
                                <button className="finish-purchase" onClick={() => handleFinishPurchase()}><FaWhatsapp size={25}/> Terminar compra</button>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>

    )
}

export default HomeCart
