const endpointsReducerDefaultState = {
    server: {
        protocol: "http",
        host: "localhost:8080"
    },
    apiVersion: "v0.0.0"
};

export default ( state = endpointsReducerDefaultState, action ) => {
    switch (action.type) {
        case "SET_SERVER":
            return { ...state, server: action.server }
        case "SET_API_VERSION":
            return { ...state, apiVersion: action.apiVersion }
//        case "RESET_ALL":
//            return endpointsReducerDefaultState;
        default:
            return state;
    }
}