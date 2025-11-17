import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../pages/Auth/Auth.css'; 

function AuthLayout() {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}

export default AuthLayout;