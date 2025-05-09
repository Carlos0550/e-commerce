import { Modal } from '@mantine/core'
import CategoryForm from '../CategoriesForm/CategoryForm'

interface Props{
    opened: boolean,
    onClose: () => void
}
function CategoriesModal({opened, onClose}: Props) {
  return (
    <Modal
        opened={opened}
        onClose={onClose}
        size="xl"
        centered
        title="Agregar Categoria"
    >
        <CategoryForm/>
    </Modal>
  )
}

export default CategoriesModal
