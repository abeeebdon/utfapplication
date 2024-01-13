import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'


import { Image } from "./Image";
import { ButtonForm } from "./Button";

export default function LaunchPage() {
//    const dispatch = useDispatch();
//
//    useEffect(()=>{
//        dispatch(startLoading());
//
//        setTimeout(
//          function(){
//            dispatch(stopLoading());
//          }, 2000);
//    }, [])

    const logo = useSelector(state => state.configuration.app.logo);
    console.log(logo)

    return (
        <>
            <div className="launchpage">
                <div className="launchpage__logo breathe"><Image src={logo}/></div>
                <h1 className="launchpage__title">Universal <span className="launchpage__title--blue">FX</span></h1>
                <div className="launchpage__cta"><ButtonForm label={"Get Started"} /></div>
            </div>
        </>
    );
}