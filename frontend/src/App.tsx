import './App.css'

import { Routes, Route} from "react-router-dom"
import LoginManager from './Sections/LoginSection/LoginManager'
import ManagerHome from './Sections/Manager/ManagerHome'

function App() {
  
  
  return (
    <Routes>
      <Route path='/' element={<LoginManager/>}/>
      <Route path='/admin-home' element={<ManagerHome/>}/>
    </Routes>
  )
}

export default App
