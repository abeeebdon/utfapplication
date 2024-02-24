import React, { useEffect } from 'react';
import { Buffer } from 'buffer';
import {useSelector, useDispatch} from 'react-redux'
import { store } from '../app.js'
import API from './api.mjs';
import { setToken } from './user.js';
import NotificationModal from "../components/NotificationModal";
import { showErrorModal, showSuccessModal } from '../state/actions/notification';
import { setAuthentication, setUser } from '../state/actions/account';
import { setOperators, setMobileRechargers, setCurrencies, setBlockchains, setPairs } from '../state/actions/configuration';

import { selectGetOperatorsInCountryEndpoint, selectGetMobileRechargersEndpoint, selectGetCurrenciesEndpoint,
        selectGetPairsEndpoint } from '../state/selectors/endpoints';

export async function populateOperators(){
    let api = new API();
    const dispatch = store.dispatch;
    let getOperatorsInCountryURL = selectGetOperatorsInCountryEndpoint(store.getState().endpoints)(store.getState().buyAirtimeForm.formData.mobileRechargerId,
                                                                        store.getState().buyAirtimeForm.formData.countryCode);
    let formData = {}

    setToken();
    return api.get(
        getOperatorsInCountryURL,
        formData,
        (response)=>{
            let operators = { ...response.data }
            dispatch(setOperators(operators))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}

export async function populateMobileRechargers(){
    let api = new API();
    const dispatch = store.dispatch;
    let getMobileRechargersURL = selectGetMobileRechargersEndpoint(store.getState().endpoints)();
    let formData = {}

    setToken();
    return api.get(
        getMobileRechargersURL,
        formData,
        (response)=>{
            let mobileRechargers = response.data
            let allMobileRechargers = {}

            mobileRechargers.map((mobileRecharger)=>{
                allMobileRechargers[mobileRecharger.name] = mobileRecharger;
            })

            dispatch(setMobileRechargers(allMobileRechargers))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}

export async function populateCurrencies(){
    let api = new API();
    const dispatch = store.dispatch;
    let getCurrenciesURL = selectGetCurrenciesEndpoint(store.getState().endpoints)();
    let formData = {}

    setToken();
    return api.get(
        getCurrenciesURL,
        formData,
        (response)=>{
            let currencies = response.data
            let allCurrencies = {}

            currencies.map((currency)=>{
                allCurrencies[currency.currencyId] = currency;
            })

            dispatch(setCurrencies(allCurrencies))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}

export async function populatePairs(){
    let api = new API();
    const dispatch = store.dispatch;
    let getPairsURL = selectGetPairsEndpoint(store.getState().endpoints)();
    let formData;
    return api.get(
        getPairsURL,
        formData,
        (response)=>{
            let pairs = []
            response.map((value)=>{
                let currentRate = value[0]
                let previousRate = value[value.length - 1]
//                console.log(currentRate, previousRate)
                let trendData = []

                value.map((pair, index)=>{
                    trendData.push([index, pair.rate])
                })

                pairs.push({
                    name: currentRate.symbol,
                    rate: currentRate.rate,
                    spread: 0.00022,
                    trendData: trendData.reverse(),
                    change: (((currentRate.rate - previousRate.rate)/previousRate.rate) * 100).toFixed(2),
                    icon: `/images/countries/${currentRate.symbol[0].toLowerCase() + currentRate.symbol[1].toLowerCase()}.svg`
                })
            })

            dispatch(setPairs(pairs))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}