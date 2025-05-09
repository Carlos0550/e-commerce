import ProductsList from './ProductsList/ProductsList'
import ProductsModal from './Modals/ProductsModal';
import { Button, Input } from '@mantine/core';
import "./Products.css"
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../../../../Context/AppContext';
function Products() {
    const {
        productsHook:{
            openProductsModal: open,
        }
    } = useAppContext()
    return (
        <div className='products-container'>
            <div className="products-actions">
                <Input leftSection={<FaSearch />} placeholder="Buscar Producto" className='products-search-input' style={{ width: "300px" }} />
                <Button color='dark' onClick={open}>Agregar Producto</Button>
            </div>
            <ProductsList />
            <ProductsModal />
        </div>
    )
}

export default Products
