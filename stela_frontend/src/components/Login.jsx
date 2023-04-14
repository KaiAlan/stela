import React from 'react'
// import GoogleLogin from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo-white-removebg-preview.png';
import jwt_decode from "jwt-decode";

import { client } from '../clien';


const Login = () => {

  const navigate = useNavigate();

  const responseGoogle= (response) =>{
    console.log(response);
  };

  const responseMessage = (response) => {
    const details = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(details));
    const {name, sub, picture} = details;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', {replace: true})
      })
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className=' relative w-full h-full'>
        <video
          src={shareVideo}
          type = "video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt="logo" />

          </div>

          <div className='shadow-2xl'>
            <GoogleLogin
            //   clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  >
                    <FcGoogle className='mr-4' /> Sign in with Google
                  </button>
              )}

              onSuccess={responseMessage}
              onError={errorMessage}
              cookiePolicy={'single-host-origin'}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login