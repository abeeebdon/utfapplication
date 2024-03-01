import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import $ from 'jquery';
//import { logout } from '../../../api/user.js';

import { Image, RoundedImage } from "../../Image";
import { DoughnutChart, LineChart } from "../../Chart.js"
import Input, { CheckBoxInput, SingleInput, Select, IconedInput, RadioInput, ToggleInput } from "../../Input";
import { setSidebarItem} from '../../../state/actions/configuration';

export function SideBar(props) {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSidebarItem(props.selectedItem));
    }, [props.selectedItem]);

    let selectedItem = useSelector(state => state.configuration.sidebarItem);
    const logo = useSelector(state => state.configuration.app.logo);



    return (
        <div className="sidebar">
            <div className="sidebar__content">
                <div className="sidebar__appName">
                    <Image src={logo}/>
                </div>

                <nav className="sidebar__menu">
                    <Link className={ `sidebar__menuItem ${selectedItem == 'home' && "sidebar__menuItem--selected" }` } to='/home'>
                        <span className="sidebar__menuIcon fa fa-home"></span>
                        <span className="sidebar__menuText">Home</span>
                    </Link>
                    <Link className={ `sidebar__menuItem ${selectedItem == 'trade' && "sidebar__menuItem--selected" }` } to='/trade'>
                        <span className="sidebar__menuIcon fa fa-bar-chart-o"></span>
                        <span className="sidebar__menuText">Trade</span>
                    </Link>
                    <Link className={ `sidebar__menuItem ${selectedItem == 'reward' && "sidebar__menuItem--selected" }` } to='/reward'>
                        <span className="sidebar__menuIcon fa fa-gift"></span>
                        <span className="sidebar__menuText">Reward</span>
                    </Link>
                    <Link className={ `sidebar__menuItem ${selectedItem == 'market' && "sidebar__menuItem--selected" }` } to='/market'>
                        <span className="sidebar__menuIcon fa fa-line-chart"></span>
                        <span className="sidebar__menuText">Market</span>
                    </Link>
                    <Link className={ `sidebar__menuItem ${selectedItem == 'account' && "sidebar__menuItem--selected" }` } to='/account'>
                        <span className="sidebar__menuIcon fa fa-user"></span>
                        <span className="sidebar__menuText">Account</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export function Header(props) {
    const dispatch = useDispatch();
    let sidebarItem = "home"//useSelector(state => state.configuration.sidebarItem);
    const profileImage = "/images/avatars/avatar.jpg"//useSelector(state => state.configuration.app.logo);
    const user = useSelector(state => state.account.user);

    const toggleSideBar = async (event) => {
        $(".header__menuToggle").toggleClass("change");
        $(".sidebar").toggleClass("sidebar--open");
    }

    return (
        <div className="header">
            <div className="header__content">
                <div className="profileBar__greetings">{props.title}</div>
                <form className="search__form">
                    <span className="search__iconGroup">
                        <span className="search__icon fa fa-search"></span>
                        <input className="search__input" type='search' placeholder="Search for"/>
                    </span>
                </form>

                <div className="accountBar">
                    <div className="header__notification fa fa-bell-o"></div>
                    <div className="profileBar">
                        <p className="profileBar__greetings">Welcome, {user.full_name}</p>
                        <div className="profileBar__image">
                            <RoundedImage src={profileImage} />
                        </div>
                    </div>
                    <span className="header__menuToggle" onClick={toggleSideBar}>
                         <div className="bar1"></div>
                         <div className="bar2"></div>
                         <div className="bar3"></div>
                    </span>
                </div>
            </div>
        </div>
    );
}

export function ControlHeader(props) {
    const dispatch = useDispatch();
    const logo = useSelector(state => state.configuration.app.logo);

    const toggleSideBar = async (event) => {
        $(".header__menuToggle").toggleClass("change");
        $(".sidebar").toggleClass("sidebar--open");
    }

    return (
            <div className="controlHeader">
                <div className="header__content">
                    <div className="controlHeader__items">
                        { props.back && <div className="controlHeader__back" onClick={props.back.onClick}><span className="signup__verificationControlIcon fas fa-angle-left"></span>Back</div> }
                        { props.logo && <div className="controlHeader__logo"> <Image src={logo}/> </div> }
                        { props.action &&
                            <div className="controlHeader__action">{
                                Object.entries(props.action).map(([key,value])=>{
                                    return <button key={key} className="button button--inverted trade" onClick={value.onClick && value.onClick}>{value.name}</button>
                                })
                            }</div>
                        }
                        { props.title && <div className="controlHeader__title">{props.title}</div> }
                    </div>
                    { props.close && <div className="controlHeader__close" onClick={props.back.onClick}><span className="signup__verificationControlIcon fa fa-close"></span></div> }

                    <span className="header__menuToggle" onClick={toggleSideBar}>
                         <div className="bar1"></div>
                         <div className="bar2"></div>
                         <div className="bar3"></div>
                    </span>
                </div>
                { props.progress &&
                    <div className="progressBar">
                        <div className="progress" style={{width: props.progress}}>
                        </div>
                    </div>
                }
            </div>
    );
}

export function TradingPanel(props) {
    const dispatch = useDispatch();

    return (
        <div className="tradingPanel" onClick={props.onClick && props.onClick}>
            <div className="tradingPanel__pair">
                { props.pair.icon && <div className="tradingPanel__pairIcon"> <RoundedImage src={props.pair.icon} /> </div> }
                <div className="tradingPanel__pairName">
                    <div>{props.pair.name}</div>
                    { props.spread && <div className="tradingPanel__spread--sm">
                        <div className="tradingPanel__price"> Spread {props.spread.amount} </div>
                        <div className={`tradingPanel__change ${props.spread.change && props.spread.change < 0? "tradingPanel__change--down":"tradingPanel__change--up"}`}> {props.spread.change && props.spread.change < 0? props.spread.change : `+${props.spread.change}`}% </div>
                    </div> }
                </div>
            </div>
            { props.trendChart && <div className="tradingPanel__chart">
                { props.price &&
                    <LineChart data={props.trendChart} color={props.price.change && props.price.change < 0 ? "red": "green"}/>
                }
                { props.spread &&
                    <LineChart data={props.trendChart} color={props.spread.change && props.spread.change < 0 ? "red": "green"}/>
                }
            </div> }
            { props.spread && !props.position && <div className="tradingPanel__figure tradingPanel__spread">
                <div className="tradingPanel__price"> Spread {props.spread.amount} </div>
                <div className={`tradingPanel__change ${props.spread.change && props.spread.change < 0? "tradingPanel__change--down":"tradingPanel__change--up"}`}> {props.spread.change && props.spread.change < 0? props.spread.change : `+${props.spread.change}`}% </div>
            </div> }
            { props.price && <div className="tradingPanel__figure">
                <div className="tradingPanel__price"> {props.price.amount} </div>
                { props.price.change &&
                    <div className={`tradingPanel__change ${props.price.change && props.price.change < 0? "tradingPanel__change--down":"tradingPanel__change--up"}`}> {props.price.change && props.price.change < 0? props.price.change : `+${props.price.change}`}% </div>
                }
            </div> }
            { props.position && <div>
                <div className="tradingPanel__price" style={{color: props.position.direction == "buy"? "blue": "red"}}> {props.position.direction} {props.position.lotSize} </div>
                <div className="tradingPanel__price"> {props.position.openPrice} <small>`n</small> {props.position.closePrice} </div>
            </div> }
            { props.position && <div>
                <div className="tradingPanel__price" style={{color: props.position.PL < 0? "red" : "blue"}}> {props.position.PL.toLocaleString("en-US")} </div>
            </div> }
            { props.actions && <div className="tradingPanel__action">
                    { props.actions.trade && <button className="button button--inverted trade" onClick={props.actions.trade}>Trade</button> }
                    { props.actions.close && <button className="button button--inverted trade" onClick={props.actions.close}>Close</button> }
                    { props.actions.buy && props.spread && <button className={`button button--inverted buy ${props.spread.change < 0? "priceDown": "priceUp"}`} onClick={props.actions.buy}>
                            <div className="tradingPanel__pairName">BUY</div>
                            <div>{props.spread.buy}</div>
                    </button> }
                    { props.actions.buy && props.spread && <button className={`button button--inverted sell ${props.spread.change < 0? "priceDown": "priceUp"}`} onClick={props.actions.sell}>
                            <div className="tradingPanel__pairName">SELL</div>
                            <div>{props.spread.sell}</div>
                    </button> }
            </div> }
        </div>
    );
}