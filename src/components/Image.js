import ReactDOM from 'react-dom/client';
import React from 'react';


export class Image extends React.Component {
    class = "image--full";

    initImage(){
        let props = this.props;
        if(props.src){
            if(!props.lazy){
                this.src = props.src;
            }
            else{
                this.lazy = true;
                this.src = props.placeholder;
                this.placeholder = props.src;
            }
        }
        else{
            this.src = props.placeholder;
        }
    }

    render(){
        this.initImage();
        return (
            <div className="image__box">
                <img className={`${this.class} ${this.lazy? "lazy" : ""}`}
                     src={`${this.src}`} data-src={`${this.placeholder}`}
                />
            </div>
        );
    }
}

Image.defaultProps = {
    placeholder: "/images/placeholder.png"
}


export class CorneredImage extends Image {
    class = "image--full image--cornered";
}


export class RoundedImage extends Image {
    class = "image--full image--rounded";
}