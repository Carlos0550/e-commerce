import { Button, Input, PasswordInput } from '@mantine/core'
import useLoginForm from './useLoginForm'

function LoginForm() {
  const { 
    loginFormValues,
    handleChange,
    onFinish   ,
    errores,
    logginAccount
  } = useLoginForm()
  return (
    <div>
      <h1>Bienvenido nuevamente a</h1>
      <h1 className='cinnamon-title'>Cinnamon 👋</h1>
      <form className='login-form-container' onSubmit={onFinish}>
        <Input.Wrapper
            label="Ingresá tu email"
            required
        >
            <Input 
            placeholder="jhon@gmail.com" 
            type='text'
            name='user_email' 
            onChange={handleChange}
            value={loginFormValues.user_email}
            error={errores.user_email}
            />
        </Input.Wrapper>

        <Input.Wrapper
            label="Ingresá tu contraseña"
            required
        >
            <PasswordInput
                placeholder="contraseña"
                name='user_password'
                onChange={handleChange}
                value={loginFormValues.user_password}
                error={errores.user_password}
            />
        </Input.Wrapper>

        <Button
            type='submit'
            color='violet'
            mt={5}
            fullWidth
            loading={logginAccount}
            disabled={logginAccount}
        >Iniciar Sesión</Button>
      </form>
    </div>
  )
}

export default LoginForm
