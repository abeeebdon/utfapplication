import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { QRCodeSVG, QRCodeCanvas} from 'qrcode.react';
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { ControlHeader, TradingPanel } from "./SideBar";

export default function WithdrawPage() {
const dispatch = useDispatch();
const countries = useSelector(state => state.configuration.countries);
const usdtLogo = "/images/crypto/usdt.svg"
    let selectedCountry = { isoCode: "NG",
                            numberPrefix: "+234",
                            flag: `/images/countries/ng.svg`,
                            currencyCode:"NGN",
                            currencySymbol: "NGN" }

    const clientSignupForm = useSelector(state => state.clientSignupForm);
    const onFormSubmit2 = async (event) => {
        event.preventDefault();
        $(".withdraw__content").toggleClass("invisible");
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
        <section className="withdraw home">
            <div className="container">
                <div className="deposit__content withdraw__content">
                    <ControlHeader back={{onClick: ()=>window.location.replace("/home")}} title={"Withdraw"} />
                    <div className="">
                        <div className="withdrawalBalance">
                            <TradingPanel
                                pair={{name: "USDT (TRC20)", icon: "/images/crypto/usdt.svg"}}
                                price={{amount: "Available balance", change: "2.23464 USDT"}}
                            />
                        </div>

                        <form onSubmit={onFormSubmit2} className="signup__form">
                            <div className="signup__formInputs">
                                <div className="signup__formInput">
                                    <IconedInput
                                        id={"address"}
                                        name={"address"}
                                        label={"Enter Address Used"}
                                        type={"text"}
                                        placeholder={"Type here"}
                                        required={"required"}
                                        style={{border: "bottom-sm"}}
                                        icon={ { name: "fa fa-barcode", position: "right" } }
                                        error={clientSignupForm.emailField}
                                        onInput={validateEmail}
                                    />
                                </div>

                                <div className="signup__formInput">
                                    <IconedInput
                                        id={"amount"}
                                        name={"amount"}
                                        label={"Amount"}
                                        underLabel={
                                            <>
                                                <ul className="input__passwordRequirements">
                                                    <li className="input__underLabel input__underLabel--passwordRequirements">Please note that minimum withdrawal is $20</li>
                                                    <li className="input__underLabel input__underLabel--passwordRequirements">Withdrawal fee is %1</li>
                                                </ul>
                                            </>
                                        }
                                        type={"text"}
                                        placeholder={"Type here"}
                                        required={"required"}
                                        style={{border: "bottom-sm"}}
                                        error={clientSignupForm.emailField}
                                        onInput={validateEmail}
                                    />
                                </div>
                            </div>

                            <div className="signup--panel__buttonBar">
                                <ButtonForm label={"Withdraw"} />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="deposit__content withdraw__content invisible">
                    <ControlHeader back={{onClick: onFormSubmit2}} title={"Withdraw"} />
                    <div className="withdraw__details">
                        <div className="withdraw__heading">Withdrawal Complete</div>
                        <div className="withdraw__subHeading">Please note that you can't make another withdrawal within 24 hours</div>
                        <div className="withdraw__heading2">Withdrawal Summary</div>
                        <div className="withdraw__summaryTable">
                            <TradingPanel
                                pair={{name: "Withdrawal amount",}}
                                price={{amount: "$1000"}}
                            />
                            <TradingPanel
                                pair={{name: "Withdrawal fee",}}
                                price={{amount: "1%"}}
                            />
                            <TradingPanel
                                pair={{name: "Rewards discount",}}
                                price={{amount: "$20.00"}}
                            />
                        </div>

                        <div className="withdraw__total">
                            <TradingPanel
                                pair={{name: "Total",}}
                                price={{amount: "$999.00"}}
                            />
                        </div>

                        <p className="withdraw__footnote">Please your withdrawal is being verified and it usually takes up to 6 hours for funds to be credited into your account</p>
                    </div>
                </div>
            </div>
        </section>
    );
}