import React, { useEffect } from 'react';
import { Buffer } from 'buffer';
import {useSelector, useDispatch} from 'react-redux'
import { store } from '../app.js'
import API from './api.mjs';
import { setToken } from './user.js';
import NotificationModal from "../components/NotificationModal";
import { showErrorModal, showSuccessModal } from '../state/actions/notification';
import { setAuthentication, setUser } from '../state/actions/account';
import { setOperators, setMobileRechargers, setCurrencies, setBlockchains, setPairs, setDepositAddress } from '../state/actions/configuration';

import { selectGetOperatorsInCountryEndpoint, selectGetMobileRechargersEndpoint, selectGetCurrenciesEndpoint,
        selectGetPairHistoryEndpoint, selectGetDepositAddressEndpoint } from '../state/selectors/endpoints';

export async function populateHistoricalPairData(){
    let api = new API();
    const dispatch = store.dispatch;
    let getPairsURL = selectGetPairsEndpoint(store.getState().endpoints)();

    return api.get(
        getPairsURL,
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
                    spread: (Math.floor(Math.random() * 20) + 10)/100000,
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

export async function populatePairs(){
    let api = new API();
    api.setHeaders({authorization: "Bearer lOLWToxTSV_nqECS4ltgS4gxtVYCJfUt"});
    const dispatch = store.dispatch;
    let getPairHistoryURL = selectGetPairHistoryEndpoint(store.getState().endpoints);
//    const supportedPairs = useSelector(state => state.configuration.supportedPairs);
    const supportedPairs = ["EURUSD","GBPUSD","USDJPY","NZDUSD","AUDUSD","USDCHF","USDCAD"]


    supportedPairs.map((pairName)=>{
        api.get(
            getPairHistoryURL(pairName),
            (response)=>{
                let currentRate = response.results[0]
                let previousRate = response.results[response.results.length - 1]
//                console.log(currentRate, previousRate)
                let trendData = []

                response.results.map((pair, index)=>{
                    trendData.push([index, pair.c])
                })

                dispatch(setPairs(
                    {
                        name: pairName,
                        rate: currentRate.c,
                        spread: (Math.floor(Math.random() * 20) + 10)/100000,
                        trendData: trendData.reverse(),
                        change: (((currentRate.c - previousRate.c)/previousRate.c) * 100).toFixed(2),
                        icon: `/images/countries/${pairName[0].toLowerCase() + pairName[1].toLowerCase()}.svg`
                    }
                ))
            },
            (errorMessage)=>{
                dispatch(showErrorModal(errorMessage));
            }
        )
    })
}

export async function loopPopulatePairs() {
    let countDown = setInterval(populatePairs, 5000);
}

export async function populateDepositAddress(){
    let api = new API();
    const dispatch = store.dispatch;
    let getDepositAddressURL = selectGetDepositAddressEndpoint(store.getState().endpoints)();

    return api.get(
        getDepositAddressURL,
        (response)=>{
            dispatch(setDepositAddress(response.address))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}



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