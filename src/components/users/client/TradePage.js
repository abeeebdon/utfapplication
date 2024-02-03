import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";

export default function HomePage() {
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
        <section className="home trade">
            <div className="container">
                <SideBar selectedItem={"trade"} />
                <div className="home__main">
                    <Header title="Trade"/>
                    <div className="home__content">
                        <div className="trendingBox">
                            { [...Array(26)].map((x, key)=>{
                                return <TradingPanel
                                    pair={{name: "GBP/USD", icon: "/images/countries/gb.svg"}}
                                    trendChart={{}}
                                    spread={{amount: "0.0001", change: "-21.00%", buy: "0.8132", sell: "0.8131"}}
                                    actions={{buy: "functionCall", sell: "functionCall"}}
                                />
                              })
                            }
                        </div>
                    </div>
                </div>

                <div className="home__main invisible">
                    <ControlHeader action={"g"} />
                    <div className="home__content">
                        <div className="trendingBox">
                            <div className="autoTrade">
                                <ToggleInput
                                    id={"checkBox"}
                                    name={"checkBox"}
                                    required={"required"}
                                    checked={"false"}
                                />
                                <span><p>Switch to Auto Trading</p></span>
                            </div>
                            <form className="orderForm">
                                <p className="orderForm__title">Trade Type</p>
                                <p className="orderForm__pair">GBP/USD</p>
                                <div className="orderForm__direction">
                                    <span className="orderForm__directionButton">
                                        <RadioInput
                                            id={"radio"}
                                            name={"radio"}
                                            required={"required"}
                                            checked={"true"}
                                        />
                                        <p>Sell</p>
                                        <p>0.081</p>
                                    </span>
                                    <span className="orderForm__directionButton">
                                        <RadioInput
                                            id={"radio"}
                                            name={"radio"}
                                            required={"required"}
                                            checked={"true"}
                                        />
                                        <p>Buy</p>
                                        <p>0.081</p>
                                    </span>
                                </div>
                                <p className="orderForm__lots">Trade Amounts (Lots)</p>
                                <div className="orderForm__lotsControl">
                                    <span className="orderForm__lotsControlButton">+</span>
                                    <input type="number" />
                                    <span className="orderForm__lotsControlButton">-</span>
                                </div>
                                <div className="orderForm__margin">
                                    <span className="orderForm__marginOccupied">
                                        <p>Occupied Margin(s)</p>
                                        <p>148.566</p>
                                    </span>

                                    <span className="orderForm__marginAvailable">
                                        <p>Available Margin(s)</p>
                                        <p>96.173</p>
                                    </span>
                                </div>
                                <div className="orderForm__button button button--form">Place Order</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}