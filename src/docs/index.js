import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router, Route, Switch, Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../lib/reducers';
import App from './App';
import initialState from './initialState';

const store = createStore(reducer, initialState);

ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">All</Link></li>
                        <li><Link to="/passwordcontainer">Password Container</Link></li>
                        <li><Link to="/emailcontainer">Email Container</Link></li>
                        <li><Link to="/pricedisplaycontainer">Price Display Container</Link></li>
                        <li><Link to="/freeshippingindicator">Free Shipping Indicator</Link></li>
                        <li><Link to="/manualaddresscontainer">Manual Address Container</Link></li>
                        <li><Link to="/selectcontainer">Select Container</Link></li>
                        <li><Link to="/ordersummarypricecontainer">Order Summary Price Container</Link></li>
                        <li><Link to="/tabbeduicontainer">Tabbed UI Container</Link></li>
                        <li><Link to="/returningusercontainer">Returning User Container</Link></li>
                        <li><Link to="/autocompleteaddresscontainer">Autocomplete Address Container</Link></li>
                        <li><Link to="/autocompleteaddresscontainerwithdefaults">Autocomplete Address Conatiner with Defaults</Link></li>
                        <li><Link to="/signupform">Sign Up Form</Link></li>
                        <li><Link to="/paymentmodifiercontainerpromo">Payment Modifier Container - Promo</Link></li>
                        <li><Link to="/paymentmodifiercontainercards">Payment Modifier Container - Cards</Link></li>
                        <li><Link to="/textareacomponent">TextArea Container</Link></li>
                        <li><Link to="/authoritytoleave">Authority To Leave</Link></li>
                        <li><Link to="/returningusercontainer">Returning User Container</Link></li>
                        <li><Link to="/autocompleteaddresscontainer">Autocomplete Address</Link></li>
                        <li><Link to="/signupform">Sign Up Form</Link></li>
                        <li><Link to="/itemsummarycontainer">Item Summary Container</Link></li>
                        <li><Link to="/deliveryform">Delivery Form</Link></li>
                        <li><Link to="/shippingmethodscontainer">Shipping Methods Container</Link></li>
                        <li><Link to="/personaldetails">Personal Details</Link></li>
                        <li><Link to="/findinstore">Find in Store</Link></li>
                        <li><Link to="/sociallogin">SocialLogin</Link></li>
                        <li><Link to="/checkboxRadio">CheckboxRadio</Link></li>
                        <li><Link to="/fieldset">Fieldset</Link></li>
                        <li><Link to="/title">Title</Link></li>
                        <li><Link to="/rating">Rating</Link></li>
                        <li><Link to="/breadcrumb">Breadcrumb</Link></li>
                        <li><Link to="/price">Price</Link></li>
                        <li><Link to="/swatch">Swatch</Link></li>
                        <li><Link to="/swatchList">SwatchList</Link></li>
                        <li><Link to="/accordionKey">AccordionKey</Link></li>
                        <li><Link to="/accordion">Accordion</Link></li>
                        <li><Link to="/paginationControl">Pagination Control</Link></li>
                        <li><Link to="/paginationContainer">Pagination Container</Link></li>
                        <li><Link to="/product">Product</Link></li>
                        <li><Link to="/list">List</Link></li>
                        <li><Link to="/listLoader">List Loader</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/" exact component={App} key="all"/>
                        <Route path="/:component" exact component={App} key="renderinstance"/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);
