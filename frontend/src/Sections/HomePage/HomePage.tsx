import { Route, Routes } from "react-router-dom"
import "./HomePage.css"
import Home from "./components/Home/Home"
import HomeProductView from "./components/Home/components/HomeProductView/HomeProductView"
function HomePage() {
  return (
    <div className="home-page-wrapper">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product-details/:product_id" element={<HomeProductView/>}/>
      </Routes>
    </div>
  )
}

export default HomePage
