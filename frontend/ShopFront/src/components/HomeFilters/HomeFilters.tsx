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

  const allProducts = useProductStore((state) => state.allProducts) || []
  const setProducts = useProductStore((state) => state.setProducts)
  const getProducts = useProductStore((state) => state.getProducts)

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      getProducts()
    }
  }, [])

  

  useEffect(() => {
    if (!Array.isArray(allProducts) || allProducts.length === 0) return;
    const filtered = allProducts.filter((product) => {
      const matchesCategory = selectedCategory ? product.product_category === selectedCategory : true
      const matchesSearch = product.product_name.toLowerCase().includes(searchText.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setProducts(filtered)
  }, [selectedCategory, searchText, allProducts])

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