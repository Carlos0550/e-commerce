import { useCallback, useEffect, useMemo, useState } from 'react'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { Products } from './ContextTypes/ProductTypes'
import { showNotification } from '@mantine/notifications'
import { Cart } from './ContextTypes/CartTypes'

function useCart(loginData: LoginDataState, products: Products[], pathBuilder: (productPath: string) => string) {

    const [showCart, setShowCart] = useState(false)
    const [cart, setCart] = useState<Cart[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addProductToCart = useCallback(
        (product_id: string) => {
            const prod = products.find((p) => p.product_id === product_id);
            if (!prod) {
                showNotification({
                    title: 'Ups, ese producto no existe',
                    message: 'Recarga la página e intenta de nuevo.',
                    color: 'red',
                    position: 'top-right',
                    autoClose: 4000,
                });
                return false;
            }

            setCart((prev) => {
                const exists = prev.find((item) => item.product_id === product_id);
                if (exists) {
                    return prev.map((item) =>
                        item.product_id === product_id
                            ? { ...item, product_quantity: item.product_quantity + 1 }
                            : item
                    );
                } else {
                    const firstImg = prod.product_images.path;
                    const imageUrl = firstImg ? pathBuilder(firstImg) : '';
                    const newItem: Cart = {
                        product_id: prod.product_id,
                        product_name: prod.product_name,
                        product_price: prod.product_price,
                        product_quantity: 1,
                        product_stock: prod.product_stock,
                        product_images: imageUrl,
                    };
                    return [...prev, newItem];
                }
            });

            showNotification({
                title: 'Producto agregado',
                message: `${prod.product_name} se agregó al carrito`,
                color: 'green',
                position: 'top-right',
                autoClose: 2000,
            });

            return true;
        },
        [products, pathBuilder]
    );

    const removeProductFromCart = useCallback((product_id: string) => {
        setCart((prev) => prev.filter((item) => item.product_id !== product_id));
    }, []);

    const setOneProductQuantity = useCallback((product_id: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.product_id === product_id
                    ? { ...item, product_quantity: item.product_quantity + 1 }
                    : item
            )
        );
    }, []);

    const removeOneProductQuantity = useCallback((product_id: string) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.product_id === product_id
                        ? { ...item, product_quantity: item.product_quantity - 1 }
                        : item
                )
                .filter((item) => item.product_quantity > 0)
        );
    }, []);

    const handleGoToWhatsapp = useCallback(
        (product_id: string) => {
            const prod = products.find((p) => p.product_id === product_id);
            const message = `Hola! Me interesa el producto ${prod?.product_name}. ¿Sigue disponible?`;
            const number = '5403764757599';
            window.open(
                `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
                '_blank'
            );
        },
        [products]
    );

    const [totalCart, setTotalCart] = useState(0); 
    const handleGetTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total += parseFloat(item.product_price) * parseInt(item.product_quantity.toString());
        });
        setTotalCart(total);
        return;
    }

    useEffect(()=>{
        const timeout = setTimeout(() => {
            handleGetTotal()
        }, 100);

        return () => clearTimeout(timeout);
    },[cart])

    return useMemo(() => ({
        cart, setCart, setShowCart, showCart, addProductToCart,
        handleGoToWhatsapp, removeProductFromCart, setOneProductQuantity, removeOneProductQuantity,
        totalCart
    }), [
        cart, setCart, showCart, setShowCart, addProductToCart,
        handleGoToWhatsapp, removeProductFromCart, setOneProductQuantity, removeOneProductQuantity,
        totalCart
    ])
}

export default useCart
