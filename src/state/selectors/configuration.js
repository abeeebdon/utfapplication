import {createSelector} from 'reselect'

export const selectCurrencySymbolWithIdEndpoint = createSelector(state => state.configuration.currencies, (currencies) => {
        return (currencyId)=>{
//        console.log(currencyId, configuration)
            for(let currency of currencies){
                if(currency.currencyId == currencyId)
                    return currency.symbol
            }
        }
})