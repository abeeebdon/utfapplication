import ReactDOM from 'react-dom/client';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'


import LaunchPage from "../components/LaunchPage";

const Routers = ()=>(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LaunchPage/>}  />
        </Routes>
    </BrowserRouter>
);

export default Routers;