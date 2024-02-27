const accountReducerDefaultState = {
    isLoggedIn: false,
    isOnboarded: false,
    user: {
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
        lastLogin: null,
        dateJoined: null,
        role: null
    },
    authentication: {
        userId: null,
        token: '',
        expires: '',
        refreshToken: ''
    },
    openTrades: [],
    wallets: null,//{
//        myWallet: {
//            name: 'myWallet',
//            addresses: {
//                btcId: 'btc_address',
//            },
//            balances: {
//                currencyId: 1000
//            }
//        }
   // },
   transactions: [],
   settings: {
        language: {
            options: { EN: {name:'English'}, RU: {name:'Russia'} },
            selected: 'EN'
        },
        currency: {
            options: { USD: 'United States Dollar', NGN: 'Nigerian Naira' },
            selected: 'USD'
        },
        beneficiaries: {
            phone: [
                {
                    number: '7080795366',
                    countryCode: 'NG'
                },
                {
                    number: '8138328311',
                    countryCode: 'NG'
                },
                {
                    number: '9536712460',
                    countryCode: 'US'
                },
            ],
            electricity: [
                {
                    number: '7080795366',
                    countryCode: 'NG',
                    distribution: 'Port Harcourt',
                    type: "Prepaid"
                },
            ],
            cableTV: []
        },
        twoFactorAuthentication: false,
   }
};

export default ( state = accountReducerDefaultState, action ) => {
    switch (action.type) {
        case "SET_LOGGED_IN":
            return { ...state, isLoggedIn: action.isLoggedIn }
        case "SET_ONBOARDED":
            return { ...state, isOnboarded: action.isOnboarded }
        case "SET_USER":
            return { ...state, user: action.user }
        case "SET_OPEN_TRADES":
            return { ...state, openTrades: action.openTrades }
        case "SET_WALLETS":
            return { ...state, wallets: action.wallets }
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.transactions }
        case "SET_AUTHENTICATION":
            return { ...state, authentication: action.authentication }
        case "SET_SETTINGS":
            return { ...state, settings: action.settings }
        case "RESET_ACCOUNT_FIELDS":
        case "RESET_ALL":
            return accountReducerDefaultState;
        default:
            return state;
    }
}