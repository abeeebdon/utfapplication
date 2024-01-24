import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";

export default function SignupPage() {
const dispatch = useDispatch();
const countries = useSelector(state => state.configuration.countries);
    let selectedCountry = { isoCode: "NG",
                            numberPrefix: "+234",
                            flag: `/images/countries/NG.svg`,
                            currencyCode:"NGN",
                            currencySymbol: "NGN" }

    const clientSignupForm = useSelector(state => state.clientSignupForm);
    const onFormSubmit2 = async (event) => {
        event.preventDefault();
        dispatch(showSuccessModal("We will very your account and get back to you once we are done checking", "/"));
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
        <>
            <section className="signup signup--panel">
                <div className="container">
                    <div className="signup--panel__head">
                        <span className="signup__logo">
                            <Image src={logo}/>
                        </span>

                        <p className="signup--panel__headText">Join Universal FX</p>
                    </div>
                    <div className="signup--panel__trackBar">
                        <span className="signup--panel__track"></span>
                        <span className="signup--panel__track"></span>
                    </div>
                    <div className="signup--panel__body">
                        <div className="signup--panel__sidebar">
                            <div className="signup--panel__text"><span>1</span><span>/</span><span>2</span></div>
                            <ul className="signup--panel__sidebarMenu">
                                <li id="verification" className="signup--panel__sidebarMenuItem signup--panel__sidebarMenuItem--active">
                                    <span className="signup--panel__sidebarMenuIcon fa fa-user"></span>
                                    Verifications
                                </li>
                                <li id="personalInfo" className="signup--panel__sidebarMenuItem">
                                    <span className="signup--panel__sidebarMenuIcon fa fa-book"></span>
                                    Personal Info
                                </li>
                            </ul>
                        </div>
                        <div id="verificationPanel" className="signup--panel__main">
                            <form onSubmit={onFormSubmit} className="signup__form">
                                <div className="signup__heading">
                                    <span className="signup--panel__text">Verifications</span>
                                </div>
                                <div className="signup__formInputs">
                                    <div className="signup__formInput signup__google">
                                        <IconedInput
                                            id={"google"}
                                            name={"goggle"}
                                            type={"text"}
                                            placeholder={"Sign in with google"}
                                            custom={ <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 36 36" fill="none">
                                                          <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.2405 24.4928 21.9172 27 18 27C13.0297 27 9 22.9702 9 18C9 13.0297 13.0297 9 18 9C20.2943 9 22.3815 9.8655 23.9708 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C9.71625 3 3 9.71625 3 18C3 26.2838 9.71625 33 18 33C26.2838 33 33 26.2838 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#FFC107"/>
                                                          <path d="M4.72949 11.0182L9.65774 14.6325C10.9912 11.331 14.2207 9 18 9C20.2942 9 22.3815 9.8655 23.9707 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C12.2385 3 7.24199 6.25275 4.72949 11.0182Z" fill="#FF3D00"/>
                                                          <path d="M18.0002 33C21.8747 33 25.3952 31.5173 28.057 29.106L23.4145 25.1775C21.8579 26.3613 19.9558 27.0016 18.0002 27C14.0987 27 10.786 24.5123 9.53798 21.0405L4.64648 24.8093C7.12898 29.667 12.1705 33 18.0002 33Z" fill="#4CAF50"/>
                                                          <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.8857 22.6623 24.82 24.1149 23.412 25.1782L23.4142 25.1768L28.0568 29.1052C27.7283 29.4037 33 25.5 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#1976D2"/>
                                                    </svg>
                                            }
                                            error={clientSignupForm.emailField}
                                            onInput={validateEmail}
                                        />
                                    </div>
                                    <p className="signup__google signup__agreementText">Or</p>
                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"email"}
                                            name={"email"}
                                            label={"Email"}
                                            underLabel={"A verification code will be sent via mail to your address"}
                                            type={"email"}
                                            placeholder={"Type here"}
                                            required={"required"}
                                            error={clientSignupForm.emailField}
                                            style={{border: "bottom-sm"}}
                                            onInput={validateEmail}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"password"}
                                            name={"password"}
                                            label={"Password"}
                                            type={"password"}
                                            passwordRequirements={"w"}
                                            placeholder={"Type here"}
                                            required={"required"}
                                            icon={ { name: "fa fa-eye", position: "right", onClick: togglePasswordVisibility } }
                                            style={{border: "bottom-sm"}}
                                            error={clientSignupForm.passwordField}
                                        />
                                    </div>

                                    <p className="signup__agreementText">By continuing you agree to our <Link to="/">Terms and Conditions</Link> and <Link to="/">Privacy Policy</Link></p>

                                    <div className="signup--panel__buttonBar">
                                        <ButtonForm label={"Next"} />
                                    </div>
                                </div>

                                <div className="signup__google-sm">
                                    <div> <span className="signup__googleDash"></span> Or <span className="signup__googleDash"></span> </div>

                                    <div className="signup__googleIcon-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 36 36" fill="none">
                                              <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.2405 24.4928 21.9172 27 18 27C13.0297 27 9 22.9702 9 18C9 13.0297 13.0297 9 18 9C20.2943 9 22.3815 9.8655 23.9708 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C9.71625 3 3 9.71625 3 18C3 26.2838 9.71625 33 18 33C26.2838 33 33 26.2838 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#FFC107"/>
                                              <path d="M4.72949 11.0182L9.65774 14.6325C10.9912 11.331 14.2207 9 18 9C20.2942 9 22.3815 9.8655 23.9707 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C12.2385 3 7.24199 6.25275 4.72949 11.0182Z" fill="#FF3D00"/>
                                              <path d="M18.0002 33C21.8747 33 25.3952 31.5173 28.057 29.106L23.4145 25.1775C21.8579 26.3613 19.9558 27.0016 18.0002 27C14.0987 27 10.786 24.5123 9.53798 21.0405L4.64648 24.8093C7.12898 29.667 12.1705 33 18.0002 33Z" fill="#4CAF50"/>
                                              <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.8857 22.6623 24.82 24.1149 23.412 25.1782L23.4142 25.1768L28.0568 29.1052C27.7283 29.4037 33 25.5 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#1976D2"/>
                                        </svg>
                                    </div>
                                </div>

                                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                            </form>
                        </div>

                        <div id="personalInfoPanel" className="signup--panel__main invisible">
                            <form onSubmit={onFormSubmit2} className="signup__form">
                                <div className="signup__heading">
                                    <span className="signup--panel__text">Personal Information</span>
                                </div>
                                <div className="signup__formInputs">
                                    <span className="signup__formDualInputs signup__formDualInputs--split-sm">
                                        <div className="signup__formInput">
                                            <IconedInput
                                                id={"firstName"}
                                                name={"firstName"}
                                                label={"First Name"}
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
                                                id={"lastName"}
                                                name={"lastName"}
                                                label={"Last Name"}
                                                type={"text"}
                                                placeholder={"Type here"}
                                                required={"required"}
                                                style={{border: "bottom-sm"}}
                                                error={clientSignupForm.emailField}
                                                onInput={validateEmail}
                                            />
                                        </div>
                                    </span>

                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"nin"}
                                            name={"nin"}
                                            label={"National Identification Number"}
                                            type={"text"}
                                            placeholder={"Type here"}
                                                style={{border: "bottom-sm"}}
                                            required={"required"}
                                            error={clientSignupForm.passwordField}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <FileUpload
                                            id={"ninUpload"}
                                            name={"ninUpload"}
                                            label={"National ID picture"}
                                            type={"text"}
                                            placeholder={"Type here"}
                                            fileFormats={"(PDF/JPG/PNG)"}
                                            error={clientSignupForm.passwordField}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <CheckBoxInput
                                            id={"sendSMSUpdate"}
                                            name={"sendSMSUpdate"}
                                            label={"Send SMS Update about my account"}
                                            required={"required"}
                                            error={clientSignupForm.agreeToTermsField}
                                            onInput={"validateCheckBox"}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"street"}
                                            name={"street"}
                                            label={"Street Address"}
                                            type={"text"}
                                            style={{border: "bottom-sm"}}
                                            placeholder={"Type here"}
                                            required={"required"}
                                            error={clientSignupForm.passwordField}
                                        />
                                    </div>

                                    <span className="signup__formDualInputs">
                                        <div className="signup__formInput">
                                            <IconedInput
                                                id={"state"}
                                                name={"state"}
                                                label={"State"}
                                                type={"select"}
                                                required={"required"}
                                                style={{border: "bottom-sm"}}
                                                logo={ { src: selectedCountry.flag } }
                                                options={countries}
                                                error={clientSignupForm.emailField}
                                                onInput={validateEmail}
                                            />
                                        </div>

                                        <div className="signup__formInput">
                                            <IconedInput
                                                id={"city"}
                                                name={"city"}
                                                label={"City"}
                                                type={"select"}
                                                required={"required"}
                                                options={countries}
                                                style={{border: "bottom-sm"}}
                                                error={clientSignupForm.emailField}
                                                onInput={validateEmail}
                                            />
                                        </div>
                                    </span>
                                </div>

                                <div className="signup--panel__buttonBar">
                                    <ButtonInverted label={"Skip For Now"} />
                                    <ButtonForm label={"Next"} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="signup signup__verification invisible">
                <div className="container">
                    <span className="overlay--fixed"></span>
                    <form onSubmit={onVerificationFormSubmit} className="signup__form">
                        <div className="signup__verificationControl" onClick={onVerificationFormSubmit}><span className="signup__verificationControlIcon fas fa-angle-left"></span>Back</div>
                        <p className="signup__verificationHead">Verify It's You</p>
                        <p className="signup__verificationText">We sent a code to (********021@gmail.com)<br/>Enter it here to verify your identity.</p>
                        <div className="signup__formInputs">
                            <p className="signup__verificationFormInputsText">Digits Verification Code</p>
                            <div className="signup__verificationInput">
                            {
                                [...Array(5)].map((x, key)=>{
                                    return <SingleInput
                                            key={key}
                                            id={`digit${key}`}
                                            name={`digit${key}`}
                                            type={"text"}
                                            required={"required"}
                                            error={clientSignupForm.verificationField}
                                        />
                                })
                            }
                            </div>


                            <p className="signup__verificationText">
                                Code expires in <span className="signup__verificationCountDown">{verificationTokenExpiryTimeLeft}</span>
                            </p>

                            <p className="signup__verificationText">
                            {
                                clientSignupForm.verificationField.hasError && <span className={`input__errorMessage ${clientSignupForm.verificationField.hasError? "visible" : "invisible"}`}>{clientSignupForm.verificationField.errorMessage}</span>
                            }
                            </p>

                            <div className="signup__verificationButton">
                                <ButtonForm label={"Next"} />
                            </div>
                        </div>
                        <p className="">Didn't receive the code? <span onClick={sendVerificationToken} className="signup__verificationResend">Request a new one</span></p>
                    </form>
                </div>
            </section>
        </>
    );
}