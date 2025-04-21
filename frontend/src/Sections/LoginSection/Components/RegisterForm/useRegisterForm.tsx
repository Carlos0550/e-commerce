import { useState } from 'react'
import { RegisterFormValues } from '../../../../Context/ContextTypes/RegisterUserForm'
import { showNotification } from '@mantine/notifications';
import { useAppContext } from '../../../../Context/AppContext';


function useRegisterForm() {
    const { 
      AuthenticationHook:{
        createUserAccount
      }
     } = useAppContext()
    const [registerFormValues, setRegisterFormValues] = useState<RegisterFormValues>({
        user_name: '',
        user_email: '',
        user_password: '',
        user_password_confirmation: '',
        register_as_admin: false
    })
    const [errores, setErrores] = useState<Partial<RegisterFormValues>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    }

    const handleCheckboxChange = () => {
        setRegisterFormValues((prev) => ({
            ...prev,
            register_as_admin: !prev.register_as_admin
        }))
    }


    const handleVerifyFields = (): boolean => {
        const { user_password, user_password_confirmation } = registerFormValues;
        const error: Partial<RegisterFormValues> = {};
      
        for (const [key, value] of Object.entries(registerFormValues)) {
            if(key === "register_as_admin") continue
          if (!value) {
            error[key as keyof RegisterFormValues] = 'Este campo es requeridoo';
          }
        }
      
        if (user_password !== user_password_confirmation) {
          error.user_password_confirmation = 'Las contraseñas no coinciden';
        }
      
        if (Object.keys(error).length > 0) {
          setErrores(error); 
          showNotification({
            color: 'red',
            title: 'Error',
            message: 'Por favor, corrija los campos marcados.',
            autoClose: 5000,
            position: 'top-right',
          });
          return false;
        }
      
        setErrores({});
        return true;
      };

      const [creatingAccount, setCreatingAccount] = useState(false)
    const onFinish = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(handleVerifyFields()){
            setCreatingAccount(true)
            await createUserAccount(registerFormValues)
            setTimeout(()=> setCreatingAccount(false), 1000)
        }
    }

  return {
    registerFormValues,
    handleChange,
    onFinish   ,
    errores,
    handleCheckboxChange,
    creatingAccount
  }
}

export default useRegisterForm
