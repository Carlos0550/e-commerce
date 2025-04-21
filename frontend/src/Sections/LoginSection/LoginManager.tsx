import React, { useState } from 'react'
import "./LoginManager.css"
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import { Button } from '@mantine/core';
function LoginManager() {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className='login-manager-container'>
            <div className='login-manager__wrapper'>
            <div className='login-manager-node'>
                {showLogin && <LoginForm />}
                {!showLogin && <RegisterForm />}
            </div>
            
            <div className='toggle-loginmanager-container'>
                {showLogin
                    ? (
                        <React.Fragment>
                            <p>¿No tiene una cuenta?</p>
                            <Button c={"white"} color='dark' onClick={() => setShowLogin(false)}>Registrarse</Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p>¿Ya tiene una cuenta?</p>
                            <Button c={"white"} color='dark' onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
                        </React.Fragment>
                    )
                }
            </div>
            </div>
        </div>
    )
}

export default LoginManager
