import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../../../../../Context/AppContext"
import { Products } from "../../../../../../Context/ContextTypes/ProductTypes"
import "./ProductsCard.css"

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
    const {
        productsHook:{
            buildPath
        }
    } = useAppContext()
    const navigate = useNavigate()
  return (
    <div className="product-card" onClick={()=> navigate(`/product-details/${product_id}`)}>
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
