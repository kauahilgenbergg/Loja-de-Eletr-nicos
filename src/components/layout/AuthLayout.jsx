import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../pages/Auth/Auth.css'; 

function AuthLayout() {
  return (
    <div className="auth-layout"> 
      
      <div className="auth-company-header">
        <h1>Eritrônicos</h1> 
      </div>

      <Outlet />
    </div>
  );
}

export default AuthLayout;