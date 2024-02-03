import ReactDOM from 'react-dom/client';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'


import NotificationModal from "../components/NotificationModal";
import LaunchPage from "../components/LaunchPage";
import SigninPage from "../components/users/client/SigninPage";
import SignupPage from "../components/users/client/SignupPage";
import HomePage from "../components/users/client/HomePage";
import DepositPage from "../components/users/client/DepositPage";
import WithdrawPage from "../components/users/client/WithdrawPage";
import TradePage from "../components/users/client/TradePage";
import RewardPage from "../components/users/client/RewardPage";
import MarketPage from "../components/users/client/MarketPage";

const Routers = ()=>(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LaunchPage/>}  />
            <Route path='/signin' element={<SigninPage/>}  />
            <Route path='/signup' element={<SignupPage/>}  />
            <Route path='/home' element={<HomePage/>}  />
            <Route path='/deposit' element={<DepositPage/>}  />
            <Route path='/withdraw' element={<WithdrawPage/>}  />
            <Route path='/trade' element={<TradePage/>}  />
            <Route path='/reward' element={<RewardPage/>}  />
            <Route path='/market' element={<MarketPage/>}  />
            <Route path='/account' element={<MarketPage/>}  />
        </Routes>
        <NotificationModal />
    </BrowserRouter>
);

export default Routers;