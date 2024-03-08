import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";
import { requireLogin, populateTrades } from '../../../api/user.js';

export default function RewardPage() {
    requireLogin();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const endpoints = useSelector(state => state.endpoints);
    let referralLink = `${endpoints.server.protocol}://${endpoints.server.host}/signup?referrer=${user.uuid}`
    const openReferralPage = async (event) => {
        event.preventDefault();
        $(".referralPage").toggleClass("invisible")
    }

    const copyAddress = (event)=> {
        event.preventDefault();
        var copyText = $("#referralBox__code")[0].innerText;
        navigator.clipboard.writeText(copyText);
        $('.alert').fadeIn('show');

        setTimeout(()=>$('.alert').hide(), 2000)
    }

    return (
        <section className="home reward">
            <div className="container">
                <SideBar selectedItem={"reward"} />
                <div className="home__main">
                    <Header title="Reward"/>
                    <div className="home__content">
                        <div className="trendingBox referralPage">
                            <p className="trendingBox__heading">Earn by Referrals</p>
                            <div className="rewardBanners">
                                <div className="rewardBanner">
                                    <div className="rewardBanner__caption">
                                        <p className="rewardBanner__title">Reward</p>
                                        <p className="rewardBanner__text">Like, Share <br/>& get free Crypto</p>
                                        <button className="button" onClick={openReferralPage}>Start Now</button>
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
                                        <button className="button" onClick={openReferralPage}>Refer Now</button>
                                    </div>
                                    <div className="rewardBanner__imageBox">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="referralPage invisible">
                            <div className="referralBox">
                                <p className="referralBox__title">Share to make money</p>
                                <p className="referralBox__subTitle">Your referral link</p>
                                <div className="referralBox__codeBox">
                                    <div id="referralBox__code" className="referralBox__code">{referralLink}</div>
                                    <div className="referralBox__button" onClick={copyAddress}>Copy</div>
                                </div>
                                <div class="alert">
                                  <span class="closebtn" onClick={(event)=> event.target.parentElement.style.display='none'}>&times;</span>
                                  Copied to clipboard
                                </div>
                            </div>

                            <div className="commissionBox">
                                { [...Array(3)].map((x, index)=>{
                                    return <div className="commission" key={index}>
                                                <p>First<br/>Commission</p>
                                                <p className="commission__amount">329</p>
                                            </div>
                                  })
                                }
                            </div>

                            <p className="referralBox__title">Total Recommended Members</p>

                            <div className="commissionBox">
                                { [...Array(3)].map((x, index)=>{
                                    return <div className="commission" key={index}>
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