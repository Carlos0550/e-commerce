import ProductsList from './ProductsList/ProductsList'
import { useDisclosure } from '@mantine/hooks';
import ProductsModal from './Modals/ProductsModal';
import { Button, Input } from '@mantine/core';
import "./Products.css"
import { FaSearch } from 'react-icons/fa';
function Products() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <div className='products-container'>
            <div className="products-actions">
                <Input leftSection={<FaSearch />} placeholder="Buscar Producto" className='products-search-input' style={{ width: "300px" }} />
                <Button color='dark' onClick={open}>Agregar Producto</Button>
            </div>
            <ProductsList />
            <ProductsModal opened={opened} onClose={close} />
        </div>
    )
}

export default Products
