import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";

export default function MarketPage() {
const dispatch = useDispatch();
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

    return (
        <section className="home">
            <div className="container">
                <SideBar selectedItem={"market"} />
                <div className="home__main">
                    <Header />
                    <div className="home__content">
                        <div className="trendingBox">
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                            <TradingPanel
                                pair={{name: "GBP/USD", icon: "d"}}
                                trendChart={{}}
                                price={{amount: "$1,085.18", change: "-21.00%"}}
                                actions={{trade: "d"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}