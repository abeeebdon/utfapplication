// SET VERIFICATION CODE VALIDITY DURATION
export const setVerificationTokenValidityDuration = (verificationTokenValidityDuration) => (
    {
        type: "SET_VERIFICATION_CODE_VALIDITY_DURATION",
        verificationTokenValidityDuration,
    }
);

// SET VERIFICATION CODE EXPIRY TIME LEFT
export const setVerificationTokenExpiryTimeLeft = (verificationTokenExpiryTimeLeft) => (
    {
        type: "SET_VERIFICATION_CODE_EXPIRY_TIME_LEFT",
        verificationTokenExpiryTimeLeft,
    }
);

// SET VERIFICATION FIELD
export const setVerificationField = (verificationField) => (
    {
        type: "SET_VERIFICATION_FIELD",
        verificationField,
    }
);

// SET STAGE
export const setStage = (stage) => (
    {
        type: "SET_STAGE",
        stage,
    }
);

// SET FORM DATA
export const setFormData = (formData) => (
    {
        type: "SET_FORM_DATA",
        formData,
    }
);

// SET EMAIL FIELD
export const setEmailField = (emailField) => (
    {
        type: "SET_EMAIL_FIELD",
        emailField,
    }
);

// SET FIRST NAME FIELD
export const setFirstNameField = (firstNameField) => (
    {
        type: "SET_FIRST_NAME_FIELD",
        firstNameField,
    }
);

// SET LAST NAME FIELD
export const setLastNameField = (lastNameField) => (
    {
        type: "SET_LAST_NAME_FIELD",
        lastNameField,
    }
);

// SET PASSWORD FIELD
export const setPasswordField = (passwordField) => (
    {
        type: "SET_PASSWORD_FIELD",
        passwordField,
    }
);

// SET CONFIRM PASSWORD FIELD
export const setConfirmPasswordField = (confirmPasswordField) => (
    {
        type: "SET_CONFIRM_PASSWORD_FIELD",
        confirmPasswordField,
    }
);

// SET AGREE TO TERMS FIELD
export const setAgreeToTermsField = (agreeToTermsField) => (
    {
        type: "SET_AGREE_TO_TERMS_FIELD",
        agreeToTermsField,
    }
);

// RESET FIELDS
export const resetFields = () => (
    {
        type: "RESET_SIGNUP_FORM_FIELDS",
    }
);

// RESET VERIFICATION FIELDS
export const resetVerificationFields = () => (
    {
        type: "RESET_VERIFICATION_FIELDS",
    }
);

// RESET ALL
export const resetAll = () => (
    {
        type: "RESET_ALL"
    }
);