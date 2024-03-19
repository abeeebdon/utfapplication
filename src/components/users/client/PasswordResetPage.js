import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";

import { setVerificationTokenExpiryTimeLeft, setVerificationField, setStage, setFormData, setFirstNameField, setLastNameField, setEmailField, setPasswordField, setConfirmPasswordField, setAgreeToTermsField, resetFields, resetVerificationFields } from '../../../state/actions/clientSignupForm';
import { selectVerificationTokenEndpoint, selectVerifyLoginEndpoint, selectRequestResetPasswordEndpoint, selectSubmitPasswordRecoveryCodeEndpoint, selectResetPasswordEndpoint } from '../../../state/selectors/endpoints';
import { setAuthentication, setUser, setLoggedIn, setWallets, resetAll, setTransactions, setOnboarded } from '../../../state/actions/account';
import API from '../../../api/api.mjs';
import { populateUser } from '../../../api/user.js';
import { populatePairs } from '../../../api/configuration.js';

export default function PasswordResetPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let api = new API();
    let countDown = localStorage.getItem('id');
    const [authCode, setAuthCode] = useState("");


    useEffect(()=>{
        dispatch(resetFields());
    }, []);

    const clientSignupForm = useSelector(state => state.clientSignupForm);

    let getRequestResetPasswordURL = useSelector(state => selectRequestResetPasswordEndpoint(state.endpoints));
    let getSubmitPasswordRecoveryCodeURL = useSelector(state => selectSubmitPasswordRecoveryCodeEndpoint(state.endpoints));
    let getResetPasswordURL = useSelector(state => selectResetPasswordEndpoint(state.endpoints));

    let verificationTokenExpiryTimeLeft = useSelector(state => state.clientSignupForm.verificationTokenExpiryTimeLeft);
    let verificationTokenValidityDuration = useSelector(state => state.clientSignupForm.verificationTokenValidityDuration);
    const logo = useSelector(state => state.configuration.app.logo);

    const togglePasswordVisibility = async (event) => {
        let password = document.getElementById("password");
        if(password.type == "password"){
            password.type = "text";
        }
        else{
            password.type = "password"
        }
    }

    const closeVerificationForm = async (event) => {
        dispatch(resetVerificationFields());
        $(".signup__verification").addClass("invisible")
    }

    const showVerificationPanel = ()=>{
        $(".signup__verification").removeClass("invisible")
        var countDownDate = new Date();
        countDownDate.setMinutes(countDownDate.getMinutes() + verificationTokenValidityDuration);
        countDownDate = countDownDate.getTime();

        countDown = setInterval(function() {
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

    const showPasswordResetPanel = ()=>{
        closeVerificationForm()
        $(".passwordReset__panel").removeClass("invisible")
        $(".signin--panel").addClass("invisible")
    }

    const validateEmail = async (event) => {
        let errorFlag = false
        let email = $("#email").val()

        if(!/[a-z]/.test(email)){
            errorFlag = true;
        }

        if(errorFlag == true){
            dispatch(setEmailField({ hasError: true, errorMessage: "Invalid email!" }));
        }
        else {
            dispatch(setEmailField({ hasError: false, errorMessage: "" }));
        }

        return errorFlag
    }

    const validatePassword = (event) => {
        let errorFlag = false
        let password = $("#password").val()

        if(password.length < 8){
            errorFlag = true;
            $("#passwordLength").addClass("input__errorMessage")
        }
        else {
            $("#passwordLength").removeClass("input__errorMessage")
        }

        if(!/[A-Z]/.test(password)){
            errorFlag = true;
            $("#uppercase").addClass("input__errorMessage")
        }
        else {
            $("#uppercase").removeClass("input__errorMessage")
        }

        if(!/[a-z]/.test(password)){
            errorFlag = true;
            $("#lowercase").addClass("input__errorMessage")
        }
        else {
            $("#lowercase").removeClass("input__errorMessage")
        }

        if(!/\d/.test(password)){
            errorFlag = true;
            $("#digit").addClass("input__errorMessage")
        }
        else {
            $("#digit").removeClass("input__errorMessage")
        }

        if(!/\W/.test(password)){
            errorFlag = true;
            $("#specialChar").addClass("input__errorMessage")
        }
        else {
            $("#specialChar").removeClass("input__errorMessage")
        }

        if(errorFlag == true){
            dispatch(setPasswordField({ hasError: true, errorMessage: "Please fix the error(s) before proceeding!" }));
        }
        else {
            dispatch(setPasswordField({ hasError: false, errorMessage: "" }));
        }

        return !errorFlag
    }



    const requestPasswordReset = async (event) => {
        event.preventDefault();
        dispatch(resetFields());

        clearInterval(countDown)
        dispatch(resetVerificationFields());

        if(validateEmail()) {
            let email = document.getElementById("email").value;
            let formData = { email }

//            dispatch(setFormData({ email, firstName, lastName, password }));

            return api.post(
                getRequestResetPasswordURL(),
                formData,
                {},
                (response)=>{
                    showVerificationPanel();
                },
                (errorMessage)=>{
                    dispatch(showErrorModal(errorMessage));
                }
            )
        }
    }

    const verifyPasswordReset = async (event) => {
        event.preventDefault();
        dispatch(resetVerificationFields());
        let email = $("#email").val();
        let token = "";

        for(let i=0; i<6; i++){
            let child = event.target[i];
            token = `${token}${child.value}`
        }

        api.post(
            getSubmitPasswordRecoveryCodeURL(),
            {email, token},
            {},
            async (response)=>{
                await closeVerificationForm();
                await dispatch(resetAll())
                setAuthCode(response.recovery_jwt)
                showPasswordResetPanel();
            },
            async (errorMessage)=>{
                dispatch(setVerificationField({hasError: true, errorMessage: errorMessage}));
            }
        )
    }

    const resetPassword = async (event) => {
        event.preventDefault();
        dispatch(resetFields());

        clearInterval(countDown)
        dispatch(resetVerificationFields());

        if(validateEmail() && validatePassword()) {
            let password = document.getElementById("password").value;
            let formData = { password, app_recovery_jwt: authCode }

            return api.post(
                getResetPasswordURL(),
                formData,
                {},
                (response)=>{
                    dispatch(showSuccessModal("Your password has been successfully reset. Proceed to signin", "/signin"));
                },
                (errorMessage)=>{
                    dispatch(showErrorModal(errorMessage));
                }
            )
        }
    }




   /* const requestVerificationToken = async (event)=>{
        if(event){
            event.target.parentNode.previousSibling.reset();
        }

        let email = $("#email").val();
        let countDown = localStorage.getItem('id');
        clearInterval(countDown)
        dispatch(resetVerificationFields());
        api.post(
            getVerificationTokenURL(),
            {email},
            (response)=>{
                showVerificationPanel()
            },
            (errorMessage)=>{
                dispatch(showErrorModal(errorMessage));
            }
        )
    }*/


    return (
        <>
            <section className="signup signin--panel">
                <div className="container">
                    <form onSubmit={requestPasswordReset} className="signup__form">
                        <div className="signup__heading">
                            <span className="signup__logo">
                                <Image src={logo}/>
                            </span>
                            <span className="signup__formTitleBox">
                                <p className="signup__greetings">Hi There!
                                    <span className="signup__greetingsIcon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 36 36" fill="none">
                                          <g clip-path="url(#clip0_1_370)">
                                            <path d="M4.86113 9.14696C5.80113 8.48996 7.21813 8.61596 8.06213 9.31296L7.09413 7.90596C6.31513 6.79496 6.59413 5.59296 7.70613 4.81296C8.81813 4.03596 11.9691 6.12496 11.9691 6.12496C11.1831 5.00296 11.3301 3.58096 12.4521 2.79396C12.9916 2.41704 13.6586 2.26968 14.3066 2.38424C14.9546 2.49881 15.5306 2.86593 15.9081 3.40496L26.3281 18.125L25.0001 31L13.9171 26.958L4.25013 12.625C4.06163 12.3566 3.92789 12.0536 3.85657 11.7335C3.78526 11.4134 3.77776 11.0823 3.83451 10.7593C3.89126 10.4362 4.01114 10.1276 4.1873 9.8509C4.36346 9.57425 4.59244 9.33504 4.86113 9.14696Z" fill="#EF9645"/>
                                            <path d="M2.69497 17.336C2.69497 17.336 1.56297 15.686 3.21397 14.555C4.86297 13.424 5.99397 15.073 5.99397 15.073L11.245 22.731C11.426 22.429 11.624 22.131 11.845 21.837L4.55697 11.21C4.55697 11.21 3.42597 9.56096 5.07597 8.42996C6.72497 7.29896 7.85597 8.94796 7.85597 8.94796L14.711 18.945C14.966 18.737 15.227 18.528 15.496 18.323L7.54897 6.73196C7.54897 6.73196 6.41797 5.08296 8.06797 3.95196C9.71697 2.82096 10.848 4.46996 10.848 4.46996L18.795 16.059C19.087 15.88 19.376 15.725 19.666 15.561L12.238 4.72896C12.238 4.72896 11.107 3.07996 12.756 1.94896C14.405 0.817958 15.536 2.46696 15.536 2.46696L23.39 13.921L24.584 15.663C19.636 19.057 19.165 25.442 21.992 29.565C22.557 30.39 23.382 29.825 23.382 29.825C19.989 24.876 21.025 19.315 25.974 15.922L24.515 8.61996C24.515 8.61996 23.97 6.69596 25.893 6.14996C27.817 5.60496 28.363 7.52896 28.363 7.52896L30.048 12.533C30.716 14.517 31.427 16.494 32.368 18.364C35.025 23.644 33.438 30.206 28.428 33.643C22.963 37.39 15.492 35.997 11.744 30.533L2.69497 17.336Z" fill="#FFDC5D"/>
                                            <path d="M12 32.042C8.00001 32.042 3.95801 28 3.95801 24C3.95801 23.447 3.55301 23 3.00001 23C2.44701 23 1.95801 23.447 1.95801 24C1.95801 30 6.00001 34.042 12 34.042C12.553 34.042 13 33.553 13 33C13 32.447 12.553 32.042 12 32.042Z" fill="#5DADEC"/>
                                            <path d="M7 34C4 34 2 32 2 29C2 28.7348 1.89464 28.4804 1.70711 28.2929C1.51957 28.1054 1.26522 28 1 28C0.734784 28 0.48043 28.1054 0.292893 28.2929C0.105357 28.4804 0 28.7348 0 29C0 33 3 36 7 36C7.26522 36 7.51957 35.8946 7.70711 35.7071C7.89464 35.5196 8 35.2652 8 35C8 34.7348 7.89464 34.4804 7.70711 34.2929C7.51957 34.1054 7.26522 34 7 34ZM24 2C23.7348 2 23.4804 2.10536 23.2929 2.29289C23.1054 2.48043 23 2.73478 23 3C23 3.26522 23.1054 3.51957 23.2929 3.70711C23.4804 3.89464 23.7348 4 24 4C28 4 32 7.589 32 12C32 12.2652 32.1054 12.5196 32.2929 12.7071C32.4804 12.8946 32.7348 13 33 13C33.2652 13 33.5196 12.8946 33.7071 12.7071C33.8946 12.5196 34 12.2652 34 12C34 6.486 30 2 24 2Z" fill="#5DADEC"/>
                                            <path d="M29 0.0419922C28.448 0.0419922 28 0.447992 28 0.999992C28 1.55199 28.448 2.04199 29 2.04199C32 2.04199 33.958 4.26699 33.958 6.99999C33.958 7.55199 34.447 7.99999 35 7.99999C35.553 7.99999 35.958 7.55199 35.958 6.99999C35.958 3.16299 33 0.0419922 29 0.0419922Z" fill="#5DADEC"/>
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_1_370">
                                              <rect width="36" height="36" fill="white"/>
                                            </clipPath>
                                          </defs>
                                        </svg>
                                    </span>
                                </p>
                                <h1 className="signup__formTitle">Input your email address to get started</h1>
                            </span>
                        </div>
                        <div className="signup__formInputs">
                            <div className="signup__formInput">
                                <IconedInput
                                    id={"email"}
                                    name={"email"}
                                    label={"Email Address"}
                                    type={"email"}
                                    placeholder={"Type here"}
                                    required={"required"}
                                    error={clientSignupForm.emailField}
                                    onInput={validateEmail}
                                    style={{border: "bottom-sm"}}
                                />
                            </div>

                            <p className="signup__agreementText">A verification code will be sent to your emai address</p>

                            <div className="signup__buttonBar">
                                <ButtonForm label={"Submit"} />
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <section className="signup signup__verification invisible">
                <div className="container">
                    <span className="overlay--fixed"></span>
                    <form onSubmit={verifyPasswordReset} className="signup__form">
                        <div className="signup__verificationControl"><span className="signup__verificationControlIcon fas fa-angle-left" onClick={closeVerificationForm}></span><span onClick={closeVerificationForm}>Back</span></div>
                        <p className="signup__verificationHead">Verify It's You</p>
                        <p className="signup__verificationText">We sent a code to ({$("#email").val()})<br/>Enter it here to verify your identity.</p>
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
                                <ButtonForm label={"Verify"} />
                            </div>
                        </div>
                        <p className="">Didn't receive the code? <span onClick={requestPasswordReset} className="signup__verificationResend">Request a new one</span></p>
                    </form>
                </div>
            </section>

            <section className="signup passwordReset__panel invisible">
                <div className="container">
                    <form onSubmit={resetPassword} className="signup__form">
                        <div className="signup__heading">
                            <span className="signup__logo">
                                <Image src={logo}/>
                            </span>
                            <span className="signup__formTitleBox">
                                <p className="signup__greetings">Hi There!
                                    <span className="signup__greetingsIcon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 36 36" fill="none">
                                          <g clip-path="url(#clip0_1_370)">
                                            <path d="M4.86113 9.14696C5.80113 8.48996 7.21813 8.61596 8.06213 9.31296L7.09413 7.90596C6.31513 6.79496 6.59413 5.59296 7.70613 4.81296C8.81813 4.03596 11.9691 6.12496 11.9691 6.12496C11.1831 5.00296 11.3301 3.58096 12.4521 2.79396C12.9916 2.41704 13.6586 2.26968 14.3066 2.38424C14.9546 2.49881 15.5306 2.86593 15.9081 3.40496L26.3281 18.125L25.0001 31L13.9171 26.958L4.25013 12.625C4.06163 12.3566 3.92789 12.0536 3.85657 11.7335C3.78526 11.4134 3.77776 11.0823 3.83451 10.7593C3.89126 10.4362 4.01114 10.1276 4.1873 9.8509C4.36346 9.57425 4.59244 9.33504 4.86113 9.14696Z" fill="#EF9645"/>
                                            <path d="M2.69497 17.336C2.69497 17.336 1.56297 15.686 3.21397 14.555C4.86297 13.424 5.99397 15.073 5.99397 15.073L11.245 22.731C11.426 22.429 11.624 22.131 11.845 21.837L4.55697 11.21C4.55697 11.21 3.42597 9.56096 5.07597 8.42996C6.72497 7.29896 7.85597 8.94796 7.85597 8.94796L14.711 18.945C14.966 18.737 15.227 18.528 15.496 18.323L7.54897 6.73196C7.54897 6.73196 6.41797 5.08296 8.06797 3.95196C9.71697 2.82096 10.848 4.46996 10.848 4.46996L18.795 16.059C19.087 15.88 19.376 15.725 19.666 15.561L12.238 4.72896C12.238 4.72896 11.107 3.07996 12.756 1.94896C14.405 0.817958 15.536 2.46696 15.536 2.46696L23.39 13.921L24.584 15.663C19.636 19.057 19.165 25.442 21.992 29.565C22.557 30.39 23.382 29.825 23.382 29.825C19.989 24.876 21.025 19.315 25.974 15.922L24.515 8.61996C24.515 8.61996 23.97 6.69596 25.893 6.14996C27.817 5.60496 28.363 7.52896 28.363 7.52896L30.048 12.533C30.716 14.517 31.427 16.494 32.368 18.364C35.025 23.644 33.438 30.206 28.428 33.643C22.963 37.39 15.492 35.997 11.744 30.533L2.69497 17.336Z" fill="#FFDC5D"/>
                                            <path d="M12 32.042C8.00001 32.042 3.95801 28 3.95801 24C3.95801 23.447 3.55301 23 3.00001 23C2.44701 23 1.95801 23.447 1.95801 24C1.95801 30 6.00001 34.042 12 34.042C12.553 34.042 13 33.553 13 33C13 32.447 12.553 32.042 12 32.042Z" fill="#5DADEC"/>
                                            <path d="M7 34C4 34 2 32 2 29C2 28.7348 1.89464 28.4804 1.70711 28.2929C1.51957 28.1054 1.26522 28 1 28C0.734784 28 0.48043 28.1054 0.292893 28.2929C0.105357 28.4804 0 28.7348 0 29C0 33 3 36 7 36C7.26522 36 7.51957 35.8946 7.70711 35.7071C7.89464 35.5196 8 35.2652 8 35C8 34.7348 7.89464 34.4804 7.70711 34.2929C7.51957 34.1054 7.26522 34 7 34ZM24 2C23.7348 2 23.4804 2.10536 23.2929 2.29289C23.1054 2.48043 23 2.73478 23 3C23 3.26522 23.1054 3.51957 23.2929 3.70711C23.4804 3.89464 23.7348 4 24 4C28 4 32 7.589 32 12C32 12.2652 32.1054 12.5196 32.2929 12.7071C32.4804 12.8946 32.7348 13 33 13C33.2652 13 33.5196 12.8946 33.7071 12.7071C33.8946 12.5196 34 12.2652 34 12C34 6.486 30 2 24 2Z" fill="#5DADEC"/>
                                            <path d="M29 0.0419922C28.448 0.0419922 28 0.447992 28 0.999992C28 1.55199 28.448 2.04199 29 2.04199C32 2.04199 33.958 4.26699 33.958 6.99999C33.958 7.55199 34.447 7.99999 35 7.99999C35.553 7.99999 35.958 7.55199 35.958 6.99999C35.958 3.16299 33 0.0419922 29 0.0419922Z" fill="#5DADEC"/>
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_1_370">
                                              <rect width="36" height="36" fill="white"/>
                                            </clipPath>
                                          </defs>
                                        </svg>
                                    </span>
                                </p>
                                <h1 className="signup__formTitle">Set your new password</h1>
                            </span>
                        </div>
                        <div className="signup__formInputs">
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
                                    icon={ { name: "fa fa-eye", position: "right", onClick: togglePasswordVisibility } }
                                    style={{border: "bottom-sm"}}
                                    onInput={validatePassword}
                                />
                            </div>

                            <div className="signup__buttonBar">
                                <ButtonForm label={"Submit"} />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}