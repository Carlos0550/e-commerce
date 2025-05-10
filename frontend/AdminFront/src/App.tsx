import './App.css'

import { Routes, Route, useNavigate, useLocation} from "react-router-dom"
import LoginManager from './Sections/LoginSection/LoginManager'
import ManagerHome from './Sections/Manager/ManagerHome'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname === "/" || location.pathname === "") navigate("/authentication")
  },[location])
  return (
    <Routes>
      <Route path='/admin-dashboard/*' element={<ManagerHome/>}/> 
      <Route path='/authentication' element={<LoginManager/>}/>  
     
    </Routes>
  )
}

export default App
