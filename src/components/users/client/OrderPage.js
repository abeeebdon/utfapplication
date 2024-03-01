import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import $ from 'jquery';


import { Image } from "../../Image";
import { ButtonForm, ButtonInverted } from "../../Button";

import { showErrorModal, showSuccessModal, showActionModal } from '../../../state/actions/notification';
import { selectNewBuyTradeEndpoint, selectNewSellTradeEndpoint, selectCloseTradeEndpoint } from '../../../state/selectors/endpoints';
import Input, { CheckBoxInput, SingleInput, IconedInput, FileUpload, ToggleInput, RadioInput } from "../../Input";
import API from '../../../api/api.mjs';
import { SideBar, Header, TradingPanel, ControlHeader} from "./SideBar";
import { requireLogin, populateTrades, calculateAccountSummary } from '../../../api/user.js';
import { populatePairs } from '../../../api/configuration.js';

export default function OrderPage() {
    requireLogin();
    populateTrades();

    const dispatch = useDispatch();
    let api = new API();
    const {pairName} = useParams();
    let pair;
    let floatingPL = 0;
    const pairs = useSelector(state => state.configuration.pairs);
    const openTrades = useSelector(state => state.account.openTrades);
    let getNewBuyTradeURL = useSelector(state => selectNewBuyTradeEndpoint(state.endpoints));
    let getNewSellTradeURL = useSelector(state => selectNewSellTradeEndpoint(state.endpoints));
    let getCloseTradeURL = useSelector(state => selectCloseTradeEndpoint(state.endpoints));

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

        floatingPL += openTrades[index].PL;
    })

    let accountSummary = calculateAccountSummary()



    const user = useSelector(state => state.account.user);
    const openPosition = async (event) => {
        event.preventDefault();

        let getNewTradeURL  = document.getElementById("directionSell").checked == true ? getNewSellTradeURL : getNewBuyTradeURL;

        let lotSize = parseFloat($("#lotSize").val())
        lotSize = lotSize.toFixed(2)

        let downPrice = (pair.rate * lotSize * 100000) / accountSummary.leverage

        if(lotSize <= 0 || accountSummary.equity < downPrice)
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
    const closePosition = async (trade) => {
        let formData = {
            trade_id: trade.id, lot_cost: trade.pair.rate
        }

        return api.post(
            getCloseTradeURL(),
            formData,
            (response)=>{
                dispatch(showActionModal(
                    <>
                        <div className="home__content orderSummary" style={{width : "-webkit-fill-available"}}>
                            <div className="withdraw__details">
                                <div className="withdraw__heading">Order Information</div>
                                <div className="withdraw__summaryTable">
                                    <TradingPanel
                                        pair={{name: "Actual Profit and Loss",}}
                                        price={{amount: `$${trade.PL.toLocaleString("en-US")}`}}
                                    />
                                </div>

                                <div className="withdraw__summaryTable">
                                    <TradingPanel
                                        pair={{name: "Order Profit and Loss",}}
                                        price={{amount: `$${trade.PL.toLocaleString("en-US")}`}}
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
                                        price={{amount: trade.id}}
                                    />
                                    <TradingPanel
                                        pair={{name: "Opening price",}}
                                        price={{amount: `$${trade.openPrice.toPrecision(6)}`}}
                                    />
                                    <TradingPanel
                                        pair={{name: "Closing price",}}
                                        price={{amount: `$${trade.closePrice.toPrecision(6)}`}}
                                    />
                                    <TradingPanel
                                        pair={{name: "Trade lot",}}
                                        price={{amount: trade.lotSize}}
                                    />
                                    <TradingPanel
                                        pair={{name: "Trading direction",}}
                                        price={{amount: trade.direction}}
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
                                        price={{amount: trade.openTime}}
                                    />
                                    <TradingPanel
                                        pair={{name: "Closing time",}}
                                        price={{amount: trade.closeTime}}
                                    />
                                </div>

                            </div>
                        </div>
                    </>
                ));
                populateTrades()
            },
            (errorMessage)=>{
                dispatch(showErrorModal(errorMessage));
            }
        )
    }
    const increaseLotSize = async () => {
        let currentLotSize = parseFloat( $("#lotSize").val() )
        if(currentLotSize && currentLotSize < 0)
            return

        $("#lotSize").val((currentLotSize + 0.01).toFixed(2))
    }
    const decreaseLotSize = async () => {
        let currentLotSize = parseFloat( $("#lotSize").val() )
        if(currentLotSize && currentLotSize <= 0.01)
            return

        $("#lotSize").val((currentLotSize - 0.01).toFixed(2))
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
                                    <span className="orderForm__lotsControlButton" onClick={increaseLotSize}>+</span>
                                    <input id="lotSize" type="number" min="0.01" step="0.01" defaultValue="0.01" />
                                    <span className="orderForm__lotsControlButton" onClick={decreaseLotSize}>-</span>
                                </div>
                                <div className="orderForm__margin">
                                    <span className="orderForm__marginOccupied">
                                        <p>Occupied Margin(s)</p>
                                        <p>{accountSummary.margin.toLocaleString("en-US")}</p>
                                    </span>

                                    <span className="orderForm__marginAvailable">
                                        <p>Available Margin(s)</p>
                                        <p>{accountSummary.freeMargin.toLocaleString("en-US")}</p>
                                    </span>
                                </div>
                                <button className="orderForm__button button button--form">Place Order</button>
                            </form>
                        </div>
                    </div>

                    <div className="home__content pendingOrder invisible">
                        <div className="trendingBox">
                            <p className="trendingBox__heading">Open Positions</p>
                            <p className="trendingBox__heading" style={{color: floatingPL < 0 ? "red": "blue"}}>{floatingPL.toLocaleString("en-US")} USD</p>
                            {
                              openTrades.map((trade, index)=>{
                                return <TradingPanel key={index}
                                    pair={{name: trade.pair.name, icon: trade.pair.icon}}
                                    position={{direction: trade.direction, lotSize: trade.lotSize, openPrice: trade.openPrice.toPrecision(6), closePrice: trade.closePrice.toPrecision(6), PL: trade.PL}}
                                    spread={{amount: pair.spread, change: pair.change, buy: (pair.rate + pair.spread).toPrecision(6), sell: (pair.rate - pair.spread).toPrecision(6)}}
                                    actions={{close: ()=>{closePosition(trade)} }}
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