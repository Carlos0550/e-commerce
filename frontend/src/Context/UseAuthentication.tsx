import React, { useCallback, useMemo, useState } from 'react'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { RegisterFormValues } from './ContextTypes/RegisterUserForm';
import { authentication_url } from '../GlobalAPIs';
import { showNotification } from '@mantine/notifications';

function UseAuthentication() {
    const [loginData, setLoginData] = useState<LoginDataState>({
        user_email: "",
        user_name: "",
        user_id: "",
        isVerified: false,
        last_login: ""
    });

    const createUserAccount = useCallback(async(formValues: RegisterFormValues): Promise<boolean>=> {
        const url = new URL(`${authentication_url}create-account`)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })
            const responseData = await response.json()
            if(!response.ok) throw new Error(responseData.msg || "Error desconocido")
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
    },[])

    return useMemo(() => ({
        loginData,setLoginData, createUserAccount
    }), [
        loginData,setLoginData, createUserAccount
    ])
}

export default UseAuthentication
