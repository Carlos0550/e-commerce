import React, { useEffect, useState } from 'react'
import "./LoginManager.css"
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import { Button, Flex, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
function LoginManager() {
    const [showLogin, setShowLogin] = useState(true);
    const {
        AuthenticationHook: {
            loginData
        }
    } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (loginData && loginData.user_id) navigate("/admin-dashboard/administration")
        return
    }, [loginData])
    const handleNavigate = (target: string) => {
        const environment = import.meta.env.MODE
        window.location.href = environment === "development"
            ? new URL("http://localhost:4321" + target).href
            : new URL("https://cinnamon-makeup.com" + target).href
    }
    return (
        <div className='login-manager-container'>
            <div className='login-manager__wrapper'>
                <div className='login-manager-node'>
                    {showLogin && <LoginForm />}
                    {!showLogin && <RegisterForm setShowLogin={setShowLogin}/>}
                </div>

                <div className='toggle-loginmanager-container'>
                    {showLogin
                        ? (
                            <React.Fragment>
                                <Flex gap={10} justify={"space-between"} direction={"column"}>
                                    <Button color="cyan" onClick={()=> handleNavigate("/")}>Volver al inicio</Button>

                                    <Space>
                                        <p>¿No tiene una cuenta?</p>
                                        <Button c={"white"} color='dark' onClick={() => setShowLogin(false)}>Registrarse</Button>
                                    </Space>
                                </Flex>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Flex justify={"space-between"} gap={10} direction={"column"}>
                                    <Button 
                                        color="cyan" 
                                        onClick={()=> handleNavigate("/")}
                                        
                                        >Volver al inicio</Button>

                                    <Space>
                                        <p>¿Ya tiene una cuenta?</p>
                                        <Button c={"white"} color='dark' onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
                                    </Space>
                                </Flex>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginManager
