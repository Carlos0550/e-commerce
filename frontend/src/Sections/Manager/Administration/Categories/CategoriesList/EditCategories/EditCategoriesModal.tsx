import { Modal } from '@mantine/core'

import CategoryForm from '../../CategoriesForm/CategoryForm'
import { useAppContext } from '../../../../../../Context/AppContext'

interface Props{
    opened: boolean,
}
function EditCategoriesModal({opened}: Props) {
    const {
        categoriesHook: {
            handleCloseModalCategory
        }
    } = useAppContext()
  return (
    <Modal
        opened={opened}
        onClose={handleCloseModalCategory}
        title="Editar categoria"
        size="xl"
        centered
    >   
        <CategoryForm/>
    </Modal>
  )
}

export default EditCategoriesModal
