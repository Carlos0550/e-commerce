import React from "react"
import { useAppContext } from "../../../../../Context/AppContext"
import "./HomeProducts.css"
import { Flex, Skeleton } from "@mantine/core"
import ProductsCard from "./ProductsCard/ProductsCard"

import EmptyStockPC from "./assets/EmptyStockPC.webp"
import EmptyStockMobile from "./assets/EmptyStockMobile.webp"
function HomeProducts() {
    const {
        productsHook: {
            products,
            gettingProducts
        },
        width
    } = useAppContext()
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
                    {Array.from({length: products.length}, (_, index) => (
                        <ProductsCard
                            key={index}
                            product_images={products[index].product_images}
                            product_name={products[index].product_name}
                            product_price={products[index].product_price}
                            product_id={products[index].product_id}
                        />
                    ))}
                </React.Fragment>
            ) : (
                <picture className="empty-stock-container">
                    <img src={width > 768 ? EmptyStockPC : EmptyStockMobile} alt="" />
                </picture>
            )}
        </div>
    )
}

export default HomeProducts
