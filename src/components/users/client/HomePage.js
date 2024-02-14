import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";

export default function HomePage() {
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

    return (
        <section className="home home--select">
            <div className="container">
                <SideBar selectedItem={"home"} />
                <div className="home__main">
                    <Header title="Home"/>
                    <div className="home__content">
                        <div className="dashboardBox">
                            <div className="dashboard">
                                <div className="dashboardOverlay"></div>

                                <div className="dashboard__accountName">Tatenda Muzenda</div>
                                <div className="dashboard__balance">
                                    <div className="dashboard__data">
                                        <p className="dashboard__dataHead">Holding Value</p>
                                        <div className="dashboard__dataBody">
                                            <p className="dashboard__figureMajor">$2,509.75</p>
                                            <p className="dashboard__figureMinor">+9.77%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard__invested">
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Invested Value</p>
                                            <p className="dashboard__figureMinor">$1,618.75</p>
                                        </div>
                                    </span>
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Available Balance</p>
                                            <p className="dashboard__figureMinor">$1,589</p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="dashboardAction">
                                <Link to='/deposit'> <ButtonForm label={"Deposit"} /> </Link>
                                <Link to='/withdraw'> <ButtonForm label={"Withdraw"} /> </Link>
                            </div>
                        </div>
                        <div className="trendingBox trendingBox--home">
                            <p className="trendingBox__heading">Trending</p>
                            { [...Array(26)].map((x, key)=>{
                                return <TradingPanel
                                    pair={{name: "GBP/USD", icon: "/images/countries/gb.svg"}}
                                    trendChart={{}}
                                    price={{amount: "$1,085.18", change: "-21.00%"}}
                                    actions={{trade: ()=>navigate("/trade")}}
                                    onClick={()=>navigate("/trade")}
                                />
                              })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}