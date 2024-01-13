// SET HOST
export const setServer = (server) => (
    {
        type: "SET_SERVER",
        server
    }
);

export const setApiVersion = (apiVersion) => (
    {
        type: "SET_API_VERSION",
        apiVersion
    }
);

// RESET ALL
export const resetAll = () => (
    {
        type: "RESET_ALL"
    }
);