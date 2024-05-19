import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'


import { Image } from "./Image";
import { ButtonForm } from "./Button";

export default function TermsPage() {
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

    return (
        <>
            <div className="termsPage">
                <div className="termpage">
                    <h1>Terms and Conditions</h1>

                    <div>Welcome to Universal FX Copy Trading.</div>

                    <p>
                        Universal FX Copy Trading provides a platform for traders of all levels to replicate the trades of
                        successful traders in real-time. By connecting investors with skilled traders, it allows less
                        experienced individuals to potentially profit from the expertise of others in the financial markets.
                        With Universal FX Copy Trading, users can follow and copy the strategies of top traders, diversify
                        their portfolios, and potentially improve their trading outcomes.
                    </p>

                    <h2>What is COPY TRADING?</h2>
                    <p>COPY TRADING allows users to grant authority to our COPY TRADER MASTER, who will trade on their
                    behalf. Users may experience both profit and loss, depending on market conditions.</p>

                    <h3>Risk:</h3>
                    <p>Users can control their risk by closing the Copy Trading button on time. Universal FX will not be
                    responsible for any losses incurred if users fail to close their Copy Trading button.</p>

                    <h3>Profit Ratio:</h3>

                    <p>For Beginners Level:
                    1% to 1.4%
                    </p>

                    <p>For Medium Level:
                    1.5% To 1.8%</p>

                    <p>For Advanced Level:
                    1.9% To 2.5%</p>

                    <b>Note:</b> The profit ratio is variable and depends on trading conditions.

                    <h3>Attention:</h3>
                    <p>When a user activates their Copy Trading button, they must also send a message to Customer Care
                    confirming, "Yes, I have opened my Copy Trading button." If a user fails to do so, the
                    Trader Master will not accept the trade.</p>

                    <h3>Contact Us:</h3>
                    <p>Whatsapp: +44 7412 941619<br/>
                    Telegram: @UniversalFx<br/>
                    Email: support@universalfx.site<br/>
                    Facebook Page: Universal FX Official<br/>
                    Instagram: universalfxofficial</p>
                </div>
            </div>
        </>
    );
}