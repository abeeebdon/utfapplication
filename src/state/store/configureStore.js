import {createStore, combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
//import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import configurationReducer from '../reducers/configuration';

export default () => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['configuration']
    }

    const rootReducer = combineReducers({
        configuration: configurationReducer,
//        endpoints: endpointsReducer,
//        clientSignupForm: clientSignupFormReducer,
//        preloader: preloaderReducer,
//        notification: notificationReducer,
//        images: imagesReducer,
//        buyAirtimeForm: buyAirtimeFormReducer,
//        account: accountReducer
    })

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer);

    const persistor = persistStore(store);

    return store;
}