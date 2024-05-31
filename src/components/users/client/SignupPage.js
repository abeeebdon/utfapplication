import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import $ from 'jquery';
import { GoogleLogin } from '@react-oauth/google';

import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";

import { setVerificationTokenExpiryTimeLeft, setVerificationField, setStage, setFormData, setFirstNameField, setLastNameField, setEmailField, setPasswordField, setConfirmPasswordField, setAgreeToTermsField, resetFields, resetVerificationFields } from '../../../state/actions/clientSignupForm';
import { selectVerificationTokenEndpoint, selectVerifyEmailEndpoint, selectRegisterUserEndpoint, selectUploadCredentialsEndpoint, selectGoogleLoginEndpoint } from '../../../state/selectors/endpoints';
import { setAuthentication, setUser, setLoggedIn, setWallets, resetAll, setTransactions, setOnboarded } from '../../../state/actions/account';
import API from '../../../api/api.mjs';
import { populateUser } from '../../../api/user.js';
import { populatePairs, setConfig } from '../../../api/configuration.js';

export default function SignupPage() {
    useEffect(() => {
        setConfig();
    }, []);

    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const referrer = queryParams.get("referrer")

    let api = new API();
    let countDown = localStorage.getItem('id');

    const [countryCode, setCountryCode] = useState("");
    const countries = useSelector(state => state.configuration.countries);
    let selectedCountry = {
        isoCode: countryCode,
        flag: countryCode && `/images/countries/${countryCode.toLowerCase()}.svg`
    }

    const [files, setFiles] = useState([]);

    const clientSignupForm = useSelector(state => state.clientSignupForm);
    let getVerificationTokenURL = useSelector(state => selectVerificationTokenEndpoint(state.endpoints));
    let getVerifyEmailURL = useSelector(state => selectVerifyEmailEndpoint(state.endpoints));
    let getRegisterUserURL = useSelector(state => selectRegisterUserEndpoint(state.endpoints));
    let getUploadCredentialsURL = useSelector(state => selectUploadCredentialsEndpoint(state.endpoints));
    let getGoogleLoginURL = useSelector(state => selectGoogleLoginEndpoint(state.endpoints));
    let verificationTokenExpiryTimeLeft = useSelector(state => state.clientSignupForm.verificationTokenExpiryTimeLeft);
    let verificationTokenValidityDuration = useSelector(state => state.clientSignupForm.verificationTokenValidityDuration);
    const logo = useSelector(state => state.configuration.app.logo);
    let errorExist = false

    const togglePasswordVisibility = async (event) => {
        let password = document.getElementById("password");
        if (password.type == "password") {
            password.type = "text";
        }
        else {
            password.type = "password"
        }
    }

    const closeVerificationForm = (event) => {
        //        event.preventDefault();
        dispatch(resetVerificationFields());
        $(".signup__verification").addClass("invisible")
    }

    const showVerificationPanel = () => {
        $(".signup__verification").removeClass("invisible")
        var countDownDate = new Date();
        countDownDate.setMinutes(countDownDate.getMinutes() + verificationTokenValidityDuration);
        countDownDate = countDownDate.getTime();

        countDown = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            if (distance <= 0) {
                clearInterval(countDown)
                return;
            }

            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            dispatch(setVerificationTokenExpiryTimeLeft(`${minutes}:${seconds}`))
        }, 1000);

        localStorage.setItem('id', countDown);
    }

    const validatePassword = (event) => {
        let errorFlag = false
        let password = $("#password").val()

        if (password.length < 8) {
            errorFlag = true;
            $("#passwordLength").addClass("input__errorMessage")
        }
        else {
            $("#passwordLength").removeClass("input__errorMessage")
        }

        if (!/[A-Z]/.test(password)) {
            errorFlag = true;
            $("#uppercase").addClass("input__errorMessage")
        }
        else {
            $("#uppercase").removeClass("input__errorMessage")
        }

        if (!/[a-z]/.test(password)) {
            errorFlag = true;
            $("#lowercase").addClass("input__errorMessage")
        }
        else {
            $("#lowercase").removeClass("input__errorMessage")
        }

        if (!/\d/.test(password)) {
            errorFlag = true;
            $("#digit").addClass("input__errorMessage")
        }
        else {
            $("#digit").removeClass("input__errorMessage")
        }

        if (!/\W/.test(password)) {
            errorFlag = true;
            $("#specialChar").addClass("input__errorMessage")
        }
        else {
            $("#specialChar").removeClass("input__errorMessage")
        }

        if (errorFlag == true) {
            dispatch(setPasswordField({ hasError: true, errorMessage: "Please fix the error(s) before proceeding!" }));
        }
        else {
            dispatch(setPasswordField({ hasError: false, errorMessage: "" }));
        }

        return !errorFlag
    }

    const validateEmail = (event) => {
        let errorFlag = false
        let email = $("#email").val()

        if (!/[a-z]/.test(email)) {
            errorFlag = true;
        }

        if (errorFlag == true) {
            dispatch(setEmailField({ hasError: true, errorMessage: "Invalid email!" }));
        }
        else {
            dispatch(setEmailField({ hasError: false, errorMessage: "" }));
        }

        return !errorFlag
    }

    const validateFirstName = () => {
        let firstNameField = document.getElementById("firstName");
        if (firstNameField.value.length > 3) {
            dispatch(setFirstNameField({ hasError: false, errorMessage: "" }));
        }
        else {
            dispatch(setFirstNameField({ hasError: true, errorMessage: "Name must be greater than 3 characters" }));
            errorExist = true;
        }

        return !errorExist
    }

    const validateLastName = async (input) => {
        let lastNameField = document.getElementById("lastName");

        if (lastNameField.value.length > 3) {
            dispatch(setLastNameField({ hasError: false, errorMessage: "" }));
        }
        else {
            dispatch(setLastNameField({ hasError: true, errorMessage: "Name must be greater than 3 characters" }));
            errorExist = true;
        }

        return !errorExist
    }

    const validateCheckBox = async (input) => {
        let checkboxField = document.getElementById("sendSMSUpdate");

        //        if(checkboxField.checked == true){
        //            dispatch(setAgreeToTermsField({ hasError: false, errorMessage: "" }));
        //        }
        //        else {
        //            dispatch(setAgreeToTermsField({ hasError: true, errorMessage: (input.type == "checkbox") ? "Please tick the box" : "Input cannot be blank" }));
        //            errorExist = true;
        //        }
    }

    const chooseCountry = async (target) => {
        let countryCode = target.value;

        setCountryCode(countryCode)
        //        $("#countryInput").nextAll().addClass("invisible")
        //        $("#countryInput").nextAll().find("input").val("").change();
        //        $("#countryInput").nextAll().find("select").prop("selectedIndex", 0).blur();
        ////        $("#countryInput").nextAll().find("select").siblings(".inputIcon__logo").remove();
        //
        //        if(countryCode){
        //            $("#countryInput").next().removeClass("invisible")
        //        }
    }


    const collectVerificationInfo = async (event) => {
        event.preventDefault();
        dispatch(resetFields());

        if (validateEmail() && validatePassword()) {
            let email = document.getElementById("email").value;
            let firstName;
            let lastName;
            let password = document.getElementById("password").value;

            dispatch(setFormData({ email, firstName, lastName, password }));

            $(".signup__verification").addClass("invisible")

            $("#verification").removeClass("signup--panel__sidebarMenuItem--active");
            $("#verificationPanel").addClass("invisible");

            $("#personalInfo").addClass("signup--panel__sidebarMenuItem--active");
            $("#personalInfoPanel").removeClass("invisible");

            $(".trackText").html("<span style='color: blue'}> <span>2</span><span>/</span><span>2</span> </span>");
        }

    }

    const registerAccount = async (event) => {
        event.preventDefault();
        dispatch(resetFields());

        if (validateFirstName() && validateLastName() && validateEmail() && validatePassword() && files.length > 0) {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let full_name = `${firstName} ${lastName}`
            let country = document.getElementById("country").value;
            let street = document.getElementById("street").value;
            let nin = document.getElementById("nin").value;
            let ninDoc = files[0]

            let formData = new FormData()
            formData.append('state', country)
            formData.append('city', country)
            formData.append('street_address', street)
            formData.append('nin', nin)
            formData.append('nin_picture', ninDoc)

            dispatch(setFormData({ email, firstName, lastName, password }))

            return api.post(
                getRegisterUserURL(),
                { email, full_name, password, referrer },
                {},
                (response) => {
                    showVerificationPanel();
                    api.postWithFile(getUploadCredentialsURL(), formData)
                },
                (errorMessage) => {
                    dispatch(showErrorModal(errorMessage));
                }
            )
        }



        /*api.post(
            getRegisterUserURL(),
            formData,
            (response)=>{
                dispatch(showSuccessModal("We will very your account and get back to you once we are done checking", "/home"));
//                login(formData.email, formData.password)
//                .catch((err)=>{
//                    dispatch(showErrorModal(err.message))
//                    stopSpin(button);
//                })
//                .then(()=>{
//                    stopSpin(button);
//
//                })
            },
            (errorMessage)=>{
                dispatch(showErrorModal(errorMessage));
            }
        )*/
    }

    const requestVerificationToken = async (event) => {
        //        if(event){
        //            event.target.parentNode.previousSibling.reset();
        //        }

        let email = $("#email").val();
        clearInterval(countDown)
        dispatch(resetVerificationFields());
        api.post(
            getVerificationTokenURL(),
            { email },
            {},
            (response) => {
                showVerificationPanel()
            },
            (errorMessage) => {
                dispatch(showErrorModal(errorMessage));
            }
        )
    }

    const activateAccount = async (event) => {
        event.preventDefault();
        dispatch(resetVerificationFields());
        let email = $("#email").val();
        let token = "";

        for (let i = 0; i < 6; i++) {
            let child = event.target[i];
            token = `${token}${child.value}`
        }

        try {
            api.post(
                getVerifyEmailURL(),
                { email, token },
                {},
                (response) => {
                    console.log('response', response);
                    if (response.status === 'error') {
                        console.log('there was an error');
                        return
                    }
                    closeVerificationForm();
                    dispatch(resetAll())
                    dispatch(setAuthentication(response))
                    dispatch(setLoggedIn(true))
                    populateUser()
                    return dispatch(showSuccessModal("You account has been registered and you can proceed to your personal area!", "/home"));
                },
                async (errorMessage) => {
                    dispatch(setVerificationField({ hasError: true, errorMessage: errorMessage }));
                }
            )
        } catch (error) {

            console.log('there was an error', error);
        }


    }

    const googleLogin = async (auth_token) => {
        event.preventDefault();

        api.post(
            getGoogleLoginURL(),
            { auth_token },
            {},
            (response) => {
                //                dispatch(resetAll())
                //                dispatch(setAuthentication(response))
                //                dispatch(setLoggedIn(true))
                //                populateUser()
                //                return dispatch(showSuccessModal("You account has been registered and you can proceed to your personal area!", "/home"));
            },
            async (errorMessage) => {
                dispatch(setVerificationField({ hasError: true, errorMessage: errorMessage }));
            }
        )
    }

    return (
        <>
            <section className="signup signup--panel">
                <div className="container">
                    <div className="signup--panel__head">
                        <span className="signup__logo">
                            <Image src={logo} />
                        </span>

                        <p className="signup--panel__headText">Join Universal FX</p>
                    </div>
                    <div className="signup--panel__trackBar">
                        <span className="signup--panel__track"></span>
                        <span className="signup--panel__track"></span>
                    </div>
                    <div className="signup--panel__body">
                        <div className="signup--panel__sidebar">
                            <div className="signup--panel__text trackText"><span style={{ color: "blue" }}>1</span><span>/</span><span>2</span></div>
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
                            <form onSubmit={collectVerificationInfo} className="signup__form">
                                <div className="signup__heading">
                                    <span className="signup--panel__text">Verifications</span>
                                </div>
                                <div className="signup__formInputs">
                                    <div id="signup__google" className="signup__formInput signup__google">
                                        <IconedInput
                                            id={"google"}
                                            name={"goggle"}
                                            type={"text"}
                                            disabled={"disabled"}
                                            placeholder={"Sign in with google"}
                                            custom={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 36 36" fill="none">
                                                <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.2405 24.4928 21.9172 27 18 27C13.0297 27 9 22.9702 9 18C9 13.0297 13.0297 9 18 9C20.2943 9 22.3815 9.8655 23.9708 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C9.71625 3 3 9.71625 3 18C3 26.2838 9.71625 33 18 33C26.2838 33 33 26.2838 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#FFC107" />
                                                <path d="M4.72949 11.0182L9.65774 14.6325C10.9912 11.331 14.2207 9 18 9C20.2942 9 22.3815 9.8655 23.9707 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C12.2385 3 7.24199 6.25275 4.72949 11.0182Z" fill="#FF3D00" />
                                                <path d="M18.0002 33C21.8747 33 25.3952 31.5173 28.057 29.106L23.4145 25.1775C21.8579 26.3613 19.9558 27.0016 18.0002 27C14.0987 27 10.786 24.5123 9.53798 21.0405L4.64648 24.8093C7.12898 29.667 12.1705 33 18.0002 33Z" fill="#4CAF50" />
                                                <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.8857 22.6623 24.82 24.1149 23.412 25.1782L23.4142 25.1768L28.0568 29.1052C27.7283 29.4037 33 25.5 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#1976D2" />
                                            </svg>
                                            }
                                        />
                                        <GoogleLogin onSuccess={(response) => googleLogin(response.access_token)} onError={(errorMessage) => dispatch(showErrorModal(errorMessage))} />
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
                                            style={{ border: "bottom-sm" }}
                                            onInput={validateEmail}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"password"}
                                            name={"password"}
                                            label={"Password"}
                                            underLabel={
                                                <ul className="input__passwordRequirements">
                                                    <li id="passwordLength" className="input__underLabel input__underLabel--passwordRequirements">At least 8 characters</li>
                                                    <li id="uppercase" className="input__underLabel input__underLabel--passwordRequirements">At least one uppercase letter</li>
                                                    <li id="lowercase" className="input__underLabel input__underLabel--passwordRequirements">At least one lowercase letter</li>
                                                    <li id="digit" className="input__underLabel input__underLabel--passwordRequirements">At least one number letter</li>
                                                    <li id="specialChar" className="input__underLabel input__underLabel--passwordRequirements">At least one special character</li>
                                                </ul>
                                            }
                                            type={"password"}
                                            placeholder={"Type here"}
                                            required={"required"}
                                            icon={{ name: "fa fa-eye", position: "right", onClick: togglePasswordVisibility }}
                                            style={{ border: "bottom-sm" }}
                                            onInput={validatePassword}
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

                                    <div className="signup__googleIcon-sm" onClick={() => $(".signup__google *").click()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 36 36" fill="none">
                                            <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.2405 24.4928 21.9172 27 18 27C13.0297 27 9 22.9702 9 18C9 13.0297 13.0297 9 18 9C20.2943 9 22.3815 9.8655 23.9708 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C9.71625 3 3 9.71625 3 18C3 26.2838 9.71625 33 18 33C26.2838 33 33 26.2838 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#FFC107" />
                                            <path d="M4.72949 11.0182L9.65774 14.6325C10.9912 11.331 14.2207 9 18 9C20.2942 9 22.3815 9.8655 23.9707 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C12.2385 3 7.24199 6.25275 4.72949 11.0182Z" fill="#FF3D00" />
                                            <path d="M18.0002 33C21.8747 33 25.3952 31.5173 28.057 29.106L23.4145 25.1775C21.8579 26.3613 19.9558 27.0016 18.0002 27C14.0987 27 10.786 24.5123 9.53798 21.0405L4.64648 24.8093C7.12898 29.667 12.1705 33 18.0002 33Z" fill="#4CAF50" />
                                            <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.8857 22.6623 24.82 24.1149 23.412 25.1782L23.4142 25.1768L28.0568 29.1052C27.7283 29.4037 33 25.5 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#1976D2" />
                                        </svg>
                                    </div>
                                </div>

                                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                            </form>
                        </div>

                        <div id="personalInfoPanel" className="signup--panel__main invisible">
                            <form onSubmit={registerAccount} className="signup__form">
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
                                                style={{ border: "bottom-sm" }}
                                                error={clientSignupForm.emailField}
                                                onInput={validateFirstName}
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
                                                style={{ border: "bottom-sm" }}
                                                error={clientSignupForm.emailField}
                                                onInput={validateLastName}
                                            />
                                        </div>
                                    </span>

                                    {/*<span className="signup__formDualInputs">*/}
                                    <div id="countryInput" className="signup__formInput">
                                        <IconedInput
                                            id={"country"}
                                            name={"country"}
                                            label={"Country"}
                                            type={"select"}
                                            required={"required"}
                                            style={{ border: "bottom-sm" }}
                                            logo={{ src: selectedCountry.flag }}
                                            options={countries}
                                            onInput={chooseCountry}
                                        />
                                    </div>

                                    {/*<div className="signup__formInput">
                                            <IconedInput
                                                id={"city"}
                                                name={"city"}
                                                label={"City"}
                                                type={"select"}
                                                required={"required"}
                                                options={countries}
                                                style={{border: "bottom-sm"}}
                                                error={clientSignupForm.emailField}
                                            />
                                        </div>
                                    </span>*/}

                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"street"}
                                            name={"street"}
                                            label={"Street Address"}
                                            type={"text"}
                                            style={{ border: "bottom-sm" }}
                                            placeholder={"Type here"}
                                            required={"required"}
                                            error={clientSignupForm.passwordField}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <IconedInput
                                            id={"nin"}
                                            name={"nin"}
                                            label={"National Identification Number"}
                                            type={"text"}
                                            placeholder={"Type here"}
                                            style={{ border: "bottom-sm" }}
                                            required={"required"}
                                            error={clientSignupForm.passwordField}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <FileUpload
                                            id={"ninUpload"}
                                            name={"ninUpload"}
                                            label={"National ID picture"}
                                            fileFormats={"(PDF/JPG/PNG)"}
                                            onFilesSelected={setFiles}
                                        />
                                    </div>

                                    <div className="signup__formInput">
                                        <CheckBoxInput
                                            id={"sendSMSUpdate"}
                                            name={"sendSMSUpdate"}
                                            label={"Send SMS Update about my account"}
                                            required={"required"}
                                            error={clientSignupForm.agreeToTermsField}
                                            onInput={validateCheckBox}
                                        />
                                    </div>
                                </div>

                                <div className="signup--panel__buttonBar">
                                    {/*<ButtonInverted label={"Skip For Now"} />*/}
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
                    <form onSubmit={activateAccount} className="signup__form">
                        <div className="signup__verificationControl" onClick={closeVerificationForm}><span className="signup__verificationControlIcon fas fa-angle-left"></span>Back</div>
                        <p className="signup__verificationHead">Verify It's You</p>
                        <p className="signup__verificationText">We sent a code to ({$("#email").val()})<br />Enter it here to verify your identity.</p>
                        <div className="signup__formInputs">
                            <p className="signup__verificationFormInputsText">Digits Verification Code</p>
                            <div className="signup__verificationInput">
                                {
                                    [...Array(5)].map((x, key) => {
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
                                    clientSignupForm.verificationField.hasError && <span className={`input__errorMessage ${clientSignupForm.verificationField.hasError ? "visible" : "invisible"}`}>{clientSignupForm.verificationField.errorMessage}</span>
                                }
                            </p>

                            <div className="signup__verificationButton">
                                <ButtonForm label={"Next"} />
                            </div>
                        </div>
                        <p className="">Did not receive the code? <span onClick={requestVerificationToken} className="signup__verificationResend">Request a new one</span></p>
                    </form>
                </div>
            </section>
        </>
    );
}