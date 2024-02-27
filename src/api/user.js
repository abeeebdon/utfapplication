import React, { useEffect } from 'react';
import { Buffer } from 'buffer';
import {useSelector, useDispatch} from 'react-redux'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate, Link, Navigate } from 'react-router-dom'

import { store } from '../app.js'
import API from './api.mjs';
import { populateMobileRechargers, populateCurrencies, populateBlockchains, populatePairs } from './configuration';
import NotificationModal from "../components/NotificationModal";
import { showErrorModal, showSuccessModal } from '../state/actions/notification';
import { setAuthentication, setUser, setLoggedIn, setWallets, resetAll, setTransactions, setOnboarded, setOpenTrades } from '../state/actions/account';

import { selectGenerateAuthenticationTokenEndpoint, selectRefreshAuthenticationTokenEndpoint, selectGetUserInfoEndpoint,
        selectGetWalletsEndpoint, selectAddWalletEndpoint, selectAddKeyEndpoint, selectGetTransactionsEndpoint, selectGetOpenTradesEndpoint } from '../state/selectors/endpoints';


//export async function generateAuthenticationToken(email, password) {
//    let api = new API();
//    const dispatch = store.dispatch;
//    let authorization = "Basic " + (new Buffer.from(`${email}:${password}`)).toString('base64');
//    let getAuthenticationTokenURL = selectGenerateAuthenticationTokenEndpoint(store.getState().endpoints)();
//    let formData = { email, password };
//
//    api.setHeaders({authorization});
//    return api.post(
//        getAuthenticationTokenURL,
//        formData,
//        (response)=>{
//            let authentication = { ...response.data }
//            return authentication;
//        },
//        (errorMessage)=>{
//            dispatch(showErrorModal(errorMessage, '/signin'));
//        }
//    )
//}
//
//export function refreshAuthenticationToken() {
//    let api = new API();
//    const dispatch = store.dispatch;
//    let refreshTokenURL = selectRefreshAuthenticationTokenEndpoint(store.getState().endpoints)();
//    let refreshToken = store.getState().account.authentication.refreshToken;
//    let authorization = "Bearer " + refreshToken;
//    let formData = {};
//
//    api.setHeaders({authorization});
//    api.post(
//        refreshTokenURL,
//        formData,
//        (response)=>{
//            let authentication = { ...response.data }
//            dispatch(setAuthentication(authentication))
//            populateUser();
//        },
//        (errorMessage)=>{
//            dispatch(showErrorModal(errorMessage, '/signin'));
//        }
//    )
//}

export function requireLogin() {
    let isLoggedIn = store.getState().account.isLoggedIn;

    if(!isLoggedIn)
        return  window.location.replace(`/signin?next=${window.location.pathname}${window.location.search}`)

}

export function loopRefreshAuthenticationToken() {
    let id = localStorage.getItem('id');
    let api = new API();
    let navigate;
    let isLoggedIn = store.getState().account.isLoggedIn;
    let auth = store.getState().account.authentication
    let authExpiryDate = auth.expires;

    if(!isLoggedIn || !authExpiryDate)
        return  window.location.replace(`/signin?next=${window.location.pathname}${window.location.search}`)


    let date = new Date();
    console.log(authExpiryDate - date.getTime())
    if(authExpiryDate - date.getTime() >= 0 && authExpiryDate - date.getTime() <=  0.5*60*1000) {
        refreshAuthenticationToken();
        clearTimeout(id);
        id = setTimeout(loopRefreshAuthenticationToken, 4.5*60*1000)
        localStorage.setItem('id', id);
    }
    else if(authExpiryDate - date.getTime() > 0) {
        clearTimeout(id);
        id = setTimeout(loopRefreshAuthenticationToken, authExpiryDate - 0.5*60*1000 - date.getTime())
        localStorage.setItem('id', id);
    }
    else if(authExpiryDate - date.getTime() <= 0) {
        clearTimeout(id);
        if(date.getTime() - authExpiryDate < 2*5*60*1000){
            refreshAuthenticationToken();
            id = setTimeout(loopRefreshAuthenticationToken, 4.5*60*1000)
            localStorage.setItem('id', id);
        }
        else {
            window.location.replace(`/signin?next=${window.location.pathname}${window.location.search}`)
        }
    }

}

export function StartInactivityTimer(){
    const handleOnIdle = event => {
        console.log('user is idle', event)
        console.log('last active', getLastActiveTime())
        idleTimeout();
    }

    const handleOnActive = event => {
//        console.log('user is active', event)
//        console.log('time remaining', getRemainingTime())
    }

    const handleOnAction = event => {
//        console.log('user did something', event)
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * 5,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    })
}

export async function login(email, password) {
    let authentication = (await generateAuthenticationToken(email, password)).data;
    let next = (new URLSearchParams(window.location.search)).get("next");
    const dispatch = store.dispatch;

    if(!email || !password)
        return


    if(email != store.getState().account.user.email){
        await dispatch(resetAll())
    }

    await dispatch(setAuthentication(authentication))
    return populateUser().then(()=>{
        dispatch(setLoggedIn(true))

        if(!store.getState().account.isOnboarded){
            window.location.replace("/onboard")
        }
        else if(next){
            window.location.replace(next)
        }
        else{
            window.location.replace("/dashboard")
        }
    })
}

export function idleTimeout(){
    const dispatch = store.dispatch;
    dispatch(setLoggedIn(false))
}

export function logout(){
    const dispatch = store.dispatch;
    dispatch(resetAll())
    window.location.replace("/signin")
}

export function setToken() {
    let api = new API();
    let authenticationToken = store.getState().account.authentication.access;
    let authorization = "Bearer " + authenticationToken;
    api.setHeaders({authorization});
}

export async function populateUser(){
    let api = new API();
    const dispatch = store.dispatch;
    let getUserInfoURL = selectGetUserInfoEndpoint(store.getState().endpoints)(store.getState().account.authentication.userId);
    let formData = {}

    setToken();
    return api.get(
        getUserInfoURL,
        formData,
        (response)=>{
            let user = { ...response.data }
            dispatch(setUser(user))
        }
    )
}

export async function populateTrades(){
    let api = new API();
    const dispatch = store.dispatch;
    let getOpenTradesURL = selectGetOpenTradesEndpoint(store.getState().endpoints)();
    let formData = {}

    setToken();
    return api.get(
        getOpenTradesURL,
        formData,
        (response)=>{
            let tradesData = [ ...response.data ]
            let trades = []

            tradesData.map((trade)=>{
                trades.push({
                    id: trade.id,
                    pair: null,
                    pairName: trade.forex_pair,
                    direction: "buy",
                    lotSize: trade.lot_size,
                    openPrice: trade.lot_cost,
                    openTime: trade.created_at,
                    PL: null
                })
            });

            dispatch(setOpenTrades(trades))
        }
    )
}



export async function populateWallets(){
    let api = new API();
    const dispatch = store.dispatch;
    const currencies = store.getState().configuration.currencies;
    let getWalletsURL = selectGetWalletsEndpoint(store.getState().endpoints)(store.getState().account.authentication.userId);
    let formData = {}

    setToken();
    return await api.get(
        getWalletsURL,
        formData,
        (response)=>{
            let wallets = response.data
            let allWallets = {}

            wallets.map((wallet)=>{
                wallet.addresses = {}
                wallet.keys.map((key)=>{
                    wallet.addresses[key.blockchainId] = { address: key.address, blockchainId: key.blockchainId };
                })

                wallet.balances = {}
                Object.entries(currencies).map(([key,value])=>{
                    wallet.balances[key] = 1000;
                })

                allWallets[wallet.name] = wallet;
            })

            dispatch(setWallets(allWallets))
        }
    )
    .catch(async (error)=>{
        let errorMessage = error.responseJSON.message;
        if(errorMessage.toLowerCase() == "Wallet could not be found".toLowerCase()){
            await addWallet("myWallet")
            return await populateWallets()
        }
        else {
            throw error
        }
    })
    .then(async ()=>{
        let keyCreated = false;
        let wallets = store.getState().account.wallets;

        const blockchains = store.getState().configuration.blockchains;
//        Object.entries(wallets).map(([walletKey, walletValue])=>{
//            Object.entries(blockchains).map(([blockchainKey, blockchainValue])=>{
//                if(!walletValue.addresses || !walletValue.addresses[blockchainKey]){
//                    await addKey(walletValue.walletId, blockchainKey)
//                    keyCreated = true;
//                }
//            })
//        })

        for(let w=0; w<Object.entries(wallets).length; w++){
            for(let b=0; b<Object.entries(blockchains).length; b++){
                let walletName = Object.keys(wallets)[w]
                let blockchainId = Object.keys(blockchains)[b]
                let wallet = wallets[walletName]
                let blockchain = blockchains[blockchainId]
                if(!wallet.addresses || !wallet.addresses[blockchainId]){
                    await addKey(wallet.walletId, blockchainId)
                    keyCreated = true;
                }
            }
        }

        if(keyCreated)
            return await populateWallets();
    //    read wallet, check keys, create non-existing, reload
    })
}

export async function populateTransactions(){
    let api = new API();
    const dispatch = store.dispatch;
    let getTransactionsURL = selectGetTransactionsEndpoint(store.getState().endpoints)(store.getState().account.authentication.userId);
    let formData = {}

    setToken();
    return api.get(
        getTransactionsURL,
        formData,
        (response)=>{
            let transactions = response.data
            dispatch(setTransactions(transactions))
        }
    )
}

export async function addWallet(name){
    let api = new API();
    const dispatch = store.dispatch;
    let addWalletURL = selectAddWalletEndpoint(store.getState().endpoints)();
    let formData = { name }

    setToken();
    return api.post(
        addWalletURL,
        formData
    )
}

export async function addKey(walletId, blockchainId){
    let api = new API();
    const dispatch = store.dispatch;
    let addKeyURL = selectAddKeyEndpoint(store.getState().endpoints)(walletId);
    let formData = { blockchainId }

    setToken();
    return api.post(
        addKeyURL,
        formData
    )
}