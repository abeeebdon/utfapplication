import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { QRCodeSVG, QRCodeCanvas} from 'qrcode.react';
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { ControlHeader, TradingPanel } from "./SideBar";

import { setVerificationTokenExpiryTimeLeft, setVerificationField, setStage, setFormData, setFirstNameField, setLastNameField, setEmailField, setPasswordField, setConfirmPasswordField, setAgreeToTermsField, resetFields, resetVerificationFields } from '../../../state/actions/clientSignupForm';
import { selectRequestWithdrawalEndpoint, selectRequestWithdrawalVerificationCodeEndpoint } from '../../../state/selectors/endpoints';
import { setAuthentication, setUser, setLoggedIn, setWallets, resetAll, setTransactions, setOnboarded } from '../../../state/actions/account';
import API from '../../../api/api.mjs';
import { requireLogin, populateUser, closeAllPositions, calculateAccountSummary } from '../../../api/user.js';
import { populatePairs, setConfig } from '../../../api/configuration.js';

export default function WithdrawPage() {
    requireLogin();
    populatePairs();

    let accountSummary = calculateAccountSummary()
    const openTrades = useSelector(state => state.account.openTrades);
    if(accountSummary.marginLevel <= 5 && accountSummary.margin > 0)
        closeAllPositions();

    useEffect(()=>{
//        loopPopulatePairs();;
        setConfig();
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let api = new API();
    let countDown = localStorage.getItem('id');
    const usdtLogo = "/images/crypto/usdt.svg"
    const user = useSelector(state => state.account.user);
    const [withdrawTotal, setWithdrawTotal] = useState([]);

    let getRequestWithdrawalURL = useSelector(state => selectRequestWithdrawalEndpoint(state.endpoints));
    let getRequestWithdrawalVerificationCodeURL = useSelector(state => selectRequestWithdrawalVerificationCodeEndpoint(state.endpoints));

    let verificationTokenExpiryTimeLeft = useSelector(state => state.clientSignupForm.verificationTokenExpiryTimeLeft);
    let verificationTokenValidityDuration = useSelector(state => state.clientSignupForm.verificationTokenValidityDuration);

    const requestWithdrawalVerificationCode = async (event) => {
        event.preventDefault();

        let address = document.getElementById("address").value;
        let amount = document.getElementById("amount").value;

        if(address && amount && amount > user.wallet_balance && amount > 20) {
            let formData = {}

            return api.get(
                getRequestWithdrawalVerificationCodeURL(),
                (response)=>{
                    $(".withdraw__content").addClass("invisible");
                    setWithdrawTotal(`$${amount}`)
                    $(".withdraw__confirmation").addClass("invisible");
                    showVerificationPanel();
                },
                (errorMessage)=>{
                    closeVerificationForm()
                    dispatch(showErrorModal(errorMessage));
                }
            )
        }
    }

    const withdraw = async (event) => {
        event.preventDefault();
        dispatch(resetVerificationFields());

        let address = document.getElementById("address").value;
        let amount = document.getElementById("amount").value;
        let token = "";

        for(let i=0; i<6; i++){
            let child = event.target[i];
            token = `${token}${child.value}`
        }

        if(address && amount && token) {
            let formData = {address, amount, token}

            return api.post(
                getRequestWithdrawalURL(),
                formData,
                (response)=>{
                    dispatch(resetVerificationFields());
                    closeVerificationForm()
                    $(".withdraw__confirmation").removeClass("invisible");
                },
                (errorMessage)=>{
                    dispatch(showErrorModal(errorMessage));
                }
            )
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

    const clientSignupForm = useSelector(state => state.clientSignupForm);

    const validateEmail = async (event) => {
    }


    return (
        <section className="withdraw home">
            <div className="container">
                <div className="deposit__content withdraw__content">
                    <ControlHeader back={{onClick: ()=>navigate("/home")}} title={"Withdraw"} />
                    <div className="">
                        <div className="withdrawalBalance">
                            <TradingPanel
                                pair={{name: <div>USDT<br/>TRC-20</div>, icon: "/images/crypto/usdt.svg"}}
                                price={{amount: <div>Available balance<br/>${user.wallet_balance}</div>}}
                            />
                        </div>

                        <form onSubmit={requestWithdrawalVerificationCode}  className="signup__form">
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

                <section className="signup signup__verification invisible">
                    <div className="container">
                        <span className="overlay--fixed"></span>
                        <form onSubmit={withdraw} className="signup__form">
                            <div className="signup__verificationControl"><span className="signup__verificationControlIcon fas fa-angle-left" onClick={()=>navigate("/home")}></span><span onClick={closeVerificationForm}>Back</span></div>
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
                            <p className="">Didn't receive the code? <span onClick={requestWithdrawalVerificationCode} className="signup__verificationResend">Request a new one</span></p>
                        </form>
                    </div>
                </section>

                <div className="deposit__content withdraw__content withdraw__confirmation invisible">
                    <ControlHeader back={()=>navigate("/home")} title={"Withdraw"} />
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
                                price={{amount: "$0.00"}}
                            />
                        </div>

                        <div className="withdraw__total">
                            <TradingPanel
                                pair={{name: "Total",}}
                                price={{amount: withdrawTotal.toLocaleString("en-US")}}
                            />
                        </div>

                        <p className="withdraw__footnote">Please your withdrawal is being verified and it usually takes up to 6 hours for funds to be credited into your account</p>
                    </div>
                </div>


            </div>
        </section>
    );
}