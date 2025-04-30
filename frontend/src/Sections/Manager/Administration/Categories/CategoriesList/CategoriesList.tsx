import { useAppContext } from '../../../../../Context/AppContext'
import { Categories } from '../../../../../Context/ContextTypes/CategoriesTypes'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Button, Popover } from '@mantine/core'
import "./CategoriesList.css"
import EditCategoriesModal from './EditCategories/EditCategoriesModal'
import { useState } from 'react'
function CategoriesList() {
    const {
        categoriesHook:{
            categories,
            handleEditCategory,
            openedModalCategory,
            deleteCategory
        }
    } = useAppContext()
    
    const [deletingCategory, setDeletingCategory] = useState<boolean>(false)
    const handleDeleteCategory = async(category_id: string) => {
        setDeletingCategory(true)
        await deleteCategory(category_id)
        setDeletingCategory(false)
    }
    
  return (
    <div className='category-table-wrapper'>
        <table className='category-table'>
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Productos</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories && categories.map((cat:Categories) => (
                    <tr key={cat.category_id}>
                        <td>{cat.category_name}</td>
                        <td>N/A</td>
                        <td>
                            <div className='category-table-actions'>
                                <Button variant='outline' color='dark'
                                    onClick={() => handleEditCategory(cat.category_id)}
                                ><FaEdit/></Button>
                                <Popover>
                                    <Popover.Dropdown>
                                        <p>Seguro que desea eliminar la categoria?</p>
                                        <Button 
                                            color='red' 
                                            onClick={() => handleDeleteCategory(cat.category_id)}
                                            loading={deletingCategory}
                                            disabled={deletingCategory}
                                            >
                                                Eliminar
                                        </Button>
                                    </Popover.Dropdown>
                                    <Popover.Target>
                                        <Button color='red' variant='outline'><FaTrash/></Button>
                                    </Popover.Target>
                                </Popover>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <EditCategoriesModal opened={openedModalCategory} />
    </div>
  )
}

export default CategoriesList
