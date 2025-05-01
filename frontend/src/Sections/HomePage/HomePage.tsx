import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import "./HomePage.css"
import Home from "./components/Home/Home"
function HomePage() {
  return (
    <div className="home-page-wrapper">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default HomePage
