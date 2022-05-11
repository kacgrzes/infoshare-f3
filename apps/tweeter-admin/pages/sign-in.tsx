import { useRouter } from 'next/router'
import { Button, Container } from '@infoshare-f3/ui'
import { useAuthContext } from '@infoshare-f3/data-providers'

const SignIn = () => {
  const router = useRouter()
  const { loginMutation } = useAuthContext()

  return <Container>
    <Button title='Login as admin' onPress={() => {
      loginMutation.mutateAsync({
        username: 'admin1',
        password: 'password1'
      }).then(() => {
        router.replace('/')
      })
    }} />
  </Container>
}

export default SignIn