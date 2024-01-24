import ReactDOM from 'react-dom/client';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'


import NotificationModal from "../components/NotificationModal";
import LaunchPage from "../components/LaunchPage";
import SigninPage from "../components/users/client/SigninPage";
import SignupPage from "../components/users/client/SignupPage";

const Routers = ()=>(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LaunchPage/>}  />
            <Route path='/signin' element={<SigninPage/>}  />
            <Route path='/signup' element={<SignupPage/>}  />
        </Routes>
        <NotificationModal />
    </BrowserRouter>
);

export default Routers;