import './App.css'

import { Routes, Route} from "react-router-dom"
import LoginManager from './Sections/LoginSection/LoginManager'
import ManagerHome from './Sections/Manager/ManagerHome'
import HomeProductView from './Sections/HomePage/components/HomeProductView/HomeProductView'
import Home from './Sections/HomePage/Home'
import Faq from './Sections/HomePage/components/FAQ/Faq'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/product-details/:product_id" element={<HomeProductView/>}/>
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/authentication' element={<LoginManager/>}/>  
      <Route path='/admin-dashboard/*' element={<ManagerHome/>}/> 
     
    </Routes>
  )
}

export default App
