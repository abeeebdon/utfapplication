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

                        <div>
                            <div className="referralBox">
                                <p className="referralBox__title">Share to make money</p>
                                <p className="referralBox__subTitle">Your referral link</p>
                                <div className="referralBox__codeBox">
                                    <div className="referralBox__code">ljefjwfjfijelkfj99jjeioijwefojwfoj-9jfvnrvjoejf-0virf-rfjov</div>
                                    <div className="referralBox__button">Copy</div>
                                </div>
                            </div>

                            <div className="commissionBox">
                                { [...Array(3)].map((x, key)=>{
                                    return <div className="commission">
                                                <p>First<br/>Commission</p>
                                                <p className="commission__amount">329</p>
                                            </div>
                                  })
                                }
                            </div>

                            <p className="referralBox__title">Total Recommended Members</p>

                            <div className="commissionBox">
                                { [...Array(3)].map((x, key)=>{
                                    return <div className="commission">
                                                <p>First<br/>Level Member</p>
                                                <p className="commission__amount">125</p>
                                            </div>
                                  })
                                }
                            </div>

                            <ul className="input__passwordRequirements">
                                <li className="input__underLabel input__underLabel--passwordRequirements">The commission of the member you recommend will be added to your fund account according to the proportion after transaction is closed</li>
                                <li className="input__underLabel input__underLabel--passwordRequirements">Direct referral income is 10% and indirect is 5%. Referral will depend on the daily trade profit.</li>
                            </ul>

                            <Link to="/term">Terms and Conditions Apply</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}