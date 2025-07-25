import { Input, Select } from "@mantine/core"
import "./HomeFIlters.css"
import { FaSearch } from "react-icons/fa"
import useCategories from "./utils/useCategories"
import { useEffect, useRef, useState } from "react"
import { useProductStore } from "../../Stores/productStore"

function HomeFilters() {
  const { categories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")
  const hasFetched = useRef(false)

  const getProductsPaginated = useProductStore((state) => state.getProductsPaginated)
  const resetPagination = useProductStore((state) => state.resetPagination)

  // Función para aplicar filtros
  const applyFilters = async () => {
    resetPagination();
    const filters: { search?: string; category?: string } = {};
    
    if (searchText.trim()) {
      filters.search = searchText.trim();
    }
    
    if (selectedCategory) {
      filters.category = selectedCategory;
    }
    
    await getProductsPaginated(1, 10, filters);
  };

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 500); // Debounce de 500ms para búsqueda

    return () => clearTimeout(timeoutId);
  }, [searchText, selectedCategory]);

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="home-filters-container">
      <Input
        placeholder="Buscar..."
        leftSection={<FaSearch />}
        className="home-filters-input"
        onChange={(e) => setSearchText(e.target.value)}
        radius="md"
        size="md"
      />
      <Select
        data={categories.map((category) => ({
          value: category.category_id,
          label: category.category_name
        }))}
        placeholder="Categorías"
        className="home-filters-select"
        onChange={(value) => setSelectedCategory(value)}
        radius="md"
        size="md"
        searchable
        maxDropdownHeight={150}
      />
    </div>
  )
}

export default HomeFilters