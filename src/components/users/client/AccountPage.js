import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image, RoundedImage } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";
import { requireLogin, populateActivity, logout } from '../../../api/user.js';
import { setActivity } from '../../../state/actions/account';


export default function MarketPage() {
    requireLogin();
    populateActivity()

    const dispatch = useDispatch();
    const logo = useSelector(state => state.configuration.app.logo);
    const user = useSelector(state => state.account.user);
    const activities = useSelector(state => state.account.activity);
//    dispatch(setActivity([]))

    return (
        <section className="home account">
            <div className="container">
                <SideBar selectedItem={"account"} />
                <div className="home__main">
                    <Header title="Account"/>

                    <div className="account__panel">
                        <div className="account__navigation">
                            <div className="account__profile">
                                <div className="account__profileCard">
                                    <div className="account__profileCardImage">
                                        <RoundedImage src="/images/avatars/avatar.jpg" />
                                    </div>
                                    <p>{user.full_name}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <ul>
                                <li className="account__navigationItem account__navigationItem--selected"><span className="fa fa-history"></span>History</li>
                                <li className="account__navigationItem"><span className="fa fa-shield"></span>Security</li>
                                <li className="account__navigationItem"><span className="fa fa-question-circle"></span>Help & Support</li>
                                <li className="account__navigationItem"><span className="fa fa-check"></span>Terms & Conditions</li>
                                <li className="account__navigationItem" onClick={ logout }><span className="fa fa-sign-out"></span>Logout</li>
                            </ul>
                        </div>

                        <div className="account__details">
                            <div className="account__profile">
                                <div className="account__profileCard">
                                    <div className="account__profileCardImage">
                                        <RoundedImage src="/images/avatars/avatar.jpg" />
                                    </div>
                                    <p>{user.full_name}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <div className="account__activity">
                                <p className="account__activityHead">Activity</p>
                                {/*<p className="account__activityDate">Today, Aug 1</p>*/}
                                {
                                    activities.map((activity, index)=>{
                                        return <TradingPanel key={index}
                                                pair={{name: activity.type}}
                                                price={{amount: activity.amount}}
                                            />
                                    })
                                }

                                {/*<button className="button button--form">Download Transactions</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}