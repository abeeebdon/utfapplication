import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image, RoundedImage } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";
import { requireLogin, populateActivity, logout, closeAllPositions, calculateAccountSummary } from '../../../api/user.js';
import { setActivity } from '../../../state/actions/account';
import { setConfig } from '../../../api/configuration.js';


export default function MarketPage() {
    requireLogin();
    populateActivity()

    let accountSummary = calculateAccountSummary()
    if(accountSummary.marginLevel <= 5 && accountSummary.margin > 0)
        closeAllPositions();

    useEffect(()=>{
//        loopPopulatePairs();;
        setConfig();
    }, []);

    const dispatch = useDispatch();
    const logo = useSelector(state => state.configuration.app.logo);
    const user = useSelector(state => state.account.user);
    const clientSignupForm = useSelector(state => state.clientSignupForm);
    const activities = useSelector(state => state.account.activity);
    const showPanel = (panel)=> {
        $(".account__navigation").addClass("account__navigation--hideSm");
        $(".account__details").show();
        $(".panel").hide();
        $(`.account__${panel}`).show();
    }
//    dispatch(setActivity([]))

    const getActivity = (activity, index) => {
        if(activity.type == "deposit")  {
            return <div data-filter={`${activity.type.toLowerCase()} ${activity.amount}`} >
                <TradingPanel key={index}
                    pair={{name: <div style={{textTransform: 'capitalize'}}>{activity.type}<br/> <small>{activity.datetime}</small></div>, icon:"/images/plus.png"}}
                    price={{amount: <div style={{fontWeight: 900}}>+ ${activity.amount.toLocaleString("en-US")}</div>}}
                />
           </div>
        }
        else if(activity.type == "withdrawal")  {
            return <div data-filter={`${activity.type.toLowerCase()} ${activity.amount}`} >
                <TradingPanel key={index}
                    pair={{name: <div style={{textTransform: 'capitalize'}}>{activity.type}<br/> <small>{activity.datetime}</small></div>, icon:"/images/minus.png"}}
                    price={{amount: <div style={{fontWeight: 900}}>- ${activity.amount.toLocaleString("en-US")}</div>}}
                />
           </div>
        }
        else if(activity.type == "close_trade")  {
            return <div data-filter={`close_trade ${activity.amount} ${activity.meta_data.trade_data.type} ${activity.meta_data.trade_data.forex_pair}`} >
                <TradingPanel key={index}
                    pair={{name: <div style={{textTransform: 'capitalize'}}>Close Trade {activity.meta_data.trade_data.forex_pair}<br/> <small>{activity.datetime}</small></div>, icon: `/images/countries/${activity.meta_data.trade_data.forex_pair[0].toLowerCase() + activity.meta_data.trade_data.forex_pair[1].toLowerCase()}.svg`}}
                    price={{amount: <div style={{fontWeight: 600}}><small>{activity.meta_data.trade_data.type} {activity.meta_data.trade_data.lot_size} at {activity.meta_data.trade_data.lot_cost}</small>    ${activity.meta_data.trade_data.profit.toLocaleString("en-US")}</div>}}
                />
           </div>
        }
        else if(activity.type == "trade")  {
            return <div data-filter={`open_trade ${activity.amount} ${activity.meta_data.trade_data.type} ${activity.meta_data.trade_data.forex_pair}`} >
                <TradingPanel key={index}
                    pair={{name: <div style={{textTransform: 'capitalize'}}>Open Trade {activity.meta_data.trade_data.forex_pair}<br/> <small>{activity.datetime}</small></div>, icon: `/images/countries/${activity.meta_data.trade_data.forex_pair[0].toLowerCase() + activity.meta_data.trade_data.forex_pair[1].toLowerCase()}.svg`}}
                    price={{amount: <div style={{fontWeight: 600}}><small>{activity.meta_data.trade_data.type} {activity.meta_data.trade_data.lot_size} at {activity.meta_data.trade_data.lot_cost}</small></div>}}
                />
           </div>
        }
        else if(activity.type == "referral_bonus")  {
            return <div data-filter={`${activity.type.toLowerCase()} ${activity.amount}`} >
                <TradingPanel key={index}
                    pair={{name: <div style={{textTransform: 'capitalize'}}>Referral Bonus<br/> <small>{activity.datetime}</small></div>, icon:"/images/plus.png"}}
                    price={{amount: <div style={{fontWeight: 900}}>+ ${activity.amount.toLocaleString("en-US")}</div>}}
                />
           </div>
        }

    }

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
                                    <p>ID: {user.uuid}</p>
                                </div>
                            </div>

                            <ul>
                                <li className="account__navigationItem account__navigationItem--selected" onClick={()=>showPanel("activity")}><span className="fa fa-history"></span>History</li>
                                {/*<li className="account__navigationItem" ><span className="fa fa-shield"></span>Change Password</li>*/}
                                    {/*<li className="account__navigationItem"><span className="fa fa-question-circle"></span>Help & Support</li>*/}
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
                                    <p>ID: {user.uuid}</p>
                                </div>
                            </div>

                            <div className="account__activity panel">
                                <p className="account__activityHead">Activity</p>
                                {/*<p className="account__activityDate">Today, Aug 1</p>*/}
                                {
                                    activities.map((activity, index)=>{
                                        return getActivity(activity, index)
                                    })
                                }

                                {/*<button className="button button--form">Download Transactions</button>*/}
                            </div>

                            <div className="account__security panel invisible">
                                <p className="account__activityHead">Change Password</p>
                                <form  className="signup__form">
                                    <div className="signup__formInputs">
                                        <div className="signup__formInput">
                                            <IconedInput
                                                id={"oldPassword"}
                                                name={"oldPassword"}
                                                label={"Old Password"}
                                                type={"text"}
                                                placeholder={"Type here"}
                                                required={"required"}
                                                style={{border: "bottom-sm"}}
                                                error={clientSignupForm.passwordField}
                                            />
                                        </div>

                                        <div className="signup__formInput">
                                            <IconedInput
                                                id={"newPassword"}
                                                name={"newPassword"}
                                                label={"New Password"}
                                                type={"text"}
                                                placeholder={"Type here"}
                                                required={"required"}
                                                style={{border: "bottom-sm"}}
                                                error={clientSignupForm.passwordField}
                                            />
                                        </div>

                                        <div className="signup__buttonBar">
                                            <ButtonForm label={"Change"} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}