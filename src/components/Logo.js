import ReactDOM from 'react-dom/client';
import React from 'react';

export default class Logo extends React.Component {
    render(){
        return (
            <div>
                <img className="logo" src="/images/logo.png" />
            </div>
        );
    }
}