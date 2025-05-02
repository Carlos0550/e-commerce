import { useAppContext } from "../../../../../../../Context/AppContext"
import { Products } from "../../../../../../../Context/ContextTypes/ProductTypes"
import "./ProductsCard.css"

interface Props {
    product_name: string
    product_images: Products["product_images"]
    product_price: string
};
function ProductsCard({
    product_name,
    product_images,
    product_price,
}: Props) {
    const {
        productsHook:{
            buildPath
        }
    } = useAppContext()
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={buildPath(product_images.path)} alt="" />
      </div>
      <div className="product-card__info">
        <h3>{product_name}</h3>
        <p>{product_price}</p>
      </div>
    </div>
  )
}

export default ProductsCard
