import React from 'react';
import { GoogleLogin } from 'react-google-login'
import './LoginGoogleStyle.css'
import { loginGoogleRequest } from 'actions/sessionActions';
import { useDispatch } from 'react-redux';
const clientId = '166038654212-9bs8c0edhtigo500misqha9qkst975o4.apps.googleusercontent.com';

function Login() {

  const dispatch = useDispatch();

  const onSuccess = (res) => {
    dispatch(loginGoogleRequest({
      name: res.profileObj.name,
      email: res.profileObj.email
    }))
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  return(
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="ENTRAR COM GOOGLE"
        className= 'signIn'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{marginTop: '100px'}}
        isSignedIn={true}
      />  
    </div>
  )

}

export default Login;
