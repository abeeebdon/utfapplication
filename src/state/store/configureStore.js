import {createStore, combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
//import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import configurationReducer from '../reducers/configuration';
import endpointsReducer from '../reducers/endpoints';
import clientSignupFormReducer from '../reducers/clientSignupForm';
import notificationReducer from '../reducers/notification';
import accountReducer from '../reducers/account';

export default () => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['configuration', "account", "endpoints"]
    }

    const rootReducer = combineReducers({
        configuration: configurationReducer,
        endpoints: endpointsReducer,
        clientSignupForm: clientSignupFormReducer,
//        preloader: preloaderReducer,
        notification: notificationReducer,
//        images: imagesReducer,
//        buyAirtimeForm: buyAirtimeFormReducer,
        account: accountReducer
    })

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer);

    const persistor = persistStore(store);

    return store;
}