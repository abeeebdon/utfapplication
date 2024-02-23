// SET LOGGED IN
export const setLoggedIn = (isLoggedIn) => (
    {
        type: "SET_LOGGED_IN",
        isLoggedIn
    }
);

// SET ONBOARDED
export const setOnboarded = (isOnboarded) => (
    {
        type: "SET_ONBOARDED",
        isOnboarded
    }
);

// SET AUTHENTICATION
export const setAuthentication = (authentication) => (
    {
        type: "SET_AUTHENTICATION",
        authentication
    }
);

// SET USER
export const setUser = (user) => (
    {
        type: "SET_USER",
        user
    }
);

// SET WALLETS
export const setWallets = (wallets) => (
    {
        type: "SET_WALLETS",
        wallets
    }
);

// SET TRANSACTIONS
export const setTransactions = (transactions) => (
    {
        type: "SET_TRANSACTIONS",
        transactions
    }
);

// SET SETTINGS
export const setSettings = (settings) => (
    {
        type: "SET_SETTINGS",
        settings
    }
);

// RESET ALL
export const resetAll = () => (
    {
        type: "RESET_ALL"
    }
);