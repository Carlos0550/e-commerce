import { Route, Routes } from "react-router-dom"
import Layout from "../Layout/Layout"
import Product_and_CategoriesManager from "./Product&CategoriesManager/Product&CategoriesManager"

function ManagerHome() {
  return (
    <Routes>
      <Route path="/" element={<Layout children={<div></div>}/>}/>
      <Route path="product-manager" element={<Layout children={<Product_and_CategoriesManager/>}/>} />
    </Routes>
  )
}

export default ManagerHome
