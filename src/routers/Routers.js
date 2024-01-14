import ReactDOM from 'react-dom/client';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'


import LaunchPage from "../components/LaunchPage";
import SigninPage from "../components/users/client/SigninPage";

const Routers = ()=>(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LaunchPage/>}  />
            <Route path='/signin' element={<SigninPage/>}  />
        </Routes>
    </BrowserRouter>
);

export default Routers;