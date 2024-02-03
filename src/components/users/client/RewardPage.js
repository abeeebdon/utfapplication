import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";

export default function RewardPage() {
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
        <section className="home reward">
            <div className="container">
                <SideBar selectedItem={"reward"} />
                <div className="home__main">
                    <Header title="Reward"/>
                    <div className="home__content">
                        <div className="trendingBox">
                            <p className="trendingBox__heading">Earn by Referrals</p>
                            <div className="rewardBanners">
                                <div className="rewardBanner">
                                    <div className="rewardBanner__caption">
                                        <p className="rewardBanner__title">Reward</p>
                                        <p className="rewardBanner__text">Like, Share <br/>& get free Crypto</p>
                                        <button className="button">Start Now</button>
                                    </div>
                                    <div className="rewardBanner__imageBox">
                                        <div className="rewardBanner__image">
                                            <Image src="/images/like.png"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="rewardBanner">
                                    <div className="rewardBanner__caption">
                                        <p className="rewardBanner__title">Refer and Earn</p>
                                        <p className="rewardBanner__text">Refer Your Friend and Win Cryptocoins</p>
                                        <button className="button">Refer Now</button>
                                    </div>
                                    <div className="rewardBanner__imageBox">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}