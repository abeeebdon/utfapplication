import {createSelector} from 'reselect'

export const selectVerificationTokenEndpoint = (endpoints) => {
        return (email)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/users/${email}/verification`
        }
}

export const selectVerifyEmailEndpoint = (endpoints) => {
        return (email, token)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/users/${email}/verification/${token}`;
        }
}

export const selectRegisterUserEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/users`;
        }
}

export const selectGenerateAuthenticationTokenEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/users/authenticationToken`;
        }
}

export const selectRefreshAuthenticationTokenEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/users/authenticationRefreshToken`;
        }
}

export const selectGetUserInfoEndpoint = (endpoints) => {
        return (userId)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/users/${userId}`;
        }
}

export const selectBuyAirtimeEndpoint = createSelector(state => state.endpoints, (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/transactions/airtime`;
        }
});

export const selectCalculateAirtimeCostEndpoint = createSelector(state => state.endpoints, (endpoints) => {
        return (countryCode, currencyId, amount)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/transactions/airtime/countries/${countryCode}/currencies/${currencyId}/amount/${amount}`;
        }
});

export const selectGetOperatorsInCountryEndpoint = (endpoints) => {
        return (id, countryCode)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/mobileRechargers/${id}/country/${countryCode}/operators`;
        }
}

export const selectGetMobileRechargersEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/mobileRechargers`;
        }
}

export const selectGetCurrenciesEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/currencies`;
        }
}

export const selectGetTransactionsEndpoint = (endpoints) => {
        return (userId)=>{
//            userId = "0f2ec2cb-cf8a-4e61-8836-3c76d1178b2f"
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/transactions/users/${userId}`;
        }
}

export const selectGetBlockchainsEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/blockchains`;
        }
}

export const selectGetWalletsEndpoint = (endpoints) => {
        return (userId)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/wallets/users/${userId}`;
        }
}

export const selectAddWalletEndpoint = (endpoints) => {
        return ()=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/wallets`;
        }
}

export const selectAddKeyEndpoint = (endpoints) => {
        return (walletId)=>{
            return `${endpoints.server.protocol}://${endpoints.server.host}/api/${endpoints.apiVersion}/wallets/${walletId}/keys`;
        }
}