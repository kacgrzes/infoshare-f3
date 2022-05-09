import { useLocation, useNavigate, Location } from 'react-router-dom';
import { Container, Button } from '@infoshare-f3/shared-ui'
import { useAuthContext } from '@infoshare-f3/data-providers'

export const SignInPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { loginMutation } = useAuthContext();
  const state = location.state as { from: Location }
  const from = state?.from?.pathname || "/";

  const title = loginMutation?.status === 'idle' ? 'Sign in'
    : loginMutation?.status === 'loading' ? 'Loading...'
    : loginMutation?.status === 'success' ? 'Logged in!' 
    : 'No title'

  return <Container>
    <Button title={title} onPress={() => {
      loginMutation?.mutateAsync({
        username: 'user1',
        password: 'password1'
      }).then(response => {
        if (response.status === 200) {
          navigate(from, { replace: true })
        }
      })
    }}/>
  </Container>;
};
