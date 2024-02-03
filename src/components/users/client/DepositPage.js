import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { QRCodeSVG, QRCodeCanvas} from 'qrcode.react';
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { ControlHeader } from "./SideBar";

export default function DepositPage() {
const dispatch = useDispatch();
const countries = useSelector(state => state.configuration.countries);
const usdtLogo = "/images/crypto/USDT.svg"
    let selectedCountry = { isoCode: "NG",
                            numberPrefix: "+234",
                            flag: `/images/countries/ng.svg`,
                            currencyCode:"NGN",
                            currencySymbol: "NGN" }

    const clientSignupForm = useSelector(state => state.clientSignupForm);
    const onFormSubmit2 = async (event) => {
        event.preventDefault();
        dispatch(showSuccessModal("Please your deposit is still being verified and it usually takes up to 6 hours for your account to be verified", "/home"));
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
        <section className="deposit home">
            <div className="container">
                <div id="stage1" className="deposit__content">
                    <ControlHeader back={{onClick: ()=>window.location.replace("/home")}} close={{onClick: ()=>window.location.replace("/home")}} title={"Deposit"} progress="25%" />
                    <div className="deposit__heading">
                        <div className="deposit__title">Select level</div>
                        <div className="deposit__subTitle">Please note, mininum payable amount is $30</div>
                    </div>

                    <div className="deposit__levels">
                        <div className="deposit__level" onClick={()=>{$("#stage2").show(); $("#stage1").hide()}}>
                            <div className="deposit__levelText">
                                <div className="deposit__levelName">Beginner</div>
                                <div className="deposit__levelDescription deposit__levelNote">Get amazing discount when you opt for this plan</div>
                                <div className="deposit__levelPrices">
                                    <div className="deposit__levelDescription">Amounts</div>
                                    <p className="deposit__levelPrice">$30, $50, $99</p>
                                </div>
                            </div>

                            <div className="deposit__levelAction">
                                <button className="button button--form">Get Started</button>
                                <span className="fa fa-arrow-right invisible"></span>
                            </div>
                        </div>
                        <div className="deposit__level" onClick={()=>{$("#stage2").show(); $("#stage1").hide()}}>
                            <div className="deposit__levelText">
                                <div className="deposit__levelName">Medium</div>
                                <div className="deposit__levelDescription deposit__levelNote">Get amazing discount when you opt for this plan</div>
                                <div className="deposit__levelPrices">
                                    <div className="deposit__levelDescription">Amounts</div>
                                    <p className="deposit__levelPrice">$100, $200, $500, $1000</p>
                                </div>
                            </div>

                            <div className="deposit__levelAction">
                                <button className="button button--form">Get Started</button>
                                <span className="fa fa-arrow-right invisible"></span>
                            </div>
                        </div>
                        <div className="deposit__level" onClick={()=>{$("#stage2").show(); $("#stage1").hide()}}>
                            <div className="deposit__levelText">
                                <div className="deposit__levelName">Advance</div>
                                <div className="deposit__levelDescription deposit__levelNote">Get amazing discount when you opt for this plan</div>
                                <div className="deposit__levelPrices">
                                    <div className="deposit__levelDescription">Amounts</div>
                                    <p className="deposit__levelPrice">$2000, $5000, $10000</p>
                                </div>
                            </div>

                            <div className="deposit__levelAction">
                                <button className="button button--form">Get Started</button>
                                <span className="fa fa-arrow-right invisible"></span>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="stage2" className="deposit__content invisible">
                    <ControlHeader back={{onClick: ()=>{$("#stage1").show(); $("#stage2").hide()}}} close={{onClick: ()=>window.location.replace("/home")}} title={"Deposit"} progress="50%" />
                    <div className="depositLevel">
                        <div className="depositLevel__title">Beginner Level</div>
                        <div className="depositLevel__subTitle">Amounts accepted $30, $50, $99</div>
                        <div className="depositLevel__icon">
                            <Image src={usdtLogo} />
                        </div>
                        <div className="depositLevel__scanBox">
                            <div className="depositLevel__scanCode">{

                                <QRCodeSVG value="0x78760030Bd9c50E7ee0CE0b8E2829095EEC0ef41" size="100"/>

                            }</div>

                        </div>
                        <div> <span className="depositLevel__Dash"></span> Or <span className="depositLevel__Dash"></span> </div>
                        <div className="depositLevel__address">0x78760030Bd9c50E7ee0CE0b8E2829095EEC0ef41</div>
                        <div className="depositLevel__action">
                            <button className="button button--inverted">Copy</button>
                        </div>
                        <div className="depositLevel__subTitle">Please note deposit fee is %1</div>
                        <div className="depositLevel__actionNext">
                            <button className="button button--form"  onClick={()=>{$("#stage3").show(); $("#stage2").hide()}}>Next</button>
                        </div>
                    </div>
                </div>

                <div id="stage3" className="deposit__content invisible">
                    <ControlHeader back={{onClick: ()=>{$("#stage2").show(); $("#stage3").hide()}}} close={{onClick: ()=>window.location.replace("/home")}} title={"Deposit"} progress="75%" />
                    <div className="depositProof">
                        <form onSubmit={onFormSubmit2} className="signup__form">
                            <div className="signup__heading">
                                <span className="signup--panel__text">Proof of Deposit</span>
                            </div>
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
                                        type={"text"}
                                        placeholder={"Type here"}
                                        required={"required"}
                                        style={{border: "bottom-sm"}}
                                        error={clientSignupForm.emailField}
                                        onInput={validateEmail}
                                    />
                                </div>

                                <div className="signup__formInput">
                                    <IconedInput
                                        id={"transactionId"}
                                        name={"transactionId"}
                                        label={"Enter Transaction ID"}
                                        type={"text"}
                                        placeholder={"Type here"}
                                            style={{border: "bottom-sm"}}
                                        required={"required"}
                                        error={clientSignupForm.passwordField}
                                    />
                                </div>

                                <div className="signup__formInput">
                                    <FileUpload
                                        id={"proofUpload"}
                                        name={"proofUpload"}
                                        label={"Proof of Deposit slip"}
                                        type={"text"}
                                        placeholder={"Type here"}
                                        fileFormats={"(PDF/JPG/PNG)"}
                                        error={clientSignupForm.passwordField}
                                    />
                                </div>
                            </div>

                            <div className="signup--panel__buttonBar">
                                <ButtonForm label={"Next"} />
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </section>
    );
}