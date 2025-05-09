import { Modal } from '@mantine/core'
import BannerForm from '../BannersForm/BannerForm'

interface Props {
    opened: boolean
    onClose: () => void
    actionType: "edit" | "create"
}
function BannerModal({opened, onClose, actionType}: Props) {
  return (
    <Modal
        opened={opened}
        onClose={onClose}
        size="xl"
        title={actionType === "edit" ? "Editar Banner" : "Agregar Banner"}
    >
        <BannerForm/>
    </Modal>
  )
}

export default BannerModal
