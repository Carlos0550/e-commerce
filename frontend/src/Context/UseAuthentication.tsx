import { useCallback, useMemo, useRef, useState } from 'react'
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
                message: 'Usá las credenciales que proporcionaste para iniciar sesión',
                autoClose: 4000,
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
            localStorage.setItem("restored_login_data", JSON.stringify({ user_id: responseData.user.manager_id }))
            showNotification({
                color: 'green',
                title: responseData.msg || "Bienvenido nuevamente!",
                message: '',
                autoClose: 2500,
                position: 'top-right',
            })

            navigate("/admin-dashboard/administration")
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

    const closeSession = useCallback(() => {
        navigate("/authentication")
        setLoginData({
            user_email: "",
            user_name: "",
            user_id: ""
        })

        localStorage.removeItem("restored_login_data");
        return
    }, [setLoginData])

    const verifyUser = useCallback(async () => {
        const userData = localStorage.getItem("restored_login_data")
        if (location.pathname.includes("admin") && !userData) {
            navigate("/");
            showNotification({
                color: 'red',
                title: 'Error',
                message: "Debes iniciar sesión para acceder a esta página.",
                autoClose: 5000,
                position: 'top-right',
            });

            return false
        }
        const user_id = userData ? JSON.parse(userData) : ""
        if (!user_id) return false;

        const url = new URL(`${getServiceUrl("authentication")}verify-user`)
        url.searchParams.append("user_id", user_id.user_id)
        try {
            const response = await fetch(url)
            const responseData = await response.json()
            if (response.status === 401) {
                closeSession()
                showNotification({
                    color: 'red',
                    title: responseData.msg || "Error desconocido",
                    message: "Por favor, inicie sesión nuevamente.",
                    autoClose: 4000,
                    position: 'top-right',
                })
                return false
            }
            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            const user = responseData.user
            setLoginData({
                user_email: user.manager_email,
                user_name: user.manager_name,
                user_id: user.manager_id
            })
            return true
        } catch (error) {
            console.log(error)

            closeSession()
            showNotification({
                color: 'red',
                title: 'Error',
                message: error instanceof Error ? error.message : "Error desconocido",
                autoClose: 5000,
                position: 'top-right',
            })
            return false
        }
    }, [setLoginData, location])


    const isVerifyingRef = useRef(false)

    useEffect(() => {
        const timer = setInterval(async () => {
            if (isVerifyingRef.current) return
            isVerifyingRef.current = true
            await verifyUser()
            isVerifyingRef.current = false
        }, 15000)

        return () => clearInterval(timer)
    }, [verifyUser])

    const alreadyFetched = useRef(false)
    useEffect(() => {
        if (alreadyFetched.current) return
        alreadyFetched.current = true
        verifyUser()
    }, [])

    return useMemo(() => ({
        loginData, setLoginData, createUserAccount, loginUser, closeSession, verifyUser
    }), [
        loginData, setLoginData, createUserAccount, loginUser, closeSession, verifyUser
    ])
}

export default UseAuthentication
