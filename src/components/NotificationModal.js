import React from 'react';
import Modal from 'react-modal';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { hideErrorModal, hideSuccessModal } from '../state/actions/notification';
//import { stopLoading, startLoading } from '../state/actions/preloader';
//import API from '../api/api.mjs';
import Input, {CheckBoxInput} from "./Input";
import {ButtonForm} from "./Button";
import {RoundedImage} from "./Image";


export default function NotificationModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
//    dispatch(stopLoading());
    const {hasError, errorMessage, errorImage, hasSuccess, successMessage, successImage, redirectUrl} = useSelector(state => state.notification);
//    let api = new API();
    const el = document.getElementById('app');

    let close = async (event) => {
        dispatch(hideErrorModal());
        dispatch(hideSuccessModal());

        if(redirectUrl != "")
            navigate(redirectUrl, {replace: true})
    }

    return (
        <div>
            <Modal appElement={el} isOpen={hasError} contentLabel="isOpen">
                <div className="notificationModal" onClick={close}>
                    <span className="overlay--fixed"></span>
                    <div className="container">
                        <div className="notificationModal__box">
                            <h1 className="notificationModal__errorTitle">Oops!</h1>
                            <span >
                                <RoundedImage src={errorImage} />
                            </span>
                            <p className="notificationModal__message">{errorMessage}</p>
                            <div className="">
                                <ButtonForm label={"Next"} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal appElement={el} isOpen={hasSuccess} contentLabel="isOpen">
                <div className="notificationModal" onClick={close}>
                    <span className="overlay--fixed"></span>
                    <div className="container">
                        <div className="notificationModal__box">
                            <h1 className="notificationModal__successTitle">Congratulations</h1>
                            <span className="notificationModal__imageBox">
                                <RoundedImage src={successImage} />
                            </span>
                            <p className="notificationModal__message">{successMessage}</p>
                            <div className="">
                                <ButtonForm label={"Next"} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
