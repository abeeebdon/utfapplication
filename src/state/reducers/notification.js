const notificationReducerDefaultState = {
    hasError: false,
    errorMessage: "",
    errorImage: "../../images/error.jpeg",
    hasSuccess: false,
    successMessage: "",
    successImage: "../../images/success.png",
    redirectUrl: "",
    hasAction: false,
    actionMessage: "",
};

export default ( state = notificationReducerDefaultState, action ) => {
    switch (action.type) {
        case "SHOW_ERROR_MODAL":
            return { ...state, hasError: true, errorMessage: action.errorMessage, redirectUrl: action.redirectUrl }
        case "HIDE_ERROR_MODAL":
            return { ...state, hasError: false, errorMessage: "", redirectUrl: "" }
        case "SHOW_SUCCESS_MODAL":
            return { ...state, hasSuccess: true, successMessage: action.successMessage, redirectUrl: action.redirectUrl }
        case "HIDE_SUCCESS_MODAL":
            return { ...state, hasSuccess: false, successMessage: "", redirectUrl: "" }
        case "SHOW_ACTION_MODAL":
            return { ...state, hasAction: true, actionMessage: action.actionMessage, redirectUrl: action.redirectUrl }
        case "HIDE_ACTION_MODAL":
            return { ...state, hasAction: false, actionMessage: "", redirectUrl: "" }
        case "RESET_ALL":
            return notificationReducerDefaultState;
        default:
            return state;
    }
}