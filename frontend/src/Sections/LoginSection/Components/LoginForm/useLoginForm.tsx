import { useState } from 'react'
import { RegisterFormValues } from '../../../../Context/ContextTypes/RegisterUserForm'
import { showNotification } from '@mantine/notifications';

import { useAppContext } from '../../../../Context/AppContext';


function useLoginForm() {

    const {
      AuthenticationHook:{
        loginUser
      }
    } = useAppContext()
    const [loginFormValues, setloginFormValues] = useState<Partial<RegisterFormValues>>({
        user_email: '',
        user_password: '',
    })
    const [errores, setErrores] = useState<Partial<RegisterFormValues>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setloginFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    }

    const handleCheckboxChange = () => {
        setloginFormValues((prev) => ({
            ...prev,
            register_as_admin: !prev.register_as_admin
        }))
    }


    const handleVerifyFields = (): boolean => {
        const error: Partial<RegisterFormValues> = {};
      
        for (const [key, value] of Object.entries(loginFormValues)) {
            if(key === "register_as_admin") continue
          if (!value) {
            error[key as keyof RegisterFormValues] = 'Este campo es requeridoo';
          }
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

      const [logginAccount, setlogginAccount] = useState(false)
    const onFinish = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(handleVerifyFields()){
            setlogginAccount(true)
            await loginUser(loginFormValues)
            setTimeout(()=> setlogginAccount(false), 1000)
        }
    }

  return {
    loginFormValues,
    handleChange,
    onFinish   ,
    errores,
    handleCheckboxChange,
    logginAccount
  }
}

export default useLoginForm
