import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getServiceUrl } from '../GlobalAPIs'
import { LoginDataState } from './ContextTypes/AuthenticationTypes';
import { showNotification } from '@mantine/notifications';
import { Categories } from './ContextTypes/CategoriesTypes';

function useCategory(loginData: LoginDataState) {
    const [categories, setCategories] = useState<Categories[]>([])
    const getCategories = useCallback(async () => {

        const url = new URL(`${getServiceUrl("categories")}/get-categories`);
        url.searchParams.append("user_id", loginData.user_id)
        try {
            const response = await fetch(url)
            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            setCategories(responseData.categories)
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

    const saveCategory = useCallback(async (category_name: string) => {
        const url = new URL(`${getServiceUrl("categories")}/create-category`);
        url.searchParams.append("user_id", loginData.user_id)
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
            await getCategories()
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
    }, [loginData, getCategories])


    const deleteCategory = useCallback(async (category_id: string) => {
        const url = new URL(`${getServiceUrl("categories")}/delete-category`);
        url.searchParams.append("user_id", loginData.user_id)
        url.searchParams.append("category_id", category_id)
        try {
            const response = await fetch(url, {
                method: "DELETE"
            })
            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            showNotification({
                color: 'green',
                title: 'Categoría eliminada exitosamente',
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

    const updateCategory = useCallback(async (category_id: string, category_name: string) => {
        const url = new URL(`${getServiceUrl("categories")}/update-category`);
        url.searchParams.append("user_id", loginData.user_id)
        url.searchParams.append("category_id", category_id)
        url.searchParams.append("category_name", category_name)
        try {
            const response = await fetch(url, {
                method: "PUT"
            })
            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
            showNotification({
                color: 'green',
                title: 'Categoría actualizada exitosamente',
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

    const alreadyGettedCategories = useRef(false)

    useEffect(() => {
        if (loginData && loginData.user_id) {
            if (alreadyGettedCategories.current) return
            alreadyGettedCategories.current = true
            const timeout = setTimeout(() => {
                getCategories()
            }, 100);

            return () => clearTimeout(timeout);
        }

    }, [loginData, getCategories])

    useEffect(() => {
        console.log(categories)
    }, [categories])
    return useMemo(() => ({
        saveCategory, updateCategory, getCategories, deleteCategory, categories
    }), [
        saveCategory, updateCategory, getCategories, deleteCategory, categories
    ])
}

export default useCategory
