import './App.css'

import { Routes, Route} from "react-router-dom"
import LoginManager from './Sections/LoginSection/LoginManager'
import ManagerHome from './Sections/Manager/ManagerHome'
import HomePage from './Sections/HomePage/HomePage'

function App() {
  
  
  return (
    <Routes>
      <Route path='/*' element={<HomePage/>}/>
      <Route path='/authentication' element={<LoginManager/>}/>
      <Route path='/admin-dashboard/*' element={<ManagerHome/>}/>
    </Routes>
  )
}

export default App
