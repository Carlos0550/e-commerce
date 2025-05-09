import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import BannerModal from './Modals/BannerModal';
import "./Banners.css"
function Banners() {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className='banners-container'>
        <div className="banner-actions-container">
            <Button
                color='dark'
                onClick={open}
            >Crear Banner</Button>
        </div>

        <BannerModal opened={opened} onClose={close} actionType="create"/>
    </div>
  )
}

export default Banners
