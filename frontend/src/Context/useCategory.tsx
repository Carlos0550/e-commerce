import React, { useCallback, useMemo, useState } from 'react'
import { getServiceUrl } from '../GlobalAPIs'
import { LoginDataState } from './ContextTypes/AuthenticationTypes';
import { showNotification } from '@mantine/notifications';

function useCategory(loginData: LoginDataState) {
    const saveCategory = useCallback(async (category_name: string) => {
        const url = new URL(`${getServiceUrl("categories")}/create-category`);
        url.searchParams.append("user_id", loginData.user_id)
        console.log(url)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category_name })
            })

            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            showNotification({
                color: 'green',
                title: 'Categoría creada exitosamente',
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
                message: error instanceof Error ? error.message : 'Error desconocido',
                autoClose: 5000,
                position: 'top-right',
            })

            return false
        }
    }, [loginData])

    return useMemo(() => ({
        saveCategory
    }), [
        saveCategory
    ])
}

export default useCategory
