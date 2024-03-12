import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";
import { requireLogin, populateTrades, closeAllPositions, calculateAccountSummary } from '../../../api/user.js';
import { populatePairs } from '../../../api/configuration.js';

export default function TradePage() {
    requireLogin();

    let accountSummary = calculateAccountSummary()
    if(accountSummary.marginLevel <= 5 && accountSummary.margin > 0)
        closeAllPositions();

    useEffect(()=>{
//        loopPopulatePairs();;
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector(state => state.configuration.countries);
    let selectedCountry = { isoCode: "NG",
                            numberPrefix: "+234",
                            flag: `/images/countries/ng.svg`,
                            currencyCode:"NGN",
                            currencySymbol: "NGN" }

    const clientSignupForm = useSelector(state => state.clientSignupForm);
    const onFormSubmit2 = async (event) => {
        event.preventDefault();
        dispatch(showSuccessModal("We will very your account and get back to you once we are done checking", "/home"));
    }
    const onFormSubmit = async (event) => {
        event.preventDefault();
        $(".signup__verification").removeClass("invisible")
    }
    const togglePasswordVisibility = async (event) => {
        let password = document.getElementById("password");
        if(password.type == "password"){
            password.type = "text";
        }
        else{
            password.type = "password"
        }
    }
    const onVerificationFormSubmit = async (event) => {
        event.preventDefault();
        $(".signup__verification").addClass("invisible")

        $("#verification").removeClass("signup--panel__sidebarMenuItem--active");
        $("#verificationPanel").addClass("invisible");

        $("#personalInfo").addClass("signup--panel__sidebarMenuItem--active");
        $("#personalInfoPanel").removeClass("invisible");
    }
    const sendVerificationToken = async (event) => {}
    let verificationTokenExpiryTimeLeft = useSelector(state => state.clientSignupForm.verificationTokenExpiryTimeLeft);
    let verificationTokenValidityDuration = useSelector(state => state.clientSignupForm.verificationTokenValidityDuration);
    const validateEmail = async ()=>{}
    const logo = useSelector(state => state.configuration.app.logo);
    const pairs = useSelector(state => state.configuration.pairs);

    return (
        <section className="home trade">
            <div className="container">
                <SideBar selectedItem={"trade"} />
                <div className="home__main">
                    <Header title="Trade"/>
                    <div className="home__content">
                        <div className="trendingBox">
                            {
                              Object.entries(pairs).map(([key, pair])=>{
                                return <div data-filter={`${pair.name.toLowerCase()} ${pair.rate}`} >
                                        <TradingPanel key={key}
                                            pair={{name: pair.name, icon: pair.icon}}
                                            trendChart={pair.trendData}
                                            spread={{amount: pair.spread, change: pair.change, buy: (pair.rate + pair.spread).toPrecision(6), sell: (pair.rate - pair.spread).toPrecision(6)}}
                                            actions={{buy: ()=>navigate(`/order/${pair.name}`), sell: ()=>navigate(`/order/${pair.name}`)}}
                                        />
                                    </div>


                              })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}