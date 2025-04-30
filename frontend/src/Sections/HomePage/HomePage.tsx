import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import "./HomePage.css"
function HomePage() {
  return (
    <div className="home-page-wrapper">
      <Navbar/>
      <Routes>
        <Route path="/"/>
      </Routes>
    </div>
  )
}

export default HomePage
