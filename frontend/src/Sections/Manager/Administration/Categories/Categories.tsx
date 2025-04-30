import { Button } from "@mantine/core"
import "./Categories.css"
import { useDisclosure } from "@mantine/hooks";
import CategoriesList from "./CategoriesList/CategoriesList";
import CategoriesModal from "./Modals/CategoriesModal";

function Categories() {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="categories-container">
      <div className="categories-actions-container">
        <Button onClick={open} color="dark">Agregar Categoria</Button>
      </div>
      <CategoriesList/>

      <CategoriesModal opened={opened} onClose={close} />
    </div>
  )
}

export default Categories
