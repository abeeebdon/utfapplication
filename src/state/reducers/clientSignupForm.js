const clientSignupFormReducerDefaultState = {
    formData: {
        email: null,
        firstName: null,
        lastName: null,
        password: null
    },
    stage: "signup",
    emailField: {
        hasError: false,
        errorMessage: ""
    },
    firstNameField: {
        hasError: false,
        errorMessage: "",
    },
    lastNameField: {
        hasError: false,
        errorMessage: "",
    },
    passwordField: {
        hasError: false,
        errorMessage: "",
    },
    confirmPasswordField: {
        hasError: false,
        errorMessage: "",
    },
    agreeToTermsField: {
        hasError: false,
        errorMessage: ""
    }
};

const clientSignupVerificationFormReducerDefaultState = {
    verificationTokenValidityDuration: 5,
    verificationTokenExpiryTimeLeft: "0:0",
    verificationField: {
        hasError: false,
        errorMessage: ""
    },
};

export default ( state = { ...clientSignupFormReducerDefaultState, ...clientSignupVerificationFormReducerDefaultState  }, action ) => {
    switch (action.type) {
        case "SET_VERIFICATION_CODE_VALIDITY_DURATION":
            return { ...state, verificationTokenValidityDuration: action.verificationTokenValidityDuration }
        case "SET_VERIFICATION_CODE_EXPIRY_TIME_LEFT":
            return { ...state, verificationTokenExpiryTimeLeft: action.verificationTokenExpiryTimeLeft }
        case "SET_VERIFICATION_FIELD":
            return { ...state, verificationField: action.verificationField }
        case "SET_STAGE":
            return { ...state, stage: action.stage }
        case "SET_FORM_DATA":
            return { ...state, formData: action.formData }
        case "SET_EMAIL_FIELD":
            return { ...state, emailField: action.emailField }
        case "SET_FIRST_NAME_FIELD":
            return { ...state, firstNameField: action.firstNameField }
        case "SET_LAST_NAME_FIELD":
            return { ...state, lastNameField: action.lastNameField }
        case "SET_PASSWORD_FIELD":
            return { ...state, passwordField: action.passwordField }
        case "SET_CONFIRM_PASSWORD_FIELD":
            return { ...state, confirmPasswordField: action.confirmPasswordField }
        case "SET_AGREE_TO_TERMS_FIELD":
            return { ...state, agreeToTermsField: action.agreeToTermsField }
        case "RESET_SIGNUP_FORM_FIELDS":
            return { ...clientSignupFormReducerDefaultState, ...clientSignupVerificationFormReducerDefaultState  };
        case "RESET_VERIFICATION_FIELDS":
            return { ...state, ...clientSignupVerificationFormReducerDefaultState };
        case "RESET_ALL":
            return { ...clientSignupFormReducerDefaultState, ...clientSignupVerificationFormReducerDefaultState };
        default:
            return state;
    }
}