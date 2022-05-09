import './app.css';

import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '@infoshare-f3/data-providers';
import { TweetsPage, TweetPage, SignInPage } from '@infoshare-f3/web-pages';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <TweetsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/tweets/:id"
        element={
          <RequireAuth>
            <TweetPage />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={<SignInPage />}
      />
    </Routes>
  );
}

export default App;
