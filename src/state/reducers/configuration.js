const configurationReducerDefaultState = {
    app: { name: "", namePlural: "", version: "", logo: "" },
    cryptos: [],
    countries: {},
    depositAddress: "",
    sidebarItem: '',
    autoTrade: true,
    blockchains: {
//        bitcoinId: {
//            name: "Bitcoin",
//            blockchainId: '1'
//        }
    },
    pairs: {
//        GPBUSD: {
//            name: "GBPUSD",
//            rate: "1",
//            spread: "1",
//            change: "1",
//            icon: ""
//        }
    }
};

export default ( state = configurationReducerDefaultState, action ) => {
    switch (action.type) {
        case "SET_APP":
            return { ...state, app: action.app }
        case "SET_CRYPTOS":
            return { ...state, cryptos: action.cryptos }
        case "SET_COUNTRIES":
            return { ...state, countries: action.countries }
        case "SET_DEPOSIT_ADDRESS":
            return { ...state, depositAddress: action.depositAddress }
        case "SET_CURRENCIES":
            return { ...state, currencies: action.currencies }
        case "SET_SIDEBAR_ITEM":
            return { ...state, sidebarItem: action.sidebarItem }
        case "SET_AUTO_TRADE":
            return { ...state, autoTrade: action.autoTrade }
        case "SET_MOBILE_RECHARGERS":
            return { ...state, mobileRechargers: action.mobileRechargers }
        case "SET_OPERATORS":
            return { ...state, operators: action.operators }
        case "SET_PAIRS":
            let pairs = {...state.pairs}
            pairs[action.pair.name] = action.pair
            console.log(pairs)
            return { ...state, pairs }
//        case "RESET_ALL":
//            return configurationReducerDefaultState;
        default:
            return state;
    }
}