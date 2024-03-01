// SHOW ERROR MODAL
export const showErrorModal = (errorMessage, redirectUrl="") => (
    {
        type: "SHOW_ERROR_MODAL",
        errorMessage,
        redirectUrl
    }
);

// HIDE ERROR MODAL
export const hideErrorModal = () => (
    {
        type: "HIDE_ERROR_MODAL"
    }
);

// SHOW SUCCESS MODAL
export const showSuccessModal = (successMessage, redirectUrl="") => (
    {
        type: "SHOW_SUCCESS_MODAL",
        successMessage,
        redirectUrl
    }
);

// HIDE SUCCESS MODAL
export const hideSuccessModal = () => (
    {
        type: "HIDE_SUCCESS_MODAL"
    }
);

// SHOW ACTION MODAL
export const showActionModal = (actionMessage, redirectUrl="") => (
    {
        type: "SHOW_ACTION_MODAL",
        actionMessage,
        redirectUrl
    }
);

// HIDE ACTION MODAL
export const hideActionModal = () => (
    {
        type: "HIDE_ACTION_MODAL"
    }
);

// RESET ALL
export const resetAll = () => (
    {
        type: "RESET_ALL"
    }
);