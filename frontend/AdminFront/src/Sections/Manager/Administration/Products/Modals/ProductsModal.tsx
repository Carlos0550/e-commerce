import { Modal } from '@mantine/core'
import ProductForm from '../ProductForm/ProductForm'
import { useAppContext } from '../../../../../Context/AppContext'

function ProductsModal() {
  const {
    productsHook:{
        openedProductsModal: opened,
        closeProductsModal: onClose,
        productModalInfo:{
            actionType
        },
        setProductModalInfo
    }
  } = useAppContext()

  const handleCloseModal = () =>{
    setProductModalInfo({
      actionType: "create",
      product_id: ""
    })

    onClose()
  }
  return (
    <Modal
        opened={opened}
        onClose={()=> handleCloseModal()}
        size="xl"
        fullScreen
        centered
        title={actionType === "edit" ? "Editar Producto" : "Agregar Producto"}
    >
        <ProductForm/>
    </Modal>
  )
}

export default ProductsModal
