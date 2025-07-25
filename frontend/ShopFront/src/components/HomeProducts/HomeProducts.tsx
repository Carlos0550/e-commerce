import React, { useEffect, useState, useCallback, useRef } from "react"
import "./HomeProducts.css"
import { Flex, Skeleton } from "@mantine/core"
import ProductsCard from "./ProductsCard/ProductsCard"

import EmptyStockPC from "./assets/EmptyStockPC.webp"
import EmptyStockMobile from "./assets/EmptyStockMobile.webp"
import { useProductStore } from "../../Stores/productStore"

function HomeProducts() {
    const products = useProductStore((state) => state.products);
    const gettingProducts = useProductStore((state) => state.gettingProducts);
    const loadingMore = useProductStore((state) => state.loadingMore);
    const pagination = useProductStore((state) => state.pagination);
    const getProductsPaginated = useProductStore((state) => state.getProductsPaginated);
    const resetPagination = useProductStore((state) => state.resetPagination);
    
    const [width, setWidth] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            const res = () => setWidth(window.innerWidth)
            res()
            window.addEventListener("resize", res)
            return () => window.removeEventListener("resize", res)
        }, 500);
    }, [])

    // Cargar productos iniciales
    useEffect(() => {
        resetPagination();
        setCurrentPage(1);
        getProductsPaginated(1, 10);
    }, []);

    // Configurar Intersection Observer para scroll infinito
    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (gettingProducts || loadingMore) return;
        
        if (observerRef.current) observerRef.current.disconnect();
        
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && pagination?.hasMore) {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                getProductsPaginated(nextPage, 10);
            }
        });
        
        if (node) observerRef.current.observe(node);
    }, [gettingProducts, loadingMore, pagination?.hasMore, currentPage, getProductsPaginated]);

    // Limpiar observer al desmontar
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div className='home-products-container'>
            {gettingProducts ? (
                <Flex gap={"md"} wrap="wrap" justify={"space-evenly"} align={"center"} p={"md"}>
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                </Flex>
            ) : !gettingProducts && products && products.length > 0 ? (
                <React.Fragment>
                    {products.map((product, index) => {
                        // Si es el último elemento, agregar la referencia para el observer
                        if (products.length === index + 1) {
                            return (
                                <div key={product.product_id} ref={lastElementRef}>
                                    <ProductsCard
                                        product_images={product.product_images}
                                        product_name={product.product_name}
                                        product_price={product.product_price}
                                        product_id={product.product_id}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <ProductsCard
                                    key={product.product_id}
                                    product_images={product.product_images}
                                    product_name={product.product_name}
                                    product_price={product.product_price}
                                    product_id={product.product_id}
                                />
                            );
                        }
                    })}
                    
                    {/* Indicador de carga para más productos */}
                    {loadingMore && (
                        <div ref={loadingRef} style={{ width: '100%', textAlign: 'center', padding: '20px' }}>
                            <Flex gap={"md"} wrap="wrap" justify={"center"} align={"center"}>
                                <Skeleton animate height={200} width={200} />
                                <Skeleton animate height={200} width={200} />
                                <Skeleton animate height={200} width={200} />
                            </Flex>
                            <div className="loading-more-text">Cargando más productos...</div>
                        </div>
                    )}
                    
                    {/* Mensaje cuando no hay más productos */}
                    {!loadingMore && !gettingProducts && pagination && !pagination.hasMore && products.length > 0 && (
                        <div className="loading-more-container">
                            <div className="loading-more-text">
                                ¡Has visto todos los productos disponibles! 🎉
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <picture className="empty-stock-container">
                    <img src={width > 768 ? EmptyStockPC.src : EmptyStockMobile.src} alt="" />
                </picture>
            )}
        </div>
    )
}

export default HomeProducts
