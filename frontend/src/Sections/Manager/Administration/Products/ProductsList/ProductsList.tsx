import "./ProductsList.css"
import { Button, Popover } from '@mantine/core'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useAppContext } from '../../../../../Context/AppContext'
import { useState } from "react"
function ProductsList() {
    const {
        productsHook:{
            products,
            buildPath,
            setProductModalInfo,
            openProductsModal,
            deleteProduct
        }
    } = useAppContext()

    const handleEditProduct = (product_id: string) => {
      setProductModalInfo({
        actionType: "edit",
        product_id,
      });
      openProductsModal();
    }
    const [deletingProduct, setDeletingProduct] = useState<boolean>(false)
    const handleDeleteProduct = async(product_id: string) => {
      setDeletingProduct(true)
      await deleteProduct(product_id)
      setDeletingProduct(false)
    }

    const cutDescription = (description: string) => {
      if (description.length > 30) {
        return (
          <span>
            <div dangerouslySetInnerHTML={{__html: description.slice(0, 30) + "..."}}></div>
            <Button size="xs">Ver más</Button>
          </span>
        );
      }
      return <span>{description}</span>;
    };
  return (
    <div className='products-list-container'>
        <table className='product-table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {products && products.length > 0 && products.map((product) => (
                           <tr key={product.product_id}>
                                <td>
                                    <picture className='product-table-image'>
                                    <img  src={buildPath(product.product_images.path)} alt={product.product_name} />
                                    </picture>
                                </td>
                               <td>{product.product_name}</td>
                               <td>{product.pr_category_name}</td>
                               <td>{parseFloat(product.product_price).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</td>
                               <td>{product.product_stock}</td>
                               <td>{cutDescription(product.product_description)}</td>
                               <td>
                                   <div className='product-table-actions'>
                                       <Button variant='outline' color='dark'
                                        onClick={()=>handleEditProduct(product.product_id)}
                                       >
                                           <FaEdit />
                                       </Button>
                                       <Button variant='outline' color='red' loading={deletingProduct} disabled={deletingProduct}
                                        onClick={()=> handleDeleteProduct(product.product_id)}
                                       >
                                           <FaTrash/>
                                       </Button>
                                   </div>
                               </td>
                           </tr>
                       ))}
                    </tbody>
                </table>
    </div>
  )
}

export default ProductsList
