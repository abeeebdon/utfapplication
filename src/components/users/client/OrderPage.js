import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal } from '../../../state/actions/notification';
import { selectNewBuyTradeEndpoint, selectNewSellTradeEndpoint } from '../../../state/selectors/endpoints';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import API from '../../../api/api.mjs';
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";
import { requireLogin, populateTrades } from '../../../api/user.js';
import { populatePairs } from '../../../api/configuration.js';

export default function OrderPage() {
    useEffect(()=>{
        requireLogin();
        populateTrades()
    }, []);

    const dispatch = useDispatch();
    let api = new API();
    const {pairName} = useParams();
    let pair;
    const pairs = useSelector(state => state.configuration.pairs);
    const openTrades = useSelector(state => state.account.openTrades);
    let getNewBuyTradeURL = useSelector(state => selectNewBuyTradeEndpoint(state.endpoints));
    let getNewSellTradeURL = useSelector(state => selectNewSellTradeEndpoint(state.endpoints));

    pairs.map((pairData)=>{
        if(pairData.name == pairName)
            pair = pairData
    })

    openTrades.map((trade, index)=>{
        pairs.map((pairData)=>{
            if(pairData.name == trade.pairName)
                openTrades[index].pair = pairData
        })
        openTrades[index].closePrice = openTrades[index].pair.rate;

        if(openTrades[index].direction == "buy") {
            openTrades[index].PL = (openTrades[index].pair.rate * openTrades[index].lotSize * 100000) - (openTrades[index].openPrice * openTrades[index].lotSize * 100000)
        }
        else {
            openTrades[index].PL = (openTrades[index].openPrice * openTrades[index].lotSize * 100000) - (openTrades[index].pair.rate * openTrades[index].lotSize * 100000)
        }
    })



    const user = useSelector(state => state.account.user);
    const openPosition = async (event) => {
        event.preventDefault();

        let getNewTradeURL  = document.getElementById("directionSell").checked == true ? getNewSellTradeURL : getNewBuyTradeURL;

        let lotSize = parseFloat($("#lotSize").val())
        lotSize = lotSize.toFixed(2)

        if(lotSize <= 0)
            return

        let formData = {
            forex_pair: pair.name,
            lot_size: lotSize,
            lot_cost: pair.rate
        }

        return api.post(
            getNewTradeURL(),
            formData,
            (response)=>{
                dispatch(showSuccessModal("Your trade has been accepted by the server", "/trade"));
            },
            (errorMessage)=>{
                dispatch(showErrorModal(errorMessage));
            }
        )
    }

    return (
        <section className="home trade">
            <div className="container">
                <SideBar selectedItem={"trade"} />
                <div className="home__main">
                    <ControlHeader action={ {1: {name: "New Trade", onClick: ()=>{$(".marketOrder").show(); $(".pendingOrder").hide()}}, 2: {name: "Running Trades", onClick: ()=>{$(".marketOrder").hide(); $(".pendingOrder").show()}}}} />
                    <div className="home__content marketOrder">
                        <div className="trendingBox">
                            <div className="autoTrade">
                                <ToggleInput
                                    id={"checkBox"}
                                    name={"checkBox"}
                                />
                                <span><p>Switch to Auto Trading</p></span>
                            </div>
                            <form className="orderForm" onSubmit={openPosition}>
                                <p className="orderForm__title">Trade Type</p>
                                <p className="orderForm__pair">{pair  && pair.name}</p>
                                <div className="orderForm__direction">
                                    <span className="orderForm__directionButton">
                                        <RadioInput
                                            id={"directionSell"}
                                            name={"radio"}
                                            required={"required"}
                                        />
                                        <p>Sell</p>
                                        <p>{pair && (pair.rate - pair.spread).toPrecision(6)}</p>
                                    </span>
                                    <span className="orderForm__directionButton">
                                        <RadioInput
                                            id={"directionBuy"}
                                            name={"radio"}
                                            required={"required"}
                                        />
                                        <p>Buy</p>
                                        <p>{pair && (pair.rate + pair.spread).toPrecision(6)}</p>
                                    </span>
                                </div>
                                <p className="orderForm__lots">Trade Amounts (Lots)</p>
                                <div className="orderForm__lotsControl">
                                    <span className="orderForm__lotsControlButton">+</span>
                                    <input id="lotSize" type="number" min="0.01" step="0.01" placeholder="0.01" />
                                    <span className="orderForm__lotsControlButton">-</span>
                                </div>
                                <div className="orderForm__margin">
                                    <span className="orderForm__marginOccupied">
                                        <p>Occupied Margin(s)</p>
                                        <p>{user.wallet_balance.toLocaleString("en-US")}</p>
                                    </span>

                                    <span className="orderForm__marginAvailable">
                                        <p>Available Margin(s)</p>
                                        <p>{user.wallet_balance.toLocaleString("en-US")}</p>
                                    </span>
                                </div>
                                <button className="orderForm__button button button--form">Place Order</button>
                            </form>
                        </div>
                    </div>

                    <div className="home__content pendingOrder invisible">
                        <div className="trendingBox">
                            <p className="trendingBox__heading">Open Positions</p>
                            {
                              openTrades.map((trade)=>{
                                return <TradingPanel
                                    pair={{name: trade.pair.name, icon: trade.pair.icon}}
                                    position={{direction: trade.direction, lotSize: trade.lotSize, openPrice: trade.openPrice.toPrecision(6), closePrice: trade.closePrice.toPrecision(6), PL: trade.PL.toLocaleString("en-US")}}
                                    spread={{amount: pair.spread, change: pair.change, buy: (pair.rate + pair.spread).toPrecision(6), sell: (pair.rate - pair.spread).toPrecision(6)}}
                                    actions={{close: ()=>{$(".home__content").hide(); $(".orderSummary").show()}}}
                                />


                              })
                            }
                        </div>
                    </div>

                    <div className="home__content orderSummary invisible">
                        <div className="withdraw__details">
                            <div className="withdraw__heading">Order Information</div>
                            <div className="withdraw__summaryTable">
                                <TradingPanel
                                    pair={{name: "Actual Profit and Loss",}}
                                    price={{amount: "$340,000.00"}}
                                />
                            </div>

                            <div className="withdraw__summaryTable">
                                <TradingPanel
                                    pair={{name: "Order Profit and Loss",}}
                                    price={{amount: "$340,000.00"}}
                                />
                                <TradingPanel
                                    pair={{name: "Deferred Charges",}}
                                    price={{amount: "$0.00"}}
                                />
                                <TradingPanel
                                    pair={{name: "Service Charge",}}
                                    price={{amount: "$0.00"}}
                                />
                            </div>

                            <div className="withdraw__summaryTable">
                                <TradingPanel
                                    pair={{name: "Order number",}}
                                    price={{amount: "345654567789-986478"}}
                                />
                                <TradingPanel
                                    pair={{name: "Opening price",}}
                                    price={{amount: "$456.896"}}
                                />
                                <TradingPanel
                                    pair={{name: "Closing price",}}
                                    price={{amount: "$56656"}}
                                />
                                <TradingPanel
                                    pair={{name: "Trade lot",}}
                                    price={{amount: "10.00"}}
                                />
                                <TradingPanel
                                    pair={{name: "Trading direction",}}
                                    price={{amount: "Buy"}}
                                />
                                <TradingPanel
                                    pair={{name: "Closing type",}}
                                    price={{amount: "Manual closing"}}
                                />
                                <TradingPanel
                                    pair={{name: "Occupation of margin ($)",}}
                                    price={{amount: "8000.0000"}}
                                />
                                <TradingPanel
                                    pair={{name: "Opening time",}}
                                    price={{amount: "2023-11-23 22:49:01"}}
                                />
                                <TradingPanel
                                    pair={{name: "Closing time",}}
                                    price={{amount: "2023-11-23 22:49:01"}}
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}