import { useState } from 'react'
import "./Administration.css"
import { Tabs } from '@mantine/core'
import Products from './Products/Products';
import Categories from './Categories/Categories';
import Banners from './Banners/Banners';
function Administration() {
  const [activeTab, setActiveTab] = useState<string | null>('tab1');
  return (
    <div className='product-manager-container'>
      <h2 className='product-manager-title'>Administración</h2>
      <div className="product-manager-actions">
        <h4>¿Que desea administrar?</h4>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Productos</Tabs.Tab>
            <Tabs.Tab value="tab2">Categorias</Tabs.Tab>
            {/* <Tabs.Tab value='tab3'>Banners</Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="tab1" pt="xs">
            <Products/>
          </Tabs.Panel>
          <Tabs.Panel value="tab2" pt="xs">
            <Categories/>
          </Tabs.Panel>
          {/* <Tabs.Panel value='tab3'>
            <Banners/>
          </Tabs.Panel> */}
        </Tabs>
      </div>
    </div>
  )
}

export default Administration
