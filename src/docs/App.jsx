import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    AutoCompleteAddressContainer,
    PasswordContainer,
    InputContainer,
    EmailContainer,
    ManualAddressContainer,
    FreeShippingIndicatorContainer,
    FindInStore,
    PriceDisplayContainer,
    SelectContainer,
    TabbedUiContainer,
    OrderSummaryPriceContainer,
    PaymentModifierContainer,
    ReturningUserContainer,
    SignUpForm,
    ItemSummaryContainer,
    ShippingMethodsContainer,
    AuthorityToLeave,
    DeliveryForm,
    TextAreaContainer,
    PersonalDetails,
    SocialLogin,
    CheckboxRadioContainer,
    FieldsetContainer,
    TitleContainer,
    RatingContainer,
    BreadcrumbContainer,
    PriceContainer,
    SwatchContainer,
    SwatchListContainer,
    AccordionKeyContainer,
    AccordionContainer,
    PaginationControl,
    PaginationContainer,
    ProductContainer,
    ListContainer,
    ListLoaderContainer
} from '../lib/index';
import AJAX from '../lib/utils/AJAX';

class App extends Component {

    // START OF CHECKOUT APP.JSX
    constructor(props) {
        super(props);

        this.productListEndpoint = 'http://localhost:3000/product-list/';
        this.addressFormatEndpoint = 'http://localhost:3000/address-format/';
        this.state = props.store;
    }

