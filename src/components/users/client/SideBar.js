import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import $ from 'jquery';
//import { logout } from '../../../api/user.js';

import { Image, RoundedImage } from "../../Image";
import Input, { CheckBoxInput, SingleInput, Select, IconedInput, RadioInput, ToggleInput } from "../../Input";
import { setSidebarItem} from '../../../state/actions/configuration';

export function SideBar(props) {
    const dispatch = useDispatch();
    let selectedItem = useSelector(state => state.configuration.sidebarItem);
    const logo = useSelector(state => state.configuration.app.logo);

    dispatch(setSidebarItem(props.selectedItem))

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
    const profileImage = "images/avatars/allison.jpg"//useSelector(state => state.configuration.app.logo);

    const toggleSideBar = async (event) => {
        $(".header__menuToggle").toggleClass("change");
        $(".sidebar").toggleClass("sidebar--open");
    }

    return (
        <div className="header">
            <div className="header__content">
                <div>{props.title}</div>
                <form className="search__form">
                    <span className="search__iconGroup">
                        <span className="search__icon fa fa-search"></span>
                        <input className="search__input" type='search' placeholder="Search for"/>
                    </span>
                </form>

                <div className="accountBar">
                    <div className="header__notification fa fa-bell-o"></div>
                    <div className="profileBar">
                        <p className="profileBar__greetings">Welcome, Tatenda</p>
                        <div className="profileBar__image">
                            <RoundedImage src={profileImage} />
                        </div>
                    </div>
                    <span className="header__menuToggle" onClick={toggleSideBar}>
                         <div class="bar1"></div>
                         <div class="bar2"></div>
                         <div class="bar3"></div>
                    </span>
                </div>
            </div>
        </div>
    );
}

export function ControlHeader(props) {
    const dispatch = useDispatch();
    let sidebarItem = "home"//useSelector(state => state.configuration.sidebarItem);
    const logo = useSelector(state => state.configuration.app.logo);

    const toggleSideBar = async (event) => {
        if( $(".sidebar").css("left") == "-300px"){
            $(".sidebar").addClass("sidebar--open");
        }
        else {
            $(".sidebar").removeClass("sidebar--open");
        }
    }

//    dispatch(setSidebarItem(props.item))

    return (
            <div className="controlHeader">
                <div className="header__content">
                    <div className="controlHeader__items">
                        { props.back && <div className="controlHeader__back" onClick={props.back.onClick}><span className="signup__verificationControlIcon fas fa-angle-left"></span>Back</div> }
                        { props.logo && <div className="controlHeader__logo"> <Image src={logo}/> </div> }
                        { props.action &&
                            <div className="controlHeader__action">
                                <button className="button button--inverted trade">Market Price</button>
                                <button className="button button--inverted trade">Pending Order</button>
                            </div>
                        }
                        { props.title && <div className="controlHeader__title">{props.title}</div> }
                    </div>
                    { props.close && <div className="controlHeader__close" onClick={props.back.onClick}><span className="signup__verificationControlIcon fa fa-close"></span></div> }
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
        <div className="tradingPanel">
            <div className="tradingPanel__pair">
                { props.pair.icon && <div className="tradingPanel__pairIcon"> <RoundedImage src={props.pair.icon} /> </div> }
                <div className="tradingPanel__pairName">
                    <div>{props.pair.name}</div>
                    { props.spread && <div className="tradingPanel__spread--sm">
                        <div className="tradingPanel__price"> Spread {props.spread.amount} </div>
                        <div className="tradingPanel__change tradingPanel__change--down"> {props.spread.change} </div>
                    </div> }
                </div>
            </div>
            { props.trendChart && <div className="tradingPanel__chart">
                <svg preserveAspectRatio="none" viewBox="0 0 148 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M147.452 53.7986L141.698 39.6603L131.341 44.017L120.984 36.2081L112.106 40.8113L102.736 33.1669L83.5009 36.044L73.1437 28.2351L66.239 33.1672L57.6079 15.0012L49.9634 24.372L31.4683 1.52066L23.5772 9.32968L11.7405 7.35699L1.13681 16.2346" stroke="#FF2C2C"/>
                </svg>
            </div> }
            { props.price && <div className="tradingPanel__figure">
                <div className="tradingPanel__price"> {props.price.amount} </div>
                <div className="tradingPanel__change tradingPanel__change--down"> {props.price.change} </div>
            </div> }
            { props.spread && <div className="tradingPanel__figure tradingPanel__spread">
                <div className="tradingPanel__price"> Spread {props.spread.amount} </div>
                <div className="tradingPanel__change tradingPanel__change--down"> {props.spread.change} </div>
            </div> }
            { props.actions && <div className="tradingPanel__action">
                    { props.actions.trade && <button className="button button--inverted trade">Trade</button> }
                    { props.actions.buy && props.spread && <button className="button button--inverted buy">
                            <div className="tradingPanel__pairName">BUY</div>
                            <div>{props.spread.buy}</div>
                    </button> }
                    { props.actions.buy && props.spread && <button className="button button--inverted sell">
                            <div className="tradingPanel__pairName">SELL</div>
                            <div>{props.spread.sell}</div>
                    </button> }
            </div> }
        </div>
    );
}