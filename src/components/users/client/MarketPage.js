import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload } from "../../Input";
import { SideBar, Header, TradingPanel} from "./SideBar";
import { requireLogin, populateTrades } from '../../../api/user.js';
import { loopPopulatePairs } from '../../../api/configuration.js';

export default function MarketPage() {
    requireLogin();
    useEffect(()=>{
        loopPopulatePairs();;
    }, []);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const countries = useSelector(state => state.configuration.countries);
    const pairs = useSelector(state => state.configuration.pairs);
    const user = useSelector(state => state.account.user);
    let gainPercent = (((user.wallet_balance - user.invested_value) / user.invested_value) * 100) || 0
    gainPercent = gainPercent.toFixed(2);

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
                            <button onClick={()=>{$(".trendingBox").toggleClass("invisible"); $(".market__favorites").toggleClass("invisible")}} className="market__categoryNavButton market__categoryNavSelected">All</button>
                            <button onClick={()=>{$(".trendingBox").toggleClass("invisible"); $(".market__favorites").toggleClass("invisible")}} className="market__categoryNavButton">Gainers</button>
                            <button onClick={()=>{$(".trendingBox").toggleClass("invisible"); $(".market__favorites").toggleClass("invisible")}} className="market__categoryNavButton">Losers</button>
                            <button onClick={()=>{$(".trendingBox").toggleClass("invisible"); $(".market__favorites").toggleClass("invisible")}} className="market__categoryNavButton">Favourites</button>
                        </div>
                    </div>

                    <div className="home__content">
                        <div className="trendingBox trendingBox--home">
                            { pairs.map((pair, index)=>{
                                return <TradingPanel key={index}
                                    pair={{name: pair.name, icon: pair.icon}}
                                    trendChart={pair.trendData}
                                    price={{amount: pair.rate, change: pair.change}}
                                    actions={{trade: ()=>navigate(`/order/${pair.name}`)}}
                                    onClick={()=>navigate(`/order/${pair.name}`)}
                                />
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