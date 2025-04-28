import React, { useState } from 'react'
import "./Product&CategoriesManager.css"
import { Tabs } from '@mantine/core'
import ProductForm from './ProductForm/ProductForm';
import CategoryForm from './CategoriesForm/CategoryForm';
import CategoriesList from './CategoriesList/CategoriesList';
function Product_and_CategoriesManager() {
  const [activeTab, setActiveTab] = useState<string | null>('tab1');
  return (
    <div className='product-manager-container'>
      <h2 className='product-manager-title'>Administración de inventario</h2>
      <div className="product-manager-actions">
        <h4>¿Que desea administrar?</h4>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Añadir Productos</Tabs.Tab>
            <Tabs.Tab value="tab2">Lista de stock</Tabs.Tab>
            <Tabs.Tab value="tab3">Categorias</Tabs.Tab>
            <Tabs.Tab value="tab4">Añadir Categoria</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="tab1" pt="xs">
            <ProductForm/>
          </Tabs.Panel>

          <Tabs.Panel value="tab2" pt="xs">
            Lista de stock
          </Tabs.Panel>
          <Tabs.Panel value="tab3" pt="xs">
            <CategoriesList/>
          </Tabs.Panel>
          <Tabs.Panel value="tab4" pt="xs">
            <CategoryForm/>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default Product_and_CategoriesManager
