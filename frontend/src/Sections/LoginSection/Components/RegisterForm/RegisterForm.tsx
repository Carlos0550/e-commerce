import { Button, Checkbox, Flex, Input, Loader, PasswordInput } from '@mantine/core'
import useRegisterForm from './useRegisterForm'
import { useState } from 'react'

interface Props{
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}
function RegisterForm({ setShowLogin }: Props) {

    const {
        registerFormValues,
        handleChange,
        onFinish,
        errores,
        handleCheckboxChange,
        creatingAccount
    } = useRegisterForm(setShowLogin)
    const [width] = useState(window.innerWidth)
    return (
        <div>
            <h1>Creá tu cuenta en</h1>
            <h1 className='cinnamon-title'>Cinnamon👌</h1>
            <form className='login-form-container'  onSubmit={onFinish}>
                <Flex mb={5} gap="lg" align="flex-start" justify={"space-between"} wrap={"wrap"}>

                    <Input.Wrapper
                        label="Ingresá tu email"
                        description="Ingresá el que usás habitualmente"
                        required
                        w={width > 600 ? "" : "100%"}
                    >
                        <Input 
                        placeholder="jhon@gmail.com" 
                        type='text' 
                        name='user_email' 
                        
                        onChange={handleChange} 
                        value={registerFormValues.user_email}
                        error={errores.user_email}

                        />
                    </Input.Wrapper>

                    <Input.Wrapper
                        label="¿Como te llamas?"
                        required
                        description="Ingresá tu nombre"
                        w={width > 600 ? "" : "100%"}
                    >
                        <Input
                            placeholder='Jhon Doe'
                            type='text'
                            name='user_name'
                            onChange={handleChange}
                            value={registerFormValues.user_name}
                            error={errores.user_name}
                        />
                    </Input.Wrapper>
                </Flex>
                <Input.Wrapper
                    label="Ingresá tu contraseña"
                    description="Ingresá una segura pero facil de recordar"
                    required
                    flex={1}
                    mt={5}
                >
                    <PasswordInput
                        placeholder="******"
                        name='user_password'
                        onChange={handleChange}
                        value={registerFormValues.user_password}
                        error={errores.user_password}
                    />
                </Input.Wrapper>

                <Input.Wrapper
                    label="Una vez más"
                    description="La misma pero una vez más"
                    required
                    flex={1}
                    mt={5}
                    mb={15}
                >
                    <PasswordInput
                        placeholder="******"
                        name='user_password_confirmation'
                        onChange={handleChange}
                        value={registerFormValues.user_password_confirmation}
                        error={errores.user_password_confirmation}
                    />
                </Input.Wrapper>

                <Checkbox
                    label="Registrar como administrador"
                    name='register_as_admin'
                    onChange={handleCheckboxChange}
                    checked={registerFormValues.register_as_admin}
                />

                <Button
                    type='submit'
                    color="violet"
                    mt={5}
                    fullWidth
                    
                    disabled={creatingAccount}
                >{creatingAccount ? <Loader type="dots" size="xs"/> : "Registrarse"}</Button>
            </form>
        </div>
    )
}

export default RegisterForm
