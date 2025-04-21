import './App.css'

import { Routes, Route } from "react-router-dom"
import LoginManager from './Sections/LoginSection/LoginManager'
function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginManager/>}/>
    </Routes>
  )
}

export default App
