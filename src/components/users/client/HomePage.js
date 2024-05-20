import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";
import LiveChat from "../../LiveChat";
import { requireLogin, populateUser, calculateAccountSummary, closeAllPositions } from '../../../api/user.js';
import { loopFunction, populatePairs, setConfig } from '../../../api/configuration.js';

export default function HomePage() {
    requireLogin();

    const [currentCount, setCount] = useState(0)

    useEffect(()=>{
        if(currentCount >= 1)
            return
        setCount(1)

        loopFunction(populatePairs, 5000);
        loopFunction(populateUser);
        setConfig()
    }, []);


    let accountSummary = calculateAccountSummary()
    if(accountSummary.marginLevel <= 5 && accountSummary.margin > 0)
        closeAllPositions();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const countries = useSelector(state => state.configuration.countries);
    const pairs = useSelector(state => state.configuration.pairs);
    const user = useSelector(state => state.account.user);
//    console.log(pairs)


    let floatingPL = 0;
    const openTrades = useSelector(state => state.account.openTrades);
    openTrades.map((trade, index)=>{
        openTrades[index].pair = pairs[trade.pairName]
        openTrades[index].closePrice = openTrades[index].pair.rate;

        if(openTrades[index].direction == "buy") {
            openTrades[index].PL = (openTrades[index].pair.rate * openTrades[index].lotSize * 100000) - (openTrades[index].openPrice * openTrades[index].lotSize * 100000)
        }
        else {
            openTrades[index].PL = (openTrades[index].openPrice * openTrades[index].lotSize * 100000) - (openTrades[index].pair.rate * openTrades[index].lotSize * 100000)
        }

        floatingPL += openTrades[index].PL;
    })

    let gainPercent = ((floatingPL / user.wallet_balance) * 100) || 0
    gainPercent = isFinite(gainPercent) ? gainPercent : 0.0;
    gainPercent = gainPercent.toFixed(2);

    return (
        <section className="home home--select">
        <LiveChat/>
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
                                        <p className="dashboard__dataHead">Equity</p>
                                        <div className="dashboard__dataBody">
                                            <p className="dashboard__figureMajor">${(user.wallet_balance + floatingPL).toLocaleString("en-US")}</p>
                                            <p className="dashboard__figureMinor">{gainPercent && gainPercent <= 0? gainPercent.toLocaleString("en-US") : `+${gainPercent.toLocaleString("en-US")}`}%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard__invested">
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Balance</p>
                                            <p className="dashboard__figureMinor">${(user.wallet_balance).toLocaleString("en-US")}</p>
                                        </div>
                                    </span>
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Margin</p>
                                            <p className="dashboard__figureMinor">${accountSummary.margin.toLocaleString("en-US")}</p>
                                        </div>
                                    </span>
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Free Margin</p>
                                            <p className="dashboard__figureMinor">${accountSummary.freeMargin.toLocaleString("en-US")}</p>
                                        </div>
                                    </span>
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Margin Level</p>
                                            <p className="dashboard__figureMinor">{accountSummary.marginLevel.toFixed(2)}%</p>
                                        </div>
                                    </span>
                                    <span className="">
                                        <div className="dashboard__data">
                                            <p className="dashboard__dataHead">Leverage</p>
                                            <p className="dashboard__figureMinor">1:{accountSummary.leverage}</p>
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
                            { Object.entries(pairs).map(([key, pair])=>{
                                return <div data-filter={`${pair.name.toLowerCase()} ${pair.rate}`} >
                                        <TradingPanel key={key}
                                            pair={{name: pair.name, icon: pair.icon}}
                                            trendChart={pair.trendData}
                                            price={{amount: pair.rate, change: pair.change}}
                                            actions={{trade: ()=>navigate(`/order/${pair.name}`)}}
                                            onClick={()=>navigate(`/order/${pair.name}`)}
                                        />
                                    </div>
                              })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}