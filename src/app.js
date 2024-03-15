import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './styles/style.scss';
import Routers from "./routers/Routers";
import configureStore from "./state/store/configureStore";

export const store = configureStore();

const JSX = (
    <Provider store={store}>
        <GoogleOAuthProvider clientId="93900661608-gjsa8npvgh0q2opggkkskfeoe7b8ir1c.apps.googleusercontent.com">
            <Routers />
        </GoogleOAuthProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render( JSX );