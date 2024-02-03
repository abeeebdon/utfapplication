import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm } from "../../Button";
import Input, { CheckBoxInput, SingleInput, IconedInput } from "../../Input";

export default function SigninPage() {
    const clientSignupForm = useSelector(state => state.clientSignupForm);
    const togglePasswordVisibility = async (event) => {
        let password = document.getElementById("password");
        if(password.type == "password"){
            password.type = "text";
        }
        else{
            password.type = "password"
        }
    }
    const onFormSubmit = async (event) => {
        event.preventDefault();
        $(".signup__verification").removeClass("invisible")
    }
    const onVerificationFormSubmit = async (event) => {
        event.preventDefault();
//        $(".signup__verification").addClass("invisible")
        window.location.replace("/home")
    }
    const sendVerificationToken = async (event) => {}
    let verificationTokenExpiryTimeLeft = useSelector(state => state.clientSignupForm.verificationTokenExpiryTimeLeft);
    let verificationTokenValidityDuration = useSelector(state => state.clientSignupForm.verificationTokenValidityDuration);
    const validateEmail = async ()=>{}
    const logo = useSelector(state => state.configuration.app.logo);

    return (
        <>
            <section className="signup signin--panel">
                <div className="container">
                    <form onSubmit={onFormSubmit} className="signup__form">
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
                                <h1 className="signup__formTitle">Welcome back, Sign in to your account</h1>
                            </span>
                        </div>
                        <div className="signup__formInputs">
                            <div className="signup__formInput signup__google">
                                <IconedInput
                                    id={"google"}
                                    name={"goggle"}
                                    type={"text"}
                                    placeholder={"Sign in with google"}
                                    logo={ {text: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 36 36" fill="none">
                                                  <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.2405 24.4928 21.9172 27 18 27C13.0297 27 9 22.9702 9 18C9 13.0297 13.0297 9 18 9C20.2943 9 22.3815 9.8655 23.9708 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C9.71625 3 3 9.71625 3 18C3 26.2838 9.71625 33 18 33C26.2838 33 33 26.2838 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#FFC107"/>
                                                  <path d="M4.72949 11.0182L9.65774 14.6325C10.9912 11.331 14.2207 9 18 9C20.2942 9 22.3815 9.8655 23.9707 11.2792L28.2135 7.0365C25.5345 4.53975 21.951 3 18 3C12.2385 3 7.24199 6.25275 4.72949 11.0182Z" fill="#FF3D00"/>
                                                  <path d="M18.0002 33C21.8747 33 25.3952 31.5173 28.057 29.106L23.4145 25.1775C21.8579 26.3613 19.9558 27.0016 18.0002 27C14.0987 27 10.786 24.5123 9.53798 21.0405L4.64648 24.8093C7.12898 29.667 12.1705 33 18.0002 33Z" fill="#4CAF50"/>
                                                  <path d="M32.7083 15.0623H31.5V15H18V21H26.4773C25.8857 22.6623 24.82 24.1149 23.412 25.1782L23.4142 25.1768L28.0568 29.1052C27.7283 29.4037 33 25.5 33 18C33 16.9943 32.8965 16.0125 32.7083 15.0623Z" fill="#1976D2"/>
                                            </svg> }
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
                                    label={"Email Address"}
                                    type={"email"}
                                    placeholder={"Type here"}
                                    required={"required"}
                                    error={clientSignupForm.emailField}
                                    onInput={validateEmail}
                                    style={{border: "bottom-sm"}}
                                />
                            </div>

                            <div className="signup__formInput">
                                <IconedInput
                                    id={"password"}
                                    name={"password"}
                                    label={"Password"}
                                    underLabel={<Link to="/">Forgot Password?</Link>}
                                    type={"password"}
                                    placeholder={"Type here"}
                                    required={"required"}
                                    icon={ { name: "fa fa-eye", position: "right", onClick: togglePasswordVisibility } }
                                    style={{border: "bottom-sm"}}
                                    error={clientSignupForm.passwordField}
                                />
                            </div>

                            <p className="signup__agreementText">By continuing you agree to our <Link to="/">Terms and Conditions</Link> and <Link to="/">Privacy Policy</Link></p>

                            <div className="signup__buttonBar">
                                <ButtonForm label={"Log In"} />
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

                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </form>
                </div>
            </section>

            <section className="signup signup__verification invisible">
                <div className="container">
                    <span className="overlay--fixed"></span>
                    <form onSubmit={onVerificationFormSubmit} className="signup__form">
                        <div className="signup__verificationControl"><span className="signup__verificationControlIcon fas fa-angle-left" onClick={onVerificationFormSubmit}></span><span onClick={onVerificationFormSubmit}>Back</span></div>
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
                                <ButtonForm label={"Verify"} />
                            </div>
                        </div>
                        <p className="">Didn't receive the code? <span onClick={sendVerificationToken} className="signup__verificationResend">Request a new one</span></p>
                    </form>
                </div>
            </section>
        </>
    );
}