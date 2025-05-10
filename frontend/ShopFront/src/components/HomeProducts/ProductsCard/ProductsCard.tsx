import "./ProductsCard.css"
import { getServiceUrl } from "../../utils/GlobalAPIs"
import type { Products } from "../../Types/ProductsTypes"
import { buildPath } from "../../utils/PathBuilder"

interface Props {
  product_name: string
  product_images: Products["product_images"]
  product_price: string,
  product_id: string
};
function ProductsCard({
  product_name,
  product_images,
  product_price,
  product_id
}: Props) {

  return (
    <a href={`/product-details/${product_id}`} className="product-card">
      <div className="product-card__image">
        <img src={buildPath(product_images.path)} alt="" />
      </div>
      <div className="product-card__info">
        <h3>{product_name}</h3>
        <p>{product_price}</p>
      </div>
    </a>

  )
}

export default ProductsCard
