import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='805356044025-ack2hf13io8eb40hk37rso3fondjprag.apps.googleusercontent.com'>
  <Router>
    <App />
  </Router>
   </GoogleOAuthProvider>
);

