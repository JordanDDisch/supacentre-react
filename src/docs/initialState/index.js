import australianStates from './states';
import countries from './countries';
import customer from './customer';
import form from './form';
import itemSummary from './item-summary';
import listLoader from './listLoader';
import login from './login';
import paginationContainer from './paginationContainer';
import paymentMethods from './payment-methods';
import paymentModifiersPromo from './payment-modifiers-promo';
import paymentModifiersCards from './payment-modifiers-cards';
import prices from './prices';
import shippingMethods from './shipping-methods';
import authorityToLeave from './authorityToLeave';
import personal from './personal';
import socialNetworks from './socialNetworks';
import swatch from './swatch';
import swatchList from './swatchList';
import rating from './rating';
import accordionKey from './accordionKey';
import accordionKeyList from './accordionKeyList';

const initialState = {
    australianStates,
    countries,
    customer,
    form,
    itemSummary,
    listLoader,
    login,
    paginationContainer,
    paymentAppliedDiscountsPromo: [],
    paymentAppliedDiscountsCards: [],
    paymentMethods,
    paymentModifiersPromo,
    paymentModifiersCards,
    prices,
    shippingMethods,
    authorityToLeave,
    personal,
    stockists: [],
    socialNetworks,
    swatch,
    swatchList,
    rating,
    accordionKey,
    accordionKeyList
};

export default initialState;
