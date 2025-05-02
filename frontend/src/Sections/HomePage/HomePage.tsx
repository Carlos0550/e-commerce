import { Route, Routes } from "react-router-dom"
import "./HomePage.css"
import Home from "./components/Home/Home"
function HomePage() {
  return (
    <div className="home-page-wrapper">
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default HomePage
