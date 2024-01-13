import ReactDOM from 'react-dom/client';
import React from 'react';


export default class Button extends React.Component {
    class = "button";

    onClick = (event) => {
        if(this.props.onClick)
            this.props.onClick(event);
    }

    render(){
        return (
            <button className={`${this.class}`} onClick={this.onClick}>{this.props.label}</button>
        );
    }
}


export class ButtonInverted extends Button {
    class = "button button--inverted";
}


export class ActionButton extends Button {
    class = "button button--action";
}


export class ActionButtonInverted extends Button {
    class = "button button--action button--action--inverted";
}


export class ActionButtonDark extends Button {
    class = "button button--action button--dark";
}


export class ButtonForm extends Button {
    class = "button button--form";
}