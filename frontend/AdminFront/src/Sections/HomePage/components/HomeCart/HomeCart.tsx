import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../../../../Context/AppContext"
import "./HomeCart.css"
import { Button, Flex } from "@mantine/core"
import { FaMinus, FaPlus, FaTrash, FaWhatsapp } from "react-icons/fa"
import { showNotification } from "@mantine/notifications"
function HomeCart() {
    const {
        cartHook: {
            showCart, cart, setShowCart,
            removeProductFromCart,
            removeOneProductQuantity,
            setOneProductQuantity,
            totalCart, setCart
        }
    } = useAppContext()
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
            showNotification({
                title: "Carrito vacío",
                message: "Agregá productos antes de finalizar la compra",
                color: "yellow",
                position: "top-right",
            });
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
                                    <Button
                                        size="xs"
                                        color="red"
                                        variant="white"
                                        onClick={() => removeProductFromCart(c.product_id)}
                                    >
                                        <FaTrash />
                                    </Button>

                                    <Button
                                        size="xs"
                                        variant="white"
                                        onClick={() => setOneProductQuantity(c.product_id)}
                                    >
                                        <FaPlus />
                                    </Button>

                                    <Button
                                        size="xs"
                                        variant="white"
                                        color="red"
                                        onClick={() => removeOneProductQuantity(c.product_id)}
                                    >
                                        <FaMinus />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                    : <></>
                }
                <div className="cart-info">
                    {showConfirmation
                        ? (
                            <Flex justify="center" align="center" gap="xs" direction="column">
                                {showGreeting ? (
                                    <>
                                        <p className="cart-greeting">Muchas gracias por tu compra!</p>
                                    </>
                                ) : (
                                    <>
                                    <p>¿Confirmaste la compra?</p>
                                <Flex gap="md">
                                    <Button onClick={handleConfirmPurchase} color="green">Si</Button>
                                    <Button onClick={() => setShowConfirmation(false)} color="red">No</Button>
                                </Flex>
                                    </>
                                )}
                            </Flex>
                        )
                        : (
                            <>
                                <p className="cart-total">Total: {totalCart.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
                                <Button color="green" leftSection={<FaWhatsapp size={25} />} onClick={() => handleFinishPurchase()}>Terminar compra</Button>
                            </>
                        )
                    }
                </div>
            </div>

        </div>

    )
}

export default HomeCart
