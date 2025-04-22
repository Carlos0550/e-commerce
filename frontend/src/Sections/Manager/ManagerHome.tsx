import { Route, Routes } from "react-router-dom"
import Layout from "../Layout/Layout"
import ProductManager from "./ProductManager/ProductManager"

function ManagerHome() {
  return (
    <Routes>
      <Route path="/" element={<Layout children={<div></div>}/>}/>
      <Route path="product-manager" element={<Layout children={<ProductManager/>}/>} />
    </Routes>
  )
}

export default ManagerHome
