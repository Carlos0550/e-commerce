import { showNotification } from "@mantine/notifications";
import { useRef, useState } from "react";
import { useAppContext } from "../../../../../Context/AppContext";

function useCategoryForm() {
    const {
        categoriesHook: {
            saveCategory
        }
    } = useAppContext()
    const categoryInputRef = useRef<HTMLInputElement>(null);

    const handleVerifyField = () => {
        if (!categoryInputRef.current?.value) {
            showNotification({
                color: 'red',
                title: 'Error',
                message: 'Por favor, ingrese el nombre de la categoria.',
                autoClose: 5000,
                position: 'top-right',
            })
            return false;
        }

        if (categoryInputRef.current.value.length < 4) {
            showNotification({
                color: 'red',
                title: 'Error',
                message: 'El nombre de la categoria debe tener al menos 4 caracteres.',
                autoClose: 5000,
                position: 'top-right',
            })

            return false
        }
        return true
    }

    const [savingCategory, setSavingCategory] = useState(false)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (handleVerifyField()) {
            setSavingCategory(true)
            const result = await saveCategory(categoryInputRef.current?.value || '')
            setTimeout(() => setSavingCategory(false), 1000)
            if (result && categoryInputRef.current && categoryInputRef.current.value !== undefined) {
                categoryInputRef.current.value = '';
            }
        }
    }
    return {
        onSubmit,
        categoryInputRef,
        savingCategory
    }
}

export default useCategoryForm
