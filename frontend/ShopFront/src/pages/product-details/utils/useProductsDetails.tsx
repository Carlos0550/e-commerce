import React from 'react'
import { getServiceUrl } from '../../../components/utils/GlobalAPIs';

function useProductsDetails() {
    const getProductDetails = async (product_id: string): Promise<any> => {
        const url = new URL(`${getServiceUrl("ssr")}get-product-details`);
        url.searchParams.append("product_id", product_id);
        try {
            const response = await fetch(url);

            if (response.status === 404) {
                console.log("El producto que intentas obtener no existe")
                return false;
            }

            const { html, product } = await response.json();

            return { html, product };

        } catch (error) {
            console.error("No fue posible obtener los detalles del producto")
            console.log(error);
            return false;
        }
    }
    return {
        getProductDetails
    }
}

export default useProductsDetails
