import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";
import { requireLogin, populateUser } from '../../../api/user.js';
import { populatePairs } from '../../../api/configuration.js';

export default function HomePage() {
    useEffect(()=>{
        requireLogin();
        populatePairs();
        populateUser()
    }, []);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const countries = useSelector(state => state.configuration.countries);
    const pairs = useSelector(state => state.configuration.pairs);
    const user = useSelector(state => state.account.user);
    let gainPercent = (((user.wallet_balance - user.invested_value) / user.invested_value) * 100) || 0
    gainPercent = gainPercent.toFixed(2);

    return (
        <section className="home home--select">
            <div className="container">
                <SideBar selectedItem={"home"} />
                <div className="home__main">
                    <Header title="Home"/>
                    <div className="home__content">
                        <div className="dashboardBox">
                            <div className="dashboard">
                                <div className="dashboardOverlay"></div>

                                <div className="dashboard__accountName">{user.full_name}</div>
                                <div className="dashboard__balance">
                                    <div className="dashboard__data">
                                        <p className="dashboard__dataHead">Holding Value</p>
                                        <div className="dashboard__dataBody">
                                            <p className="dashboard__figureMajor">${user.wallet_balance.toLocaleString("en-US")}</p>
                                            <p className="dashboard__figureMinor">{gainPercent && gainPercent <= 0? gainPercent.toLocaleString("en-US") : `+${gainPercent.toLocaleString("en-US")}`}%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard__invested">
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Invested Value</p>
                                            <p className="dashboard__figureMinor">${user.invested_value.toLocaleString("en-US")}</p>
                                        </div>
                                    </span>
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Available Balance</p>
                                            <p className="dashboard__figureMinor">${user.wallet_balance.toLocaleString("en-US")}</p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="dashboardAction">
                                <Link to='/deposit'> <ButtonForm label={"Deposit"} /> </Link>
                                <Link to='/withdraw'> <ButtonForm label={"Withdraw"} /> </Link>
                            </div>
                        </div>
                        <div className="trendingBox trendingBox--home">

                            <p className="trendingBox__heading">Trending</p>
                            { pairs.map((pair)=>{
                                return <TradingPanel
                                    pair={{name: pair.name, icon: pair.icon}}
                                    trendChart={pair.trendData}
                                    price={{amount: pair.rate, change: pair.change}}
                                    actions={{trade: ()=>navigate(`/order/${pair.name}`)}}
                                    onClick={()=>navigate(`/order/${pair.name}`)}
                                />
                              })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}