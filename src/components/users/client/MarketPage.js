import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";
import { requireLogin, populateTrades, closeAllPositions, calculateAccountSummary } from '../../../api/user.js';
import { loopPopulatePairs, setConfig } from '../../../api/configuration.js';

export default function MarketPage() {
    requireLogin();

    let accountSummary = calculateAccountSummary()
    if(accountSummary.marginLevel <= 5 && accountSummary.margin > 0)
        closeAllPositions();

    useEffect(()=>{
        setConfig();
//        loopPopulatePairs();;
    }, []);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const countries = useSelector(state => state.configuration.countries);
    const pairs = useSelector(state => state.configuration.pairs);
    const user = useSelector(state => state.account.user);

    const [category, setCategory] = useState("all");

    let gainPercent = (((user.wallet_balance - user.invested_value) / user.invested_value) * 100) || 0
    gainPercent = gainPercent.toFixed(2);


    const changeView = (view) => {
        $(".market__categoryNavButton").removeClass("market__categoryNavSelected")

        if(view == "favorites"){
            $(".trendingBox").addClass("invisible"); $(".market__favorites").removeClass("invisible")
            $(".favorites").addClass("market__categoryNavSelected")
            return
        }

        setCategory(view)
        $(`.${view}`).addClass("market__categoryNavSelected")
        $(".trendingBox").removeClass("invisible"); $(".market__favorites").addClass("invisible")
    }

    return (
        <section className="home">
            <div className="container">
                <SideBar selectedItem={"market"} />
                <div className="home__main">
                    <Header title="Market"/>
                    {/*<div className="marketTrend__caption">Market is down <span className="marketTrend__direction">-11.17%</span></div>
                    <p className="marketTrend__duration">In the past 24 hours</p>*/}

                    <div className="market__category">
                        <div className="market__categoryName">Currency pairs</div>
                        <div className="market__categoryNav">
                            <button onClick={()=>{changeView("all")}} className="market__categoryNavButton all market__categoryNavSelected">All</button>
                            <button onClick={()=>{changeView("gainers")}} className="market__categoryNavButton gainers">Gainers</button>
                            <button onClick={()=>{changeView("loosers")}} className="market__categoryNavButton loosers">Losers</button>
                            <button onClick={()=>{changeView("favorites")}} className="market__categoryNavButton favorites">Favourites</button>
                        </div>
                    </div>

                    <div className="home__content">
                        <div className="trendingBox trendingBox--home">
                            { Object.entries(pairs).map(([key, pair])=>{
                                    return category == "all" &&
                                    <div data-filter={`${pair.name.toLowerCase()} ${pair.rate}`} >
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
                            { Object.entries(pairs).map(([key, pair])=>{
                                    return category == "gainers" && pair.change >= 0 &&
                                    <div data-filter={`${pair.name.toLowerCase()} ${pair.rate}`} >
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
                            { Object.entries(pairs).map(([key, pair])=>{
                                    return category == "loosers" && pair.change < 0 &&
                                    <div data-filter={`${pair.name.toLowerCase()} ${pair.rate}`} >
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
                        <div className="market__favorites invisible">
                            <div className="market__favoritesImage">
                                <Image src="/images/favorite.png"/>
                            </div>
                            <p>Special place for favorite coins</p>
                            <p>Add your favorite coins and check here easily</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}