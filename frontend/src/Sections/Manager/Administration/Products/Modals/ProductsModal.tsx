import { Modal } from '@mantine/core'
import ProductForm from '../ProductForm/ProductForm'

interface Props{
    opened: boolean,
    onClose: () => void
}
function ProductsModal({opened, onClose}: Props) {
  return (
    <Modal
        opened={opened}
        onClose={onClose}
        size="xl"
        fullScreen
        centered
        title="Agregar Producto"
    >
        <ProductForm/>
    </Modal>
  )
}

export default ProductsModal
