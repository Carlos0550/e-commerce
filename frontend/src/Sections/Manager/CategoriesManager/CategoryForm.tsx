import { Button, Input } from '@mantine/core'
import "./CategoryForm.css"
import useCategoryForm from './utils/useCategoryForm'
function CategoryForm() {
    const {
        onSubmit,
        categoryInputRef,
        savingCategory
    } = useCategoryForm()
  return (
    <form className='category-form-wrapper' onSubmit={onSubmit}>
        <Input.Wrapper
            className='category-form-input'
            required
            label="Ingresá el nombre de la categoria"
        >
            <Input
                name='category_name'
                type='text'
                ref={categoryInputRef}
            />
        </Input.Wrapper>

        <Button
            type='submit'
            color='dark'
            className='category-form-button'
            disabled={savingCategory}
            loading={savingCategory}
        >
            Guardar
        </Button>
    </form>
  )
}

export default CategoryForm
