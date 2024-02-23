import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image, RoundedImage } from "../../Image";
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
    const user = useSelector(state => state.account.user);

    return (
        <section className="home account">
            <div className="container">
                <SideBar selectedItem={"account"} />
                <div className="home__main">
                    <Header title="Account"/>

                    <div className="account__panel">
                        <div className="account__navigation">
                            <div className="account__profile">
                                <div className="account__profileCard">
                                    <div className="account__profileCardImage">
                                        <RoundedImage src="/images/avatars/allison.jpg" />
                                    </div>
                                    <p>{user.full_name}</p>
                                    <p>{user.email}<br/>+91 944497718</p>
                                </div>
                            </div>

                            <ul>
                                <li className="account__navigationItem account__navigationItem--selected"><span className="fa fa-history"></span>History</li>
                                <li className="account__navigationItem"><span className="fa fa-bell"></span>Notification</li>
                                <li className="account__navigationItem"><span className="fa fa-shield"></span>Security</li>
                                <li className="account__navigationItem"><span className="fa fa-question-circle"></span>Help & Support</li>
                                <li className="account__navigationItem"><span className="fa fa-check"></span>Terms & Conditions</li>
                            </ul>
                        </div>

                        <div className="account__details">
                            <div className="account__profile">
                                <div className="account__profileCard">
                                    <div className="account__profileCardImage">
                                        <RoundedImage src="/images/avatars/allison.jpg" />
                                    </div>
                                    <p>{user.full_name}</p>
                                    <p>{user.email}<br/>+91 944497718</p>
                                </div>
                            </div>

                            <div className="account__activity">
                                <p className="account__activityHead">Activity</p>
                                <p className="account__activityDate">Today, Aug 1</p>
                                <TradingPanel
                                    pair={{name: "Deposit", icon: "/images/countries/gb.svg"}}
                                    price={{amount: "+$1,085.18", change: "4:30 pm"}}
                                />

                                <button className="button button--form">Download Transactions</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}