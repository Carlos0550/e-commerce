import { useAppContext } from '../../../../Context/AppContext'
import { Categories } from '../../../../Context/ContextTypes/CategoriesTypes'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Button } from '@mantine/core'
import "./CategoriesList.css"
function CategoriesList() {
    const {
        categoriesHook:{
            categories
        }
    } = useAppContext()
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
                                <Button variant='outline' color='dark'><FaEdit/></Button>
                                <Button color='red' variant='outline'><FaTrash/></Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default CategoriesList
