import { Outlet, Navigate } from 'react-router-dom';

const RequireLogin = (auth) => {
  return auth ? <Outlet /> : <Navigate to='/' />;
};

export default RequireLogin;
