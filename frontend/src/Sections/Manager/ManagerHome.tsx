import { Route, Routes } from "react-router-dom"
import Layout from "../Layout/Layout"
import Administration from "./Administration/Administration"

function ManagerHome() {
  return (
    <Routes>
      <Route path="/" element={<Layout children={<div></div>}/>}/>
      <Route path="administration" element={<Layout children={<Administration/>}/>} />
    </Routes>
  )
}

export default ManagerHome
