const configurationReducerDefaultState = {
    app: { name: "", namePlural: "", version: "", logo: "" },
    cryptos: [],
    countries: {},
    sidebarItem: '',
    blockchains: {
//        bitcoinId: {
//            name: "Bitcoin",
//            blockchainId: '1'
//        }
    },
    currencies: {
//        currencyId: {
//            name: "Tether USD",
//            symbol: "USDT"
//        }
    },
    operators: [],
    masterWallets: [],
    mobileRechargers: []
};

export default ( state = configurationReducerDefaultState, action ) => {
    switch (action.type) {
        case "SET_APP":
            return { ...state, app: action.app }
        case "SET_CRYPTOS":
            return { ...state, cryptos: action.cryptos }
        case "SET_COUNTRIES":
            return { ...state, countries: action.countries }
        case "SET_CURRENCIES":
            return { ...state, currencies: action.currencies }
        case "SET_SIDEBAR_ITEM":
            return { ...state, sidebarItem: action.sidebarItem }
        case "SET_MOBILE_RECHARGERS":
            return { ...state, mobileRechargers: action.mobileRechargers }
        case "SET_OPERATORS":
            return { ...state, operators: action.operators }
        case "SET_BLOCKCHAINS":
            return { ...state, blockchains: action.blockchains }
//        case "RESET_ALL":
//            return configurationReducerDefaultState;
        default:
            return state;
    }
}