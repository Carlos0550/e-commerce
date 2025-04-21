import { Button, Input, PasswordInput } from '@mantine/core'

function LoginForm() {
  return (
    <div>
      <h1>Bienvenido nuevamente a</h1>
      <h1 className='cinnamon-title'>Cinnamon 👋</h1>
      <form className='login-form-container'>
        <Input.Wrapper
            label="Ingresá tu email"
            required
        >
            <Input placeholder="jhon@gmail.com" type='text' />
        </Input.Wrapper>

        <Input.Wrapper
            label="Ingresá tu contraseña"
            required
        >
            <PasswordInput
                placeholder="contraseña"
            />
        </Input.Wrapper>

        <Button
            type='button'
            color='violet'
            mt={5}
            fullWidth
        >Iniciar Sesión</Button>
      </form>
    </div>
  )
}

export default LoginForm
