import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../pages/Auth/Auth.css'; 

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;