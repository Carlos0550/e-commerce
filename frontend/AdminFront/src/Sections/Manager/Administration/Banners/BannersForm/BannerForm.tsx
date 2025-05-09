import useBannerForm from './useBannerForm'
import { Button, Input } from '@mantine/core'
import "./BannerForm.css"
import { FaTrash } from 'react-icons/fa'
function BannerForm() {
    const {
        bannerInput,
        preview,
        handleFileChange,
        onFinish,
        handleDeleteBanner
    } = useBannerForm()
    return (
        <form className='banner-form' onSubmit={onFinish}>
            <Input.Wrapper
                label="Hacé click acá o arrastra una imagen aquí dentro"
                required
                className='banner-form-input-wrapper'
                id='banner-input'
            >
                <input 
                    onChange={handleFileChange} 
                    id='banner-input' 
                    type="file" 
                    ref={bannerInput} 
                    className='banner-input' 
                />
                
            </Input.Wrapper>
            {preview && preview.length > 0 && (
                <div className='banner-form-img-preview'>
                {preview && <img src={preview} />}
                <div className='delete-banner-background'>
                    <Button onClick={handleDeleteBanner} variant="white"><FaTrash color='red'/></Button>
                </div>
            </div>
            )}

            <Button fullWidth color='dark' type='submit'>Guardar</Button>
        </form>
    )
}

export default BannerForm
