import { useEffect } from "react"
import { useAppContext } from "../../Context/AppContext"

import "./ManagerHome.css"
import { Button } from "@mantine/core"
function ManagerHome() {
  const {
    AuthenticationHook: {
      loginData
    }
  } = useAppContext()
  useEffect(() => {
    console.log(loginData)
  }, [loginData])
  return (
    <div className="manager-container">
      <div className="manager__wrapper">
        <div className="manager-left">
          <div className="manager-welcome">
            <h1>Hola, {loginData && loginData?.user_name.split(" ")[0]} 👋</h1>
            <Button
              color="red"
              
            >
              Cerrar sesión
            </Button>
          </div>
          <div className="manager-resume"></div>
        </div>
        <div className="manager-purchases"></div>
      </div>
    </div>

  )
}

export default ManagerHome
