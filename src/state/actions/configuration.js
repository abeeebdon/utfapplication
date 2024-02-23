// SET APP
export const setApp = (app) => (
    {
        type: "SET_APP",
        app
    }
);

// SET CRYPTOS
export const setCryptos = (cryptos) => (
    {
        type: "SET_CRYPTOS",
        cryptos
    }
);

// SET COUNTRIES
export const setCountries = (countries) => (
    {
        type: "SET_COUNTRIES",
        countries,
    }
);

// SET CURRENCIES
export const setCurrencies = (currencies) => (
    {
        type: "SET_CURRENCIES",
        currencies
    }
);

// SET SIDEBAR ITEM
export const setSidebarItem = (sidebarItem) => (
    {
        type: "SET_SIDEBAR_ITEM",
        sidebarItem
    }
);

// SET MOBILE RECHARGERS
export const setMobileRechargers = (mobileRechargers) => (
    {
        type: "SET_MOBILE_RECHARGERS",
        mobileRechargers
    }
);

// SET OPERATORS
export const setOperators = (operators) => (
    {
        type: "SET_OPERATORS",
        operators
    }
);

// SET BLOCKCHAINS
export const setBlockchains = (blockchains) => (
    {
        type: "SET_BLOCKCHAINS",
        blockchains
    }
);

// SET PAIRS
export const setPairs = (pairs) => (
    {
        type: "SET_PAIRS",
        pairs
    }
);

// RESET ALL
export const resetAll = () => (
    {
        type: "RESET_ALL"
    }
);