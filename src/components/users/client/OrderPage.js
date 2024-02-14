import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";

export default function OrderPage() {
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
                    <ControlHeader action={ {1: {name: "Market Price", onClick: ()=>{$(".marketOrder").show(); $(".pendingOrder").hide()}}, 2: {name: "Pending Order", onClick: ()=>{$(".marketOrder").hide(); $(".pendingOrder").show()}}}} />
                    <div className="home__content marketOrder">
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

                    <div className="home__content pendingOrder invisible">
                        <div className="trendingBox">
                            <p className="trendingBox__heading">Open Positions</p>
                            { [...Array(26)].map((x, key)=>{
                                return <TradingPanel
                                    pair={{name: "GBP/USD", icon: "/images/countries/gb.svg"}}
                                    trendChart={{}}
                                    price={{amount: "0.8132"}}
                                    spread={{amount: "0.0001", change: "-21.00%", buy: "0.8132", sell: "0.8131"}}
                                    actions={{close: ()=>{$(".home__content").hide(); $(".orderSummary").show()}}}
                                />
                              })
                            }
                        </div>
                    </div>

                    <div className="home__content orderSummary invisible">
                        <div className="withdraw__details">
                            <div className="withdraw__heading">Order Information</div>
                            <div className="withdraw__summaryTable">
                                <TradingPanel
                                    pair={{name: "Actual Profit and Loss",}}
                                    price={{amount: "$340,000.00"}}
                                />
                            </div>

                            <div className="withdraw__summaryTable">
                                <TradingPanel
                                    pair={{name: "Order Profit and Loss",}}
                                    price={{amount: "$340,000.00"}}
                                />
                                <TradingPanel
                                    pair={{name: "Deferred Charges",}}
                                    price={{amount: "$0.00"}}
                                />
                                <TradingPanel
                                    pair={{name: "Service Charge",}}
                                    price={{amount: "$0.00"}}
                                />
                            </div>

                            <div className="withdraw__summaryTable">
                                <TradingPanel
                                    pair={{name: "Order number",}}
                                    price={{amount: "345654567789-986478"}}
                                />
                                <TradingPanel
                                    pair={{name: "Opening price",}}
                                    price={{amount: "$456.896"}}
                                />
                                <TradingPanel
                                    pair={{name: "Closing price",}}
                                    price={{amount: "$56656"}}
                                />
                                <TradingPanel
                                    pair={{name: "Trade lot",}}
                                    price={{amount: "10.00"}}
                                />
                                <TradingPanel
                                    pair={{name: "Trading direction",}}
                                    price={{amount: "Buy"}}
                                />
                                <TradingPanel
                                    pair={{name: "Closing type",}}
                                    price={{amount: "Manual closing"}}
                                />
                                <TradingPanel
                                    pair={{name: "Occupation of margin ($)",}}
                                    price={{amount: "8000.0000"}}
                                />
                                <TradingPanel
                                    pair={{name: "Opening time",}}
                                    price={{amount: "2023-11-23 22:49:01"}}
                                />
                                <TradingPanel
                                    pair={{name: "Closing time",}}
                                    price={{amount: "2023-11-23 22:49:01"}}
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}