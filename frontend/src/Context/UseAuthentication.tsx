import { useCallback, useMemo, useState } from 'react'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { RegisterFormValues } from './ContextTypes/RegisterUserForm';
import { getServiceUrl } from '../GlobalAPIs';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
function UseAuthentication() {
    const [loginData, setLoginData] = useState<LoginDataState>({
        user_email: "",
        user_name: "",
        user_id: ""
    });

    const createUserAccount = useCallback(async (formValues: RegisterFormValues): Promise<boolean> => {
        const url = new URL(`${getServiceUrl("authentication")}create-account`)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })
            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            showNotification({
                color: 'green',
                title: 'Cuenta creada exitosamente',
                message: '',
                autoClose: 2500,
                position: 'top-right',
            })

            return true
        } catch (error) {
            console.log(error)
            showNotification({
                color: 'red',
                title: 'Error',
                message: error instanceof Error ? error.message : "Error desconocido",
                autoClose: 5000,
                position: 'top-right',
            })
            return false
        }
    }, [])

    const navigate = useNavigate()

    const loginUser = useCallback(async (formValues: RegisterFormValues): Promise<boolean> => {
        const url = new URL(`${getServiceUrl("authentication")}login-user`)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })
            const responseData = await response.json()

            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            setLoginData({
                user_email: responseData.user.manager_email,
                user_name: responseData.user.manager_name,
                user_id: responseData.user.manager_id
            })
            showNotification({
                color: 'green',
                title: responseData.msg || "Bienvenido nuevamente!",
                message: '',
                autoClose: 2500,
                position: 'top-right',
            })

            navigate("/admin-dashboard")
            return true
        } catch (error) {
            console.log(error)
            showNotification({
                color: 'red',
                title: 'Error',
                message: error instanceof Error ? error.message : "Error desconocido",
                autoClose: 5000,
                position: 'top-right',
            })
            return false
        }
    }, [])

    useEffect(() => {
        const isLoggedIn = loginData && loginData.user_email !== "";

        const timer = setTimeout(() => {
            if (location.pathname.includes("admin") && !isLoggedIn) {
              navigate("/");
              showNotification({
                color: 'red',
                title: 'Error',
                message: "Debes iniciar sesión para acceder a esta página.",
                autoClose: 5000,
                position: 'top-right',
              });
            }
          }, 100);
        return () => clearTimeout(timer);
        
    }, [location, loginData])

    return useMemo(() => ({
        loginData, setLoginData, createUserAccount, loginUser
    }), [
        loginData, setLoginData, createUserAccount, loginUser
    ])
}

export default UseAuthentication
