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
  const truncateTitle = (title:string) => {
    if(title.length > 25) {
      return title.slice(0, 25) + "..."
    }
    return title
  }

  // Obtener la primera imagen del array
  const firstImage = Array.isArray(product_images) && product_images.length > 0 
    ? product_images[0] 
    : null;

  return (
    <a href={`/product-details/${product_id}`} className="product-card">
      <div className="product-card__image">
        {firstImage ? (
          <img src={buildPath(firstImage.path)} alt="" />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: '#f0f0f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#999'
          }}>
            Sin imagen
          </div>
        )}
      </div>
      <div className="product-card__info">
        <h3>{truncateTitle(product_name)}</h3>
        <p>{product_price}</p>
      </div>
    </a>
  )
}

export default ProductsCard
