import React from "react"
import { useAppContext } from "../../../../../../Context/AppContext"
import "./HomeProducts.css"
import { Flex, Skeleton } from "@mantine/core"
import ProductsCard from "./ProductsCard/ProductsCard"

function HomeProducts() {
    const {
        productsHook: {
            products,
            gettingProducts
        }
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
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
                    <Skeleton animate height={200} width={200} />
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
                        />
                    ))}
                </React.Fragment>
            ) : (
                <React.Fragment>no hay nada</React.Fragment>
            )}
        </div>
    )
}

export default HomeProducts
