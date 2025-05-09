import { Input, Select } from "@mantine/core"
import "./HomeFIlters.css"
import { FaSearch } from "react-icons/fa"
import { useAppContext } from "../../../../Context/AppContext"

function HomeFilters() {
    const {
        categoriesHook:{
            categories
        }
    } = useAppContext()
  return (
    <div className="home-filters-container">
      <Input
        placeholder="Buscar..."
        leftSection={<FaSearch />}
        className="home-filters-input"
        
        radius="md"
        size="md"
      />
      <Select
        data={categories.map((category) => ({
            value: category.category_id,
            label: category.category_name
        }))}
        placeholder="Categorias"
        className="home-filters-select"
        
        radius="md"
        size="md"
        searchable
        maxDropdownHeight={150}
        
      />
    </div>
  )
}

export default HomeFilters