    handleInputChange = ({ target }) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [target.name]: {
                    value: target.value,
                    valid: true
                }
            }
        });
    };

    handleAutocompleteClick = (newValue) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                oneLineAddress: {
                    value: newValue,
                    valid: true
                }
            }
        });
        fetch(this.addressFormatEndpoint)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    ...this.state,
                    address: {
                        street: {
                            value: data.street,
                            valid: true
                        },
                        state: {
                            value: data.state,
                            valid: true
                        },
                        postcode: {
                            value: data.postcode,
                            valid: true
                        }
                    }
                });
            });
    };

    handleAddressChange = ({ target }) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                address: {
                    ...this.state.form.address,
                    [target.name]: {
                        ...this.state.form.address[target.name],
                        value: target.value
                    }
                }
            }
        });
    };

    validate = (field, valid) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [field]: {
                    ...this.state.form[field],
                    valid
                }
            }
        });
    };

    /**
     * Function to determine if the component ID should be rendered
     *
     * @param {string} componentId ID of component being checked for render status
     *
     * @returns {boolean}
     */
    shouldRenderComponent(componentId) {
        return typeof this.props.match.params.component === 'undefined' || this.props.match.params.component === componentId;
    }

    renderPasswordContainer() {
        if (!this.shouldRenderComponent('passwordcontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Password Container</h2>
                <PasswordContainer
                    id='password'
                    name="password"
                    errorMessage='Please enter a valid password'
                    value={this.state.form.password.value}
                    onChange={this.handleInputChange}
                    isValid={this.state.form.password.valid}
                    validate={(valid) => { this.validate('password', valid); }}
                    showMessage={true}
                />
            </section>
        );
    }

    renderEmailContainer() {
        if (!this.shouldRenderComponent('emailcontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Email Container</h2>
                <EmailContainer
                    id='email'
                    name="email"
                    errorMessage='Please enter a valid email'
                    value={this.state.form.email.value}
                    onChange={this.handleInputChange}
                    isValid={this.state.form.email.valid}
                    validate={(valid) => { this.validate('email', valid); }}
                    showMessage={true}
                />
            </section>
        );
    }

    renderPriceDisplayContainer() {
        if (!this.shouldRenderComponent('pricedisplaycontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Price Display Container</h2>
                <PriceDisplayContainer
                    id={0}
                    className='subtotal'
                    label='Subtotal'
                    price='$7.77'
                    handleRemove={() => {}}
                />
            </section>
        );
    }

    renderFreeShippingIndicator() {
        if (!this.shouldRenderComponent('freeshippingindicator')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Free Shipping Indicator Container</h2>
                <FreeShippingIndicatorContainer
                    progress={100}
                    messageAvailable="You qualify for free shipping!!"
                    messageUnavailable="Spend %SPEND_REMAINING% more to qualify for free shipping!"
                    isAvailable={false}
                />
            </section>
        );
    }

    renderManualAddressContainer() {
        if (!this.shouldRenderComponent('manualaddresscontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Manual Address Container</h2>
                <ManualAddressContainer
                    id="manual-address-container"
                    regions={this.state.australianStates}
                    handleChange={this.handleAddressChange}
                    address={this.state.form.address}
                />
            </section>
        );
    }

    renderSelectContainer() {
        if (!this.shouldRenderComponent('selectcontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Select Container</h2>
                <SelectContainer
                    id='country'
                    name="country"
                    label='Country'
                    selected={this.state.countries[0].value}
                    options={this.state.countries}
                    errorMessage='Please select a country from the list'
                    handleChange={(value) => { console.log('[renderSelectContainer] handleChange called with value'); console.log(value); }}
                />
            </section>
        );
    }

    renderOrderSummaryPriceContainer() {
        if (!this.shouldRenderComponent('ordersummarypricecontainer')) {
            return null;
        }

        const handleRemove = (e) => {
            this.setState({
                ...this.state,
                prices: this.state.prices.filter((price, index) => index !== parseInt(e.target.dataset.index, 10))
            });
        };

        return (
            <section className="component-section">
                <h2>Order Summary Price Container</h2>
                <OrderSummaryPriceContainer
                    heading='Order Summary'
                    prices={this.state.prices}
                    handleRemove={handleRemove.bind(this)}
                />
            </section>
        );
    }

    renderTabbedUiContainer() {
        if (!this.shouldRenderComponent('tabbeduicontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Tabbed UI Container</h2>
                <TabbedUiContainer
                    tabs={this.state.paymentMethods}
                    visibleTab={0}
                    beforeActivate={() => {
                        console.log('[App] Before activate called');
                    }}
                    afterActivate={() => {
                        console.log('[App] After activate called');
                    }}
                    beforeActivateAsync={() => {
                        return new Promise((res) => {
                            console.log('[App] Async action completed');
                            res();
                        });
                    }}
                    afterActivateAsync={() => {
                        return new Promise((res) => {
                            console.log('[App] Async action completed');
                            res();
                        });
                    }}
                />
            </section>
        );
    }

    renderPaymentModifierContainerPromo() {
        if (!this.shouldRenderComponent('paymentmodifiercontainerpromo')) {
            return null;
        }

        const postPaymentModifierCode = ({ selection, code }) => {
            return fetch(`http://localhost:3000/payment-modifier-${selection}/${code}`)
                .then(res => res.json())
                .then((json) => {
                    if (!json.id) return false;

                    const balance = parseInt(json.balance, 10);
                    const message = `Card balance $${balance} - ${selection} has been applied`;

                    this.setState({
                        ...this.state,
                        paymentAppliedDiscountsPromo: [...this.state.paymentAppliedDiscountsPromo, message]
                    });

                    return true;
                });
        };

        return (
            <section className="component-section">
                <h2>Payment Modifier Container - Promo</h2>
                <PaymentModifierContainer
                    id='promo'
                    modifiers={this.state.paymentModifiersPromo}
                    className='promo-modifier'
                    label='Enter code'
                    buttonLabel='APPLY'
                    appliedDiscounts={this.state.paymentAppliedDiscountsPromo}
                    submit={postPaymentModifierCode.bind(this)}
                    validate={() => {}}
                />
            </section>
        );
    }

    renderPaymentModifierContainerCards() {
        if (!this.shouldRenderComponent('paymentmodifiercontainercards')) {
            return null;
        }

        const postPaymentModifierCode = ({ selection, code }) => {
            return fetch(`http://localhost:3000/payment-modifier-${selection}/${code}`)
                .then(res => res.json())
                .then((json) => {
                    if (!json.id) return false;

                    const balance = parseInt(json.balance, 10);
                    const message = `Card balance $${balance} - ${selection} has been applied`;

                    this.setState({
                        ...this.state,
                        paymentAppliedDiscountsCards: [...this.state.paymentAppliedDiscountsCards, message]
                    });

                    return true;
                });
        };

        return (
            <section className="component-section">
                <h2>Payment Modifier Container - Cards</h2>
                <PaymentModifierContainer
                    id='cards'
                    modifiers={this.state.paymentModifiersCards}
                    className='card-modifiers'
                    label='Enter code'
                    buttonLabel='APPLY'
                    appliedDiscounts={this.state.paymentAppliedDiscountsCards}
                    submit={postPaymentModifierCode.bind(this)}
                    validate={() => {}}
                />
            </section>
        );
    }

    renderReturningUserContainer() {
        if (!this.shouldRenderComponent('returningusercontainer')) {
            return null;
        }

        const handleChange = ({ target }) => {
            this.setState({
                ...this.state,
                login: {
                    ...this.state.login,
                    [target.name]: target.value
                }
            });
        };

        return (
            <section className="component-section">
                <h2>Returning Using Container</h2>
                <ReturningUserContainer
                    email={this.state.login.email}
                    password={this.state.login.password}
                    handleLogin={() => { alert('Login function called'); }}
                    handleReset={() => { alert('Reset function called'); }}
                    handleChange={handleChange}
                />
            </section>
        );
    }

    renderAutoCompleteAddressContainer() {
        if (!this.shouldRenderComponent('autocompleteaddresscontainer')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Address Autocomplete Container</h2>
                <AutoCompleteAddressContainer
                    id='oneLineAddress'
                    name="oneLineAddress"
                    onChange={this.handleInputChange}
                    handleClick={this.handleAutocompleteClick}
                    value={this.state.form.oneLineAddress.value}
                    validate={() => true}
                    isValid={this.state.form.oneLineAddress.valid}
                    minCharacters={3}
                    suggestionLimit={10}
                    endpoint="http://localhost:3000/address-complete/"
                    handleSearch={() => {}}
                />
            </section>
        );
    }

    renderAutoCompleteAddressContainerWithDefaults() {
        if (!this.shouldRenderComponent('autocompleteaddresscontainerwithdefaults')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Address Autocomplete Container with Defaults</h2>
                <AutoCompleteAddressContainer
                    id='oneLineAddress2'
                    name="oneLineAddress2"
                    onChange={this.handleInputChange}
                    handleClick={this.handleAutocompleteClick}
                    value={this.state.form.oneLineAddress.value}
                    customerAddresses={this.state.customer.addresses}
                    defaultAddresses={{
                        billing: this.state.customer.default_billing,
                        shipping: this.state.customer.default_shipping
                    }}
                    validate={() => true}
                    isValid={this.state.form.oneLineAddress.valid}
                    minCharacters={3}
                    suggestionLimit={10}
                    endpoint="http://localhost:3000/address-complete/"
                    handleSearch={() => {}}
                />
            </section>
        );
    }

    renderSignUpForm() {
        if (!this.shouldRenderComponent('signupform')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Sign Up Form</h2>
                <SignUpForm
                    handleContinue={() => { alert('Sign Up Form Submitted'); }}
                />
            </section>
        );
    }

    renderTextAreaComponent() {
        if (!this.shouldRenderComponent('textareacomponent')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Text Area Container</h2>
                <TextAreaContainer
                    id='textarea'
                    name='textarea'
                    value={this.state.form.textarea.value}
                    onChange={this.handleInputChange}
                />
            </section>
        );
    }

    renderAuthorityToLeave() {
        if (!this.shouldRenderComponent('authoritytoleave')) {
            return null;
        }

        const handleChange = (selectedOption) => {
            this.setState({
                ...this.state,
                authorityToLeave: {
                    ...this.state.authorityToLeave,
                    selectedOption
                }
            });
        };

        const handleNotesChange = ({ target }) => {
            this.setState({
                ...this.state,
                authorityToLeave: {
                    ...this.state.authorityToLeave,
                    notes: target.value
                }
            });
        };

        return (
            <section className="component-section">
                <h2>Authority To Leave</h2>
                <AuthorityToLeave
                    options={this.state.authorityToLeave.options}
                    onChange={handleChange}
                    selectedOption={this.state.authorityToLeave.selectedOption}
                    notes={this.state.authorityToLeave.notes}
                    notesLabel="Delivery Instructions"
                    disclaimer={this.state.authorityToLeave.disclaimer}
                    handleNotesChange={handleNotesChange}
                    allowOther={true}
                />
            </section>
        );
    }

    renderItemSummaryContainer() {
        if (!this.shouldRenderComponent('itemsummarycontainer')) {
            return null;
        }

        const updateConfigurable = (configurable, { target: { value } }) => {
            alert(`updateConfigurable function called. Update ${configurable} to ${value}`);// eslint-disable-line
            this.setState({
                ...this.state,
                itemSummary: {
                    ...this.state.itemSummary,
                    configurables: {
                        ...this.state.itemSummary.configurables,
                        [configurable]: {
                            ...this.state.itemSummary.configurables[configurable],
                            selection: value
                        }
                    }
                }
            });
        };

        const removeItem = () => {
            alert('removeItem function called');// eslint-disable-line
        };

        return (
            <section className="component-section">
                <h2>Item Summary Container</h2>
                <ItemSummaryContainer
                    item={this.state.itemSummary}
                    updateConfigurable={updateConfigurable.bind(this)}
                    removeItem={removeItem.bind(this)}
                />
            </section>
        );
    }

    renderDeliveryForm() {
        if (!this.shouldRenderComponent('deliveryform')) {
            return null;
        }

        const toggleFullForm = () => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    form: {
                        ...prevState.form,
                        displayOneLineAddress: !prevState.form.displayOneLineAddress,
                        fullFormToggleInfo: !prevState.form.displayOneLineAddress ? 'Can\'t find your address' : 'Want to save time?',
                        fullFormToggleLabel: !prevState.form.displayOneLineAddress ? 'Try our full form' : 'Use our address lookup for a faster checkout'
                    }
                };
            });
        };

        return (
            <section className="component-section">
                <h2>Delivery Form</h2>
                <DeliveryForm
                    id="delivery-form"
                    endpoint="http://localhost:3000/address-complete/"
                    displayOneLineAddress={this.state.form.displayOneLineAddress}
                    oneLineAddress={this.state.form.oneLineAddress}
                    address={this.state.form.address}
                    onSelectAutosuggest={this.handleAutocompleteClick}
                    onSelectAddressBook={() => { alert('Address book item selected'); }}
                    onChange={this.handleInputChange}
                    onManualAddressChange={this.handleAddressChange}
                    onAutoCompleteChange={this.handleInputChange}
                    handleToggleFullForm={toggleFullForm}
                    regions={this.state.australianStates}
                    handleSearch={() => {}}
                    handleChangeAutoCompleteInput={() => {}}
                    fullFormToggleInfo={this.state.form.fullFormToggleInfo}
                    fullFormToggleLabel={this.state.form.fullFormToggleLabel}
                />
                <h2>Delivery Form - with default address</h2>
                <DeliveryForm
                    id="delivery-form-with-default-address"
                    defaultAddresses={{
                        billing: '1',
                        shipping: '1'
                    }}
                    customerAddresses={[
                        {
                            id: '1',
                            street: [ '14 Stamford Court' ],
                            city: 'Adelaide',
                            postcode: '5000'
                        }
                    ]}
                    handleSelectNewAddress={() => { alert('handleSelectNewAddress triggered') } }
                    endpoint="http://localhost:3000/address-complete/"
                    displayOneLineAddress={this.state.form.displayOneLineAddress}
                    oneLineAddress={this.state.form.oneLineAddress}
                    address={this.state.form.address}
                    onSelectAutosuggest={this.handleAutocompleteClick}
                    onSelectAddressBook={() => { alert('Address book item selected'); }}
                    onChange={this.handleInputChange}
                    onManualAddressChange={this.handleAddressChange}
                    onAutoCompleteChange={this.handleInputChange}
                    handleToggleFullForm={toggleFullForm}
                    regions={this.state.australianStates}
                    handleSearch={() => {}}
                    handleChangeAutoCompleteInput={() => {}}
                    fullFormToggleInfo={this.state.form.fullFormToggleInfo}
                    fullFormToggleLabel={this.state.form.fullFormToggleLabel}
                />
            </section>
        );
    }

    renderShippingMethodsContainer() {
        if (!this.shouldRenderComponent('shippingmethodscontainer')) {
            return null;
        }

        const onChange = (id) => {
            const msg = (id === 'clickandcollect') ? 'Switch to Click And Collect tab.' : `Selection: ${id}`;
            alert(`onChange function called. ${msg}`); // eslint-disable-line
        };

        return (
            <section className="component-section"><h2>Shipping Methods Container</h2>
                <ShippingMethodsContainer
                    shippingMethods={this.state.shippingMethods}
                    label='Shipping Options'
                    onChange={onChange.bind(this)}
                    className='optional-class'
                    selected=''
                />
            </section>
        );
    }

    renderPersonalDetails() {
        if (!this.shouldRenderComponent('personaldetails')) {
            return null;
        }

        const handleChange = ({ target }) => {
            this.setState({
                ...this.state,
                personal: {
                    ...this.state.personal,
                    [target.name]: target.value
                }
            });
        };

        return (
            <section className="component-section">
                <h2>Personal Details Container</h2>
                <PersonalDetails
                    firstname={this.state.personal.firstname}
                    lastname={this.state.personal.lastname}
                    email={this.state.personal.email}
                    telephone={this.state.personal.telephone}
                    onChange={handleChange}
                >
                    <InputContainer
                        id="personal-details__telephone"
                        name="telephone"
                        type="tel"
                        label="Telephone"
                        placeholder="+61..."
                        validate={() => {}}
                        value={this.state.personal.telephone.value}
                        isValid={this.state.personal.telephone.valid}
                        onChange={handleChange}
                        isRequired={true}
                    />
                    <InputContainer
                        id="personal-details__company"
                        name="company"
                        label="Company"
                        placeholder="Enter company name"
                        validate={() => {}}
                        value={this.state.personal.company.value}
                        isValid={this.state.personal.company.valid}
                        onChange={handleChange}
                        isRequired={false}
                    />
                </PersonalDetails>
            </section>
        );
    }

    renderFindInStore() {
        if (!this.shouldRenderComponent('findinstore')) {
            return null;
        }

        const handleSearch = (searchObj) => {
            // This won't do anything in this format, just adding to indicate intended usage, and clear ESLint error
            const searchString = searchObj.toString();
            AJAX.get(`http://localhost:3000/stores?${searchString}`)
                .then(({ data }) => {
                    this.setState({
                        ...this.state,
                        stockists: data
                    });
                });
        };

        return (
            <section className="component-section">
                <h2>Find In Store Container</h2>
                <FindInStore
                    stockists={this.state.stockists}
                    handleSearch={handleSearch}
                    errorMessage="Can't click and collect"
                />
            </section>
        );
    }

    renderSocialLinks() {
        if (!this.shouldRenderComponent('sociallogin')) {
            return null;
        }

        return (
            <section className="component-section">
                <h2>Social Login</h2>
                <SocialLogin
                    networks={this.state.socialNetworks}
                    label="Sign in socially"
                />
            </section>
        );
    }
    // END OF CHECKOUT APP.JSX

    // START OF PRODUCT PAGES APP.JSX

    handleCheckboxRadioChange = ({ target }) => {
        this.setState({
            form: {
                ...this.state.form,
                [target.name]: {
                    ...this.state.form[target.name],
                    checked: target.checked
                }
            }
        });
    };

    handleCheckboxRadioFieldsetChange = ({ target }) => {
        const inputStates = this.state.form[target.name];

        // If radio button, uncheck others in list
        if (target.type === 'radio') {
            Object.keys(inputStates).forEach((id) => {
                inputStates[id].checked = false;
            });
        }

        this.setState({
            form: {
                ...this.state.form,
                [target.name]: {
                    ...inputStates,
                    [target.id]: {
                        ...inputStates[target.id],
                        checked: target.checked
                    }
                }
            }
        });
    };

    handleSwatchClick = ({ target }) => {
        const targetSwatch = target.classList.contains('swatch') ? target : target.closest('.swatch');

        this.setState({
            swatch: {
                ...this.state.swatch,
                [targetSwatch.name]: {
                    ...this.state.swatch[targetSwatch.name],
                    isSelected: true
                }
            }
        });
    };

    handleSwatchListClick = ({ target }) => {
        const targetSwatch = target.classList.contains('swatch') ? target : target.closest('.swatch');
        this.setState({
            swatchList: {
                ...this.state.swatchList,
                [targetSwatch.name]: {
                    ...this.state.swatchList[targetSwatch.name],
                    selectedSwatch: targetSwatch.id
                }
            }
        });
    };

    handleAccordionKeyClick = (id) => {
        this.setState({
            accordionKey: {
                ...this.state.accordionKey,
                [id]: {
                    ...this.state.accordionKey[id],
                    isOpen: !this.state.accordionKey[id].isOpen
                }
            }
        });
    };

    handleAccordionClick = (name, id, openLimit) => {
        let newState;

        if (this.state.accordionKeyList[name].openKeys.includes(id)) {
            // Key already open, remove open state
            newState = this.state.accordionKeyList[name].openKeys.filter(key => key !== id);
        } else if (openLimit) {
            // Open limit set, add single key as open state
            newState = [id];
        } else {
            // No open limit, append key to open state
            newState = [...this.state.accordionKeyList[name].openKeys, id];
        }

        this.setState({
            accordionKeyList: {
                ...this.state.accordionKeyList,
                [name]: {
                    ...this.state.accordionKeyList[name],
                    openKeys: newState
                }
            }
        });
    };

    renderCheckboxRadioComponent() {
        if (!this.shouldRenderComponent('checkboxRadio')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Checkbox/Radio Container</h2>
                <h3>Checkbox</h3>
                <CheckboxRadioContainer
                    type='checkbox'
                    id='checkbox-1'
                    value='checkbox'
                    name='checkbox-1'
                    label='Checkbox'
                    isSelected={this.state.form['checkbox-1'].checked}
                    isDisabled={this.state.form['checkbox-1'].disabled}
                    onChange={this.handleCheckboxRadioChange}
                />
                <CheckboxRadioContainer
                    type='checkbox'
                    id='checkbox-table-1'
                    value='checkbox-table'
                    name='checkbox-table-1'
                    label={(<span><span>Table Column 1</span><span>Table Column 2</span><span>Table Column 3</span></span>)}
                    isSelected={this.state.form['checkbox-table-1'].checked}
                    isDisabled={this.state.form['checkbox-1'].checked}
                    onChange={this.handleCheckboxRadioChange}
                />
                <h3>Radio</h3>
                <CheckboxRadioContainer
                    type='radio'
                    id='radio-1'
                    value='radio'
                    name='radio-1'
                    label='Radio'
                    isSelected={this.state.form['radio-1'].checked}
                    isDisabled={this.state.form['radio-1'].disabled}
                    onChange={this.handleCheckboxRadioChange}
                />
                <CheckboxRadioContainer
                    type='radio'
                    id='radio-table-1'
                    value='radio-table'
                    name='radio-table-1'
                    label={(<span><span>Table Column 1</span><span>Table Column 2</span><span>Table Column 3</span></span>)}
                    isSelected={this.state.form['radio-table-1'].checked}
                    onChange={this.handleCheckboxRadioChange}
                />
            </section>
        );
    }

    getCheckboxGroup() {
        return [
            {
                id: 'checkbox-list-item-1',
                value: 'checkbox-list-item-1',
                label: 'Checkbox item 1',
                isSelected: this.state.form['checkbox-list-1']['checkbox-list-item-1'].checked,
                isDisabled: this.state.form['checkbox-list-1']['checkbox-list-item-1'].disabled
            }, {
                id: 'checkbox-list-item-2',
                value: 'checkbox-list-item-2',
                label: 'Checkbox item 2',
                isSelected: this.state.form['checkbox-list-1']['checkbox-list-item-2'].checked,
                isDisabled: this.state.form['checkbox-list-1']['checkbox-list-item-1'].checked
            }, {
                id: 'checkbox-list-item-3',
                value: 'checkbox-list-item-3',
                label: 'Checkbox item 3',
                isSelected: this.state.form['checkbox-list-1']['checkbox-list-item-3'].checked,
                isDisabled: this.state.form['checkbox-list-1']['checkbox-list-item-3'].disabled
            }
        ].map((item, index) => {
            return (
                <CheckboxRadioContainer
                    key={index}
                    type='checkbox'
                    name='checkbox-list-1'
                    onChange={this.handleCheckboxRadioFieldsetChange}
                    {...item}
                />
            );
        });
    }

    getRadioGroup() {
        return [
            {
                id: 'radio-list-item-1',
                value: 'radio-list-item-1',
                label: 'Radio item 1',
                isSelected: this.state.form['radio-list-1']['radio-list-item-1'].checked,
                isDisabled: this.state.form['radio-list-1']['radio-list-item-1'].disabled,
                onChange: this.handleCheckboxRadioFieldsetChange
            }, {
                id: 'radio-list-item-2',
                value: 'radio-list-item-2',
                label: 'Radio item 2',
                isSelected: this.state.form['radio-list-1']['radio-list-item-2'].checked,
                isDisabled: this.state.form['radio-list-1']['radio-list-item-1'].checked,
                onChange: this.handleCheckboxRadioFieldsetChange
            }, {
                id: 'radio-list-item-3',
                value: 'radio-list-item-3',
                label: 'Radio item 3',
                isSelected: this.state.form['radio-list-1']['radio-list-item-3'].checked,
                isDisabled: this.state.form['radio-list-1']['radio-list-item-3'].disabled,
                onChange: this.handleCheckboxRadioFieldsetChange
            }
        ].map((item, index) => {
            return (
                <CheckboxRadioContainer
                    key={index}
                    type='radio'
                    name='radio-list-1'
                    onChange={this.handleCheckboxRadioFieldsetChange}
                    {...item}
                />
            );
        });
    }

    renderFieldsetComponent() {
        if (!this.shouldRenderComponent('fieldset')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Fieldset Container</h2>

                <FieldsetContainer
                    name='checkbox-list-1'
                    legend='Checkbox fieldset'
                >
                    {this.getCheckboxGroup()}
                </FieldsetContainer>

                <FieldsetContainer
                    name='radio-list-1'
                    legend='Radio fieldset'
                >
                    {this.getRadioGroup()}
                </FieldsetContainer>
            </section>
        );
    }

    renderTitleComponent() {
        if (!this.shouldRenderComponent('title')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Title Container</h2>

                <TitleContainer
                    title='Title'
                />
                <TitleContainer
                    title='Title'
                    subtitle='with subtitle'
                />
            </section>
        );
    }

    handleRatingClick = (name, rating) => {
        this.setState({
            rating: {
                ...this.state.rating,
                [name]: {
                    ...this.state.rating[name],
                    active: rating
                }
            }
        });
    };

    handleRatingMouseEnter = (name, rating) => {
        this.setState({
            rating: {
                ...this.state.rating,
                [name]: {
                    ...this.state.rating[name],
                    hover: rating
                }
            }
        });
    };

    handleRatingMouseLeave = (name) => {
        // On mouse leave, reset hover state to null
        this.setState({
            rating: {
                ...this.state.rating,
                [name]: {
                    ...this.state.rating[name],
                    hover: null
                }
            }
        });
    };

    renderRatingComponent() {
        if (!this.shouldRenderComponent('rating')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Rating Container</h2>

                <RatingContainer
                    rating={4}
                    icons={
                        {
                            type: 'text',
                            active: '🙂',
                            inactive: '😞'
                        }
                    }
                />

                <RatingContainer
                    rating={3}
                    icons={
                        {
                            type: 'text',
                            active: '🙂',
                            inactive: null
                        }
                    }
                />

                <RatingContainer
                    rating={3.5}
                    max={10}
                    icons={
                        {
                            type: 'text',
                            active: '⭐️'
                        }
                    }
                />

                <RatingContainer
                    rating={3}
                    icons={
                        {
                            type: 'image',
                            active: './img/star.svg',
                            inactive: './img/star-outline.svg'
                        }
                    }
                />

                <RatingContainer
                    rating={2.5}
                    icons={
                        {
                            type: 'image',
                            active: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhd
                            G9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiI
                            HhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJI
                            HdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIwLjlweCIgdmlld0JveD0iMCAwIDIyIDIwLjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyIDIwLjk7IiB4b
                            Ww6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZDNDJBO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iT
                            TExLDE2LjhsNi44LDQuMUwxNiwxMy4yTDIyLDhsLTcuOS0wLjdMMTEsMEw3LjksNy4zTDAsOGw2LDUuMmwtMS44LDcuN0wxMSwxNi44eiIvPgo8L3N2Zz4K`,
                            inactive: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJ
                            hdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzE
                            iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igo
                            JIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIwLjlweCIgdmlld0JveD0iMCAwIDIyIDIwLjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyIDIwLjk7IiB
                            4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZDNDJBO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0
                            iTTIyLDhsLTcuOS0wLjdMMTEsMEw3LjksNy4zTDAsOGw2LDUuMmwtMS44LDcuN2w2LjgtNC4xbDYuOCw0LjFMMTYsMTMuMkwyMiw4eiBNMTEsMTQuN2wtNC4xLDIuNUw
                            4LDEyLjUKCUw0LjMsOS40bDQuOC0wLjRMMTEsNC41TDEyLjksOWw0LjgsMC40TDE0LDEyLjVsMS4xLDQuN0wxMSwxNC43eiIvPgo8L3N2Zz4K`
                        }
                    }
                />

                <RatingContainer
                    rating={3}
                    icons={
                        {
                            type: 'text',
                            active: [
                                '😭',
                                '☹️',
                                '😕',
                                '🙂',
                                '😄'
                            ]
                        }
                    }
                />

                <RatingContainer
                    rating={this.state.rating.rating1.active}
                    ratingHover={this.state.rating.rating1.hover}
                    icons={
                        {
                            type: 'image',
                            active: './img/star.svg',
                            inactive: './img/star-outline.svg'
                        }
                    }
                    name='rating1'
                    onClick={this.handleRatingClick}
                    onMouseEnter={this.handleRatingMouseEnter}
                    onMouseLeave={() => this.handleRatingMouseLeave('rating1')}
                />

                <RatingContainer
                    rating={this.state.rating.rating2.active}
                    ratingHover={this.state.rating.rating2.hover}
                    icons={
                        {
                            type: 'text',
                            active: [
                                '😭',
                                '☹️',
                                '😕',
                                '🙂',
                                '😄'
                            ]
                        }
                    }
                    name='rating2'
                    onClick={this.handleRatingClick}
                    onMouseEnter={this.handleRatingMouseEnter}
                    onMouseLeave={() => this.handleRatingMouseLeave('rating2')}
                />
            </section>
        );
    }

    renderBreadcrumbComponent() {
        if (!this.shouldRenderComponent('breadcrumb')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Breadcrumb Container</h2>

                <BreadcrumbContainer
                    crumbs={[
                        {
                            title: 'Home',
                            link: '/'
                        }, {
                            title: 'Notable ugly humans',
                            link: '#'
                        }, {
                            title: 'Your Mum'
                        }
                    ]}
                />
            </section>
        );
    }

    renderPriceComponent() {
        if (!this.shouldRenderComponent('price')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Price Container</h2>

                <h3>Regular price</h3>
                <PriceContainer
                    prices={[
                        {
                            type: 'Regular',
                            value: '$200.00'
                        }
                    ]}
                />

                <h3>Sale price</h3>
                <PriceContainer
                    prices={[
                        {
                            type: 'Regular',
                            value: '$300.00'
                        }, {
                            type: 'Sale',
                            value: '$259.99'
                        }
                    ]}
                />
            </section>
        );
    }

    renderSwatchComponent() {
        if (!this.shouldRenderComponent('swatch')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Swatch Container</h2>
                <SwatchContainer
                    label='Donut'
                    backgroundImage='./img/texture-donut.jpg'
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch1.isSelected}
                    isDisabled={this.state.swatch.swatch1.isDisabled}
                    name='swatch1'
                />
                <SwatchContainer
                    label='Graphite'
                    backgroundImage='./img/texture-graphite.jpg'
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch2.isSelected}
                    isDisabled={this.state.swatch.swatch2.isDisabled}
                    name='swatch2'
                />
                <SwatchContainer
                    label='Dark Blue'
                    backgroundColor='rgb(65, 94, 131)'
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch3.isSelected}
                    isDisabled={this.state.swatch.swatch3.isDisabled}
                    name='swatch3'
                />
                <SwatchContainer
                    label='Blue'
                    backgroundColor='#6fa1ca'
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch4.isSelected}
                    isDisabled={this.state.swatch.swatch4.isDisabled}
                    name='swatch4'
                />
                <SwatchContainer
                    label='Black'
                    backgroundColor='#000'
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch5.isSelected}
                    isDisabled={this.state.swatch.swatch5.isDisabled}
                    name='swatch5'
                />
                <SwatchContainer
                    label='4'
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch6.isSelected}
                    isDisabled={this.state.swatch.swatch6.isDisabled}
                    name='swatch6'
                />
                <SwatchContainer
                    label={5}
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch7.isSelected}
                    isDisabled={this.state.swatch.swatch7.isDisabled}
                    name='swatch7'
                />
                <SwatchContainer
                    label={6}
                    link="http://4wdsupacentre.com.au/"
                    onClick={this.handleSwatchClick}
                    isSelected={this.state.swatch.swatch8.isSelected}
                    isDisabled={this.state.swatch.swatch8.isDisabled}
                    name='swatch8'
                />
            </section>
        );
    }

    getSwatchList1Group() {
        return [
            {
                id: 'swatch-item-1',
                label: 'Donut',
                backgroundImage: './img/texture-donut.jpg'
            }, {
                id: 'swatch-item-2',
                label: 'Graphite',
                backgroundImage: './img/texture-graphite.jpg'
            }, {
                id: 'swatch-item-3',
                label: 'Brown Leather',
                backgroundImage: './img/texture-leather-brown.jpg'
            }, {
                id: 'swatch-item-4',
                label: 'Torqouise Suede',
                backgroundImage: './img/texture-suede-torqouise.jpg'
            }
        ];
    }

    getSwatchList2Group() {
        return [
            {
                id: 'swatch-item-5',
                label: 'Yellow',
                backgroundColor: '#fdff75'
            }, {
                id: 'swatch-item-6',
                label: 'Aqua',
                backgroundColor: 'aqua'
            }, {
                id: 'swatch-item-7',
                label: 'Green',
                backgroundColor: '#75ffaf'
            }, {
                id: 'swatch-item-8',
                label: 'Red',
                backgroundColor: '#ff8f75'
            }
        ];
    }

    getSwatchList3Group() {
        return [
            {
                id: 'swatch-item-9',
                label: 5
            }, {
                id: 'swatch-item-10',
                label: 6
            }, {
                id: 'swatch-item-11',
                label: 7
            }, {
                id: 'swatch-item-12',
                label: 8
            }
        ];
    }

    getSwatchList4Group() {
        return [
            {
                id: 'swatch-item-13',
                label: 'Red',
                backgroundColor: 'salmon'
            }, {
                id: 'swatch-item-14',
                label: 'Graphite',
                backgroundImage: './img/texture-graphite.jpg'
            }, {
                id: 'swatch-item-15',
                label: 4
            }, {
                id: 'swatch-item-16',
                label: 'Text'
            }, {
                id: 'swatch-item-17',
                label: 'Link',
                link: 'http://4wdsupacentre.com.au/'
            }
        ];
    }

    getSwatchList5Group() {
        return [
            {
                id: 'swatch-item-18',
                label: 'Black',
                backgroundColor: '#19191b'
            }, {
                id: 'swatch-item-19',
                label: 'Grey',
                backgroundColor: '#BBB'
            }, {
                id: 'swatch-item-20',
                label: 'Antique White',
                backgroundColor: '#f8f1dd'
            }
        ];
    }

    renderSwatchListComponent() {
        if (!this.shouldRenderComponent('swatchList')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Swatch List Container</h2>
                <SwatchListContainer
                    swatches={this.getSwatchList1Group()}
                    name='swatchList1'
                    title={<h3>Texture</h3>}
                    noSelectionLabel='Select a texture'
                    selectedSwatch={this.state.swatchList.swatchList1.selectedSwatch}
                    disabledSwatches={this.state.swatchList.swatchList1.disabledSwatches}
                    onClick={this.handleSwatchListClick}
                />
                <SwatchListContainer
                    swatches={this.getSwatchList2Group()}
                    name='swatchList2'
                    title={<h3>Color</h3>}
                    selectedSwatch={this.state.swatchList.swatchList2.selectedSwatch}
                    disabledSwatches={this.state.swatchList.swatchList2.disabledSwatches}
                    onClick={this.handleSwatchListClick}
                />
                <SwatchListContainer
                    swatches={this.getSwatchList3Group()}
                    name='swatchList3'
                    title={<h3>Size</h3>}
                    noSelectionLabel='Select a size'
                    selectedSwatch={this.state.swatchList.swatchList3.selectedSwatch}
                    disabledSwatches={this.state.swatchList.swatchList3.disabledSwatches}
                    onClick={this.handleSwatchListClick}
                />
                <SwatchListContainer
                    swatches={this.getSwatchList4Group()}
                    name='swatchList4'
                    title={<h3>Mixed swatch types</h3>}
                    noSelectionLabel='Select something'
                    selectedSwatch={this.state.swatchList.swatchList4.selectedSwatch}
                    disabledSwatches={this.state.swatchList.swatchList4.disabledSwatches}
                    onClick={this.handleSwatchListClick}
                />
            </section>
        );
    }

    getAccordionKeyList1() {
        return [
            {
                id: 'accordion-key-1',
                label: 'Textures',
                children: (
                    <SwatchListContainer
                        swatches={this.getSwatchList1Group()}
                        name='swatchList1'
                        noSelectionLabel='Select a texture'
                        selectedSwatch={this.state.swatchList.swatchList1.selectedSwatch}
                        disabledSwatches={this.state.swatchList.swatchList1.disabledSwatches}
                        onClick={this.handleSwatchListClick}
                    />
                )
            }, {
                id: 'accordion-key-2',
                label: 'Colors',
                children: (
                    <SwatchListContainer
                        swatches={this.getSwatchList2Group()}
                        name='swatchList2'
                        selectedSwatch={this.state.swatchList.swatchList2.selectedSwatch}
                        disabledSwatches={this.state.swatchList.swatchList2.disabledSwatches}
                        onClick={this.handleSwatchListClick}
                    />
                )
            }, {
                id: 'accordion-key-3',
                label: 'Sizes',
                children: (
                    <SwatchListContainer
                        swatches={this.getSwatchList3Group()}
                        name='swatchList3'
                        noSelectionLabel='Select a size'
                        selectedSwatch={this.state.swatchList.swatchList3.selectedSwatch}
                        disabledSwatches={this.state.swatchList.swatchList3.disabledSwatches}
                        onClick={this.handleSwatchListClick}
                    />
                )
            }
        ];
    }

    getAccordionKeyList2() {
        return [
            {
                id: 'accordion-key-4',
                label: 'Textures',
                children: (
                    <SwatchListContainer
                        swatches={this.getSwatchList1Group()}
                        name='swatchList1'
                        noSelectionLabel='Select a texture'
                        selectedSwatch={this.state.swatchList.swatchList1.selectedSwatch}
                        disabledSwatches={this.state.swatchList.swatchList1.disabledSwatches}
                        onClick={this.handleSwatchListClick}
                    />
                )
            }, {
                id: 'accordion-key-5',
                label: 'Colors',
                children: (
                    <SwatchListContainer
                        swatches={this.getSwatchList2Group()}
                        name='swatchList2'
                        selectedSwatch={this.state.swatchList.swatchList2.selectedSwatch}
                        disabledSwatches={this.state.swatchList.swatchList2.disabledSwatches}
                        onClick={this.handleSwatchListClick}
                    />
                )
            }, {
                id: 'accordion-key-6',
                label: 'Sizes',
                children: (
                    <SwatchListContainer
                        swatches={this.getSwatchList3Group()}
                        name='swatchList3'
                        noSelectionLabel='Select a size'
                        selectedSwatch={this.state.swatchList.swatchList3.selectedSwatch}
                        disabledSwatches={this.state.swatchList.swatchList3.disabledSwatches}
                        onClick={this.handleSwatchListClick}
                    />
                )
            }, {
                id: 'accordion-key-7',
                label: 'Checkboxes',
                children: (
                    <FieldsetContainer
                        name='checkbox-list-1'
                        legend='Checkbox fieldset'
                    >
                        {this.getCheckboxGroup()}
                    </FieldsetContainer>
                )
            }
        ];
    }

    renderAccordionKeyComponent() {
        if (!this.shouldRenderComponent('accordionKey')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>AccordionKey Container</h2>
                <AccordionKeyContainer
                    label='I am open'
                    name='accordionKey1'
                    isOpen={this.state.accordionKey.accordionKey1.isOpen}
                    isDisabled={this.state.accordionKey.accordionKey1.isDisabled}
                    onClick={this.handleAccordionKeyClick}
                >
                    <p>Small kitty warm kitty little balls of fur sleep on my human&apos;s head and attack the dog then
                        pretend like nothing happened kitty poochy sniff other cat&apos;s butt and hang jaw half open
                        thereafter for push your water glass on the floor.</p>
                </AccordionKeyContainer>
                <AccordionKeyContainer
                    label='I am closed'
                    name='accordionKey2'
                    isOpen={this.state.accordionKey.accordionKey2.isOpen}
                    isDisabled={this.state.accordionKey.accordionKey2.isDisabled}
                    onClick={this.handleAccordionKeyClick}
                >
                    <p>Demand to have some of whatever the human is cooking, then sniff the offering and walk away cereal
                        boxes make for five star accommodation so instead of drinking water from the cat bowl, make sure to
                        steal water from the toilet pee in the shoe for eat prawns daintily with a claw then lick paws clean
                        wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at
                        the fabric before taking a catnap.</p>
                </AccordionKeyContainer>
                <AccordionKeyContainer
                    label='I am disabled'
                    name='accordionKey3'
                    isOpen={this.state.accordionKey.accordionKey3.isOpen}
                    isDisabled={this.state.accordionKey.accordionKey1.isOpen}
                    onClick={this.handleAccordionKeyClick}
                >
                    <p>Crash against wall but walk away like nothing happened claw your carpet in places everyone can see
                        - why hide my amazing artistic clawing skills?, or shake treat bag give me attention or face the wrath
                        of my claws or always ensure to lay down in such a manner that tail can lightly brush human&apos;s nose,
                        cough furball into food bowl then scratch owner for a new one. Destroy house in 5 seconds roll over
                        and sun my belly sit by the fire kitty kitty bleghbleghvomit my furball really tie the room together
                        ask to go outside and ask to come inside and ask to go outside and ask to come inside.</p>
                </AccordionKeyContainer>
            </section>
        );
    }

    renderAccordionComponent() {
        if (!this.shouldRenderComponent('accordion')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Accordion Container</h2>
                <AccordionContainer
                    keys={this.getAccordionKeyList1()}
                    name='accordionKeyList1'
                    openKeys={this.state.accordionKeyList.accordionKeyList1.openKeys}
                    disabledKeys={this.state.accordionKeyList.accordionKeyList1.disabledKeys}
                    onClick={this.handleAccordionClick}
                />

                <h3>Open limit</h3>
                <AccordionContainer
                    keys={this.getAccordionKeyList2()}
                    name='accordionKeyList2'
                    openKeys={this.state.accordionKeyList.accordionKeyList2.openKeys}
                    disabledKeys={this.state.accordionKeyList.accordionKeyList2.disabledKeys}
                    onClick={this.handleAccordionClick}
                    openLimit={true}
                />
            </section>
        );
    }


    paginationStartControl() {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xlinkHref='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                width='14.9px'
                height='16px'
                viewBox='0 0 14.9 16'
                enableBackground='new 0 0 14.9 16'
                xmlSpace='preserve'
            >
                <path d='M14.9,14.1L8.8,8l6.1-6.1L13,0L5,8l8,8L14.9,14.1z'/>
                <rect
                    width='2.9'
                    height='16'
                />
            </svg>
        );
    }

    paginationEndControl() {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xlinkHref='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                width='14.9px'
                height='16px'
                viewBox='0 0 14.9 16'
                enableBackground='new 0 0 14.9 16'
                xmlSpace='preserve'
            >
                <path d='M0,1.9L6.1,8L0,14.1L1.9,16l8-8l-8-8L0,1.9z'/>
                <rect
                    x='12'
                    y='0'
                    transform='matrix(-1 -9.011782e-11 9.011782e-11 -1 26.9136 16)'
                    width='2.9'
                    height='16'
                />
            </svg>
        );
    }

    paginationPrevControl() {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xlinkHref='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                width='9.9px'
                height='16px'
                viewBox='0 0 9.9 16'
                enableBackground='new 0 0 9.9 16'
                xmlSpace='preserve'
            >
                <path d="M9.9,14.1L3.8,8l6.1-6.1L8,0L0,8l8,8L9.9,14.1z"/>
            </svg>
        );
    }

    paginationNextControl() {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xlinkHref='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                width='9.9px'
                height='16px'
                viewBox='0 0 9.9 16'
                enableBackground='new 0 0 9.9 16'
                xmlSpace='preserve'
            >
                <path d="M0,1.9L6.1,8L0,14.1L1.9,16l8-8l-8-8L0,1.9z"/>
            </svg>
        );
    }

    renderPaginationControlComponent() {
        if (!this.shouldRenderComponent('paginationControl')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Pagination Control</h2>
                <PaginationControl
                    isSelected={false}
                    isDisabled={true}
                    onClick={() => {}}
                    className={
                        [
                            'arrow',
                            'arrow--left'
                        ]
                    }
                    title='Previous page'
                >
                    { this.paginationPrevControl() }
                </PaginationControl>

                <PaginationControl
                    isSelected={false}
                    onClick={() => {}}
                >
                    1
                </PaginationControl>

                <PaginationControl
                    isSelected={true}
                    onClick={() => {}}
                >
                    2
                </PaginationControl>

                <PaginationControl
                    isSelected={false}
                    onClick={() => {}}
                >
                    3
                </PaginationControl>

                <PaginationControl
                    isSelected={false}
                    onClick={() => {}}
                    className={
                        [
                            'arrow',
                            'arrow--right'
                        ]
                    }
                >
                    { this.paginationNextControl() }
                </PaginationControl>
            </section>
        );
    }

    handlePaginationClick = (stateName, page) => {
        this.setState({
            paginationContainer: {
                ...this.state.paginationContainer,
                [stateName]: {
                    ...this.state.paginationContainer[stateName],
                    page
                }
            }
        });
    };

    renderPaginationContainer() {
        if (!this.shouldRenderComponent('paginationContainer')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Pagination Container</h2>

                <h3>Default</h3>
                <PaginationContainer
                    page={this.state.paginationContainer.paginationContainer1.page}
                    name='paginationContainer1'
                    onClick={this.handlePaginationClick}
                    numberOfItems={100}
                />

                <h3>Start/end controls</h3>
                <PaginationContainer
                    page={this.state.paginationContainer.paginationContainer2.page}
                    name='paginationContainer2'
                    onClick={this.handlePaginationClick}
                    numberOfItems={100}
                    startEndControls={true}
                />

                <h3>Custom controls</h3>
                <PaginationContainer
                    page={this.state.paginationContainer.paginationContainer3.page}
                    name='paginationContainer3'
                    onClick={this.handlePaginationClick}
                    numberOfItems={150}
                    startEndControls={true}
                    startControl={this.paginationStartControl()}
                    endControl={this.paginationEndControl()}
                    prevControl={this.paginationPrevControl()}
                    nextControl={this.paginationNextControl()}
                />

                <h3>Animated, custom controls</h3>
                <PaginationContainer
                    page={this.state.paginationContainer.paginationContainer4.page}
                    name='paginationContainer4'
                    onClick={this.handlePaginationClick}
                    numberOfItems={150}
                    isAnimated={true}
                    startEndControls={true}
                    startControl={this.paginationStartControl()}
                    endControl={this.paginationEndControl()}
                    prevControl={this.paginationPrevControl()}
                    nextControl={this.paginationNextControl()}
                />

                <h3>Animated, custom controls, custom control limit, page count</h3>
                <PaginationContainer
                    page={this.state.paginationContainer.paginationContainer5.page}
                    name='paginationContainer5'
                    onClick={this.handlePaginationClick}
                    numberOfItems={250}
                    isAnimated={true}
                    startEndControls={true}
                    controlLimit={7}
                    startControl={this.paginationStartControl()}
                    endControl={this.paginationEndControl()}
                    prevControl={this.paginationPrevControl()}
                    nextControl={this.paginationNextControl()}
                    showPageCount={true}
                />
            </section>
        );
    }

    renderProductComponent() {
        if (!this.shouldRenderComponent('product')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>Product Container</h2>

                <ProductContainer
                    title={
                        {
                            title: 'Hi-Lo Dress',
                            subtitle: 'Danielle'
                        }
                    }
                    link='http://4wdsupacentre.com.au'
                    prices={[
                        {
                            type: 'Regular',
                            value: '$139.99'
                        }
                    ]}
                    slotImage={(
                        <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--sale'>
                            <p>Sale</p>
                        </div>
                    )}
                    slotDescription={(
                        <Fragment>
                            <div className='product-slot product-slot--description'>
                                <p>Black</p>
                            </div>
                            <div className='product-slot product-slot--link'>
                                <p>
                                    <a
                                        href='http://4wdsupacentre.com.au'
                                    >
                                        <span>View product</span>
                                    </a>
                                </p>
                            </div>
                        </Fragment>
                    )}
                />
                <ProductContainer
                    images={[
                        './img/product-louise-1.jpg'
                    ]}
                    title={
                        {
                            title: 'Embroidered Jacquard Dress',
                            subtitle: 'Louise'
                        }
                    }
                    link='http://4wdsupacentre.com.au'
                    prices={[
                        {
                            type: 'Was',
                            value: '$139.99'
                        }, {
                            type: 'Sale',
                            value: '$119.99'
                        }
                    ]}
                    slotImage={(
                        <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--50-percent'>
                            <p><span>50%</span> off</p>
                        </div>
                    )}
                    slotDescription={(
                        <Fragment>
                            <div className="product-slot product-slot--swatches">
                                <SwatchListContainer
                                    swatches={this.getSwatchList5Group()}
                                    name='swatchList2'
                                    title={<h3>Color</h3>}
                                    noSelectionLabel='Select a color'
                                    selectedSwatch={this.state.swatchList.swatchList2.selectedSwatch}
                                    disabledSwatches={this.state.swatchList.swatchList2.disabledSwatches}
                                    onClick={this.handleSwatchListClick}
                                />
                            </div>
                            <div className='product-slot product-slot--add-to-cart'>
                                <p>
                                    <button
                                        type='button'
                                        onClick={() => {}}
                                    >
                                        <span>Add to cart</span>
                                    </button>
                                </p>
                            </div>
                        </Fragment>
                    )}
                />
                <ProductContainer
                    images={[
                        './img/product-fit-flare-1.jpg',
                        './img/product-fit-flare-2.jpg',
                        './img/product-fit-flare-3.jpg'
                    ]}
                    title={
                        {
                            title: 'Fit and Flare Dress',
                            subtitle: 'Robyn Boucle'
                        }
                    }
                    link='http://4wdsupacentre.com.au'
                    linkTarget='_blank'
                    prices={[
                        {
                            type: 'Was',
                            value: '$139.99'
                        }, {
                            type: 'Sale',
                            value: '$119.99'
                        }
                    ]}
                    slotImage={(
                        <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--sale'>
                            <p>Sale</p>
                        </div>
                    )}
                    slotDescription={(
                        <Fragment>
                            <div className='product-slot product-slot--description'>
                                <p>Description goes here</p>
                            </div>
                            <div className="product-slot product-slot--swatches">
                                <SwatchListContainer
                                    swatches={this.getSwatchList5Group()}
                                    name='swatchList2'
                                    title={<h3>Color</h3>}
                                    noSelectionLabel='Select a color'
                                    selectedSwatch={this.state.swatchList.swatchList2.selectedSwatch}
                                    disabledSwatches={this.state.swatchList.swatchList2.disabledSwatches}
                                    onClick={this.handleSwatchListClick}
                                />
                                <SwatchListContainer
                                    swatches={this.getSwatchList3Group()}
                                    name='swatchList3'
                                    title={<h3>Size</h3>}
                                    noSelectionLabel='Select a size'
                                    selectedSwatch={this.state.swatchList.swatchList3.selectedSwatch}
                                    disabledSwatches={this.state.swatchList.swatchList3.disabledSwatches}
                                    onClick={this.handleSwatchListClick}
                                />
                            </div>
                            <div className='product-slot product-slot--wishlist'>
                                <p>
                                    <button
                                        type='button'
                                        onClick={() => {}}
                                    >
                                        <span>Add to wishlist</span>
                                    </button>
                                </p>
                            </div>
                            <div className='product-slot product-slot--quickview'>
                                <p>
                                    <button
                                        type='button'
                                        onClick={() => {}}
                                    >
                                        <span>Quickview</span>
                                    </button>
                                </p>
                            </div>
                            <div className='product-slot product-slot--compare'>
                                <p>
                                    <button
                                        type='button'
                                        onClick={() => {}}
                                    >
                                        <span>Add to compare</span>
                                    </button>
                                </p>
                            </div>
                            <div className='product-slot product-slot--add-to-cart'>
                                <p>
                                    <button
                                        type='button'
                                        onClick={() => {}}
                                    >
                                        <span>Add to cart</span>
                                    </button>
                                </p>
                            </div>
                            <div className='product-slot product-slot--link'>
                                <p>
                                    <a
                                        href='http://4wdsupacentre.com.au'
                                    >
                                        <span>View product</span>
                                    </a>
                                </p>
                            </div>
                        </Fragment>
                    )}
                />
            </section>
        );
    }

    getProductList1() {
        return [
            <ProductContainer
                key={1}
                images={[
                    './img/product-fit-flare-1.jpg'
                ]}
                title={
                    {
                        title: 'Fit and Flare Dress',
                        subtitle: 'Robyn Boucle'
                    }
                }
                link='http://4wdsupacentre.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$139.99'
                    }
                ]}
                slotDescription={(
                    <div className='product-slot product-slot--link'>
                        <p>
                            <a
                                href='http://4wdsupacentre.com.au'
                            >
                                <span>View product</span>
                            </a>
                        </p>
                    </div>
                )}
            />,
            <ProductContainer
                key={2}
                images={[
                    './img/product-holland-1.jpg'
                ]}
                title={
                    {
                        title: 'Embroidered Dress',
                        subtitle: 'Holland'
                    }
                }
                link='http://4wdsupacentre.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$169.99'
                    }
                ]}
                slotDescription={(
                    <div className='product-slot product-slot--link'>
                        <p>
                            <a
                                href='http://4wdsupacentre.com.au'
                            >
                                <span>View product</span>
                            </a>
                        </p>
                    </div>
                )}
            />,
            <ProductContainer
                key={3}
                images={[
                    './img/product-louise-1.jpg'
                ]}
                title={
                    {
                        title: 'Embroidered Jacquard Dress',
                        subtitle: 'Louise'
                    }
                }
                link='http://4wdsupacentre.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$159.99'
                    }, {
                        type: 'Sale',
                        value: '$79.99'
                    }
                ]}
                slotImage={(
                    <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--50-percent'>
                        <p><span>50%</span> off</p>
                    </div>
                )}
                slotDescription={(
                    <div className='product-slot product-slot--link'>
                        <p>
                            <a
                                href='http://4wdsupacentre.com.au'
                            >
                                <span>View product</span>
                            </a>
                        </p>
                    </div>
                )}
            />,
            <ProductContainer
                key={4}
                images={[
                    './img/product-stassi-1.jpg'
                ]}
                title={
                    {
                        title: 'Pointelle Flare Sleeve Dress',
                        subtitle: 'Stassi'
                    }
                }
                link='http://4wdsupacentre.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$139.99'
                    }, {
                        type: 'Sale',
                        value: '$119.99'
                    }
                ]}
                slotImage={(
                    <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--sale'>
                        <p>Sale</p>
                    </div>
                )}
                slotDescription={(
                    <div className='product-slot product-slot--link'>
                        <p>
                            <a
                                href='http://4wdsupacentre.com.au'
                            >
                                <span>View product</span>
                            </a>
                        </p>
                    </div>
                )}
            />,
            <ProductContainer
                key={5}
                images={[
                    './img/product-cara-1.jpg'
                ]}
                title={
                    {
                        title: 'Wide Leg Jumpsuit',
                        subtitle: 'Cara'
                    }
                }
                link='http://4wdsupacentre.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$139.99'
                    }
                ]}
                slotDescription={(
                    <div className='product-slot product-slot--link'>
                        <p>
                            <a
                                href='http://4wdsupacentre.com.au'
                            >
                                <span>View product</span>
                            </a>
                        </p>
                    </div>
                )}
            />,
            <ProductContainer
                key={6}
                images={[
                    './img/product-danielle-1.jpg'
                ]}
                title={
                    {
                        title: 'Hi-Lo Dress',
                        subtitle: 'Danielle'
                    }
                }
                link='http://4wdsupacentre.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$129.99'
                    }, {
                        type: 'Sale',
                        value: '$99.99'
                    }
                ]}
                slotImage={(
                    <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--sale'>
                        <p>Sale</p>
                    </div>
                )}
                slotDescription={(
                    <div className='product-slot product-slot--link'>
                        <p>
                            <a
                                href='http://4wdsupacentre.com.au'
                            >
                                <span>View product</span>
                            </a>
                        </p>
                    </div>
                )}
            />
        ];
    }

    fetchProductList = (stateName, page, mode = 'pagination') => {
        const state = this.state.listLoader[stateName];

        // If no more pages to load, return
        if (mode !== 'pagination' && state.hasMorePages === false) return;

        // Set loading and page state before fetch, async workaround
        this.setState((previousState) => {
            return {
                ...previousState,
                listLoader: {
                    ...previousState.listLoader,
                    [stateName]: {
                        ...previousState.listLoader[stateName],
                        isLoading: true,
                        page
                    }
                }
            };
        });

        // Dummy timeout to simulate load time
        setTimeout(() => {
            fetch(this.productListEndpoint)
                .then(response => response.json())
                .then((data) => {
                    const toIndex = page * state.itemsPerPage;
                    const fromIndex = mode === 'pagination' && state.items.length
                        ? (toIndex - state.itemsPerPage) : 0;
                    const newPage = data.slice(fromIndex, toIndex);
                    const hasMorePages = data[toIndex + 1] !== undefined;

                    const items = newPage.map((item, index) => {
                        return (
                            <ProductContainer
                                key={index}
                                title={item.title}
                                images={item.images}
                                link={item.link}
                                prices={item.prices}
                            />
                        );
                    });

                    this.setState({
                        listLoader: {
                            ...this.state.listLoader,
                            [stateName]: {
                                ...this.state.listLoader[stateName],
                                items,
                                hasMorePages,
                                isLoading: false,
                                numberOfItems: data.length
                            }
                        }
                    });
                });
        }, 1000);
    }

    renderListComponent() {
        if (!this.shouldRenderComponent('list')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>List Container</h2>
                <ListContainer
                    items={this.getProductList1()}
                    className='product'
                />
            </section>
        );
    }

    getLoadingSpinner() {
        return (
            (
                <svg
                    version='1.1'
                    id='loader-1'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    x='0px'
                    y='0px'
                    width='40px'
                    height='40px'
                    viewBox='0 0 40 40'
                    enableBackground='new 0 0 40 40'
                    xmlSpace='preserve'
                >
                    <path
                        opacity='0.3'
                        fill='#6fa1ca' d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'
                    />
                    <path
                        fill='#6fa1ca'
                        d='M20.2,8.5C20.2,8.5,20.2,8.5,20.2,8.5c4.5,0,8.4,2.6,10.3,6.3l2.9-1.5C31,8.5,26,5.2,20.2,5.2c0,0,0,0,0,0V8.5z'
                    >
                        <animateTransform
                            attributeType='xml'
                            attributeName='transform'
                            type='rotate'
                            from='0 20 20'
                            to='360 20 20'
                            dur='0.5s'
                            repeatCount='indefinite'
                        />
                    </path>
                </svg>
            )
        );
    }

    renderListLoaderComponent() {
        if (!this.shouldRenderComponent('listLoader')) {
            return null;
        }

        return (
            <section className='component-section'>
                <h2>List Loader Container</h2>

                <h3>Custom control mode</h3>
                <p>Using pagination component</p>
                <ListLoaderContainer
                    list={
                        {
                            items: this.state.listLoader.listLoader1.items,
                            className: ['product', 'product-loader']
                        }
                    }
                    className='pagination'
                    fetchItems={this.fetchProductList}
                    name='listLoader1'
                    page={this.state.listLoader.listLoader1.page}
                    itemsPerPage={this.state.listLoader.listLoader1.itemsPerPage}
                    isLoading={this.state.listLoader.listLoader1.isLoading}
                    mode='custom'
                    loadingIndicator={this.getLoadingSpinner()}
                    numberOfItems={this.state.listLoader.listLoader1.numberOfItems}
                    customControls={
                        (
                            <PaginationContainer
                                page={this.state.listLoader.listLoader1.page}
                                name='listLoader1'
                                onClick={this.fetchProductList}
                                numberOfItems={this.state.listLoader.listLoader1.numberOfItems}
                                isDisabled={this.state.listLoader.listLoader1.isLoading}
                                itemsPerPage={this.state.listLoader.listLoader1.itemsPerPage}
                                isAnimated={true}
                                startEndControls={true}
                                showPageCount={true}
                                controlLimit={7}
                                startControl={this.paginationStartControl()}
                                endControl={this.paginationEndControl()}
                                prevControl={this.paginationPrevControl()}
                                nextControl={this.paginationNextControl()}
                            />
                        )
                    }
                />

                <h3>Step mode</h3>
                <ListLoaderContainer
                    list={
                        {
                            items: this.state.listLoader.listLoader2.items,
                            className: ['product', 'product-loader']
                        }
                    }
                    fetchItems={this.fetchProductList}
                    name='listLoader2'
                    page={this.state.listLoader.listLoader2.page}
                    itemsPerPage={this.state.listLoader.listLoader2.itemsPerPage}
                    hasMorePages={this.state.listLoader.listLoader2.hasMorePages}
                    isLoading={this.state.listLoader.listLoader2.isLoading}
                    mode='step'
                    loadingIndicator={this.getLoadingSpinner()}
                    loadMore='Load more of the things'
                    numberOfItems={this.state.listLoader.listLoader2.numberOfItems}
                />

                <h3>Infinite scroll mode, with limit</h3>
                <ListLoaderContainer
                    list={
                        {
                            items: this.state.listLoader.listLoader3.items,
                            className: ['product', 'product-loader']
                        }
                    }
                    fetchItems={this.fetchProductList}
                    name='listLoader3'
                    page={this.state.listLoader.listLoader3.page}
                    itemsPerPage={this.state.listLoader.listLoader3.itemsPerPage}
                    hasMorePages={this.state.listLoader.listLoader3.hasMorePages}
                    isLoading={this.state.listLoader.listLoader3.isLoading}
                    mode='infinite'
                    infiniteScrollPageLimit={4}
                    endMessage={(
                        <p>All out of products to show you</p>
                    )}
                    loadingIndicator={this.getLoadingSpinner()}
                    numberOfItems={this.state.listLoader.listLoader3.numberOfItems}
                />

                <h3>Infinite scroll mode</h3>
                <ListLoaderContainer
                    list={
                        {
                            items: this.state.listLoader.listLoader4.items,
                            className: ['product', 'product-loader']
                        }
                    }
                    fetchItems={this.fetchProductList}
                    name='listLoader4'
                    page={this.state.listLoader.listLoader4.page}
                    itemsPerPage={this.state.listLoader.listLoader4.itemsPerPage}
                    hasMorePages={this.state.listLoader.listLoader4.hasMorePages}
                    isLoading={this.state.listLoader.listLoader4.isLoading}
                    mode='infinite'
                    endMessage={(
                        <p>No more results to display</p>
                    )}
                    loadingIndicator={this.getLoadingSpinner()}
                    numberOfItems={this.state.listLoader.listLoader4.numberOfItems}
                />
            </section>
        );
    }


    render() {
        return (
            <Fragment>
                {this.renderPasswordContainer()}
                {this.renderEmailContainer()}
                {this.renderPriceDisplayContainer()}
                {this.renderFreeShippingIndicator()}
                {this.renderManualAddressContainer()}
                {this.renderSelectContainer()}
                {this.renderOrderSummaryPriceContainer()}
                {this.renderTabbedUiContainer()}
                {this.renderPaymentModifierContainerPromo()}
                {this.renderPaymentModifierContainerCards()}
                {this.renderReturningUserContainer()}
                {this.renderAutoCompleteAddressContainer()}
                {this.renderAutoCompleteAddressContainerWithDefaults()}
                {this.renderSignUpForm()}
                {this.renderTextAreaComponent()}
                {this.renderAuthorityToLeave()}
                {this.renderItemSummaryContainer()}
                {this.renderDeliveryForm()}
                {this.renderShippingMethodsContainer()}
                {this.renderPersonalDetails()}
                {this.renderFindInStore()}
                {this.renderSocialLinks()}
                {this.renderCheckboxRadioComponent()}
                {this.renderFieldsetComponent()}
                {this.renderTitleComponent()}
                {this.renderRatingComponent()}
                {this.renderBreadcrumbComponent()}
                {this.renderPriceComponent()}
                {this.renderSwatchComponent()}
                {this.renderSwatchListComponent()}
                {this.renderAccordionKeyComponent()}
                {this.renderAccordionComponent()}
                {this.renderPaginationControlComponent()}
                {this.renderPaginationContainer()}
                {this.renderProductComponent()}
                {this.renderListComponent()}
                {this.renderListLoaderComponent()}
            </Fragment>
        );
    }
    // END OF PRODUCT PAGES APP.JSX

}

App.propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            component: PropTypes.string
        })
    })
};

const mapStateToProps = (store) => {
    return {
        store
    };
};

export default connect(mapStateToProps)(App);
