import { Route, Routes } from "react-router-dom"
import Layout from "../Layout/Layout"
import Administration from "./Administration"
import { useAppContext } from "../../Context/AppContext"
import { useEffect } from "react"

function ManagerHome() {
  const {
    AuthenticationHook:{
      verifyUser
    }
  } = useAppContext()

  useEffect(() => {
    verifyUser()
  },[verifyUser])
  return (
    <Routes>
      <Route path="/" element={<Layout children={<div></div>}/>}/>
      <Route path="administration" element={<Layout children={<Administration/>}/>} />
    </Routes>
  )
}

export default ManagerHome
