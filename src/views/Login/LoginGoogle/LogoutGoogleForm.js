import React from 'react';
import { GoogleLogout } from 'react-google-login';
import './LoginGoogleStyle.css'
const clientId = '166038654212-9bs8c0edhtigo500misqha9qkst975o4.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    alert('Logout made successfully');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;