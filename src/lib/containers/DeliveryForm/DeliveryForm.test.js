import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeliveryForm from './DeliveryForm';

Enzyme.configure({ adapter: new Adapter() });

const addressObj = {
    street: {
        value: '',
        label: '',
        errorMessage: '',
        valid: true
    },
    suburb: {
        value: '',
        label: '',
        errorMessage: '',
        valid: true
    },
    postcode: {
        value: '',
        label: '',
        errorMessage: '',
        valid: true
    },
    region: {
        value: '',
        label: '',
        errorMessage: '',
        valid: true
    },
    regions: {
        value: '',
        label: '',
        errorMessage: '',
        valid: true
    }
};

it('Renders one line address', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={true}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
        />
    ));

    expect(deliveryForm.find('input#delivery-address-test').props().name).toEqual('oneLineAddress');
});

it('Renders manual entry address form', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={false}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
        />
    ));

    expect(deliveryForm.find('input#street-address-manual-delivery-address-test').exists()).toEqual(true);
});

it('renders appropriate label/button for toggling full form', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={true}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
        />
    ));

    expect(deliveryForm.find('.delivery-form__label').props().children).toEqual('Can\'t find your address?');
    expect(deliveryForm.find('.delivery-form__button--toggle-full-address').props().children).toEqual('Try full form');

    // Toggle prop that is checked when rendering the full form toggle
    deliveryForm.setProps({
        ...deliveryForm.props(),
        displayOneLineAddress: true,
        fullFormToggleInfo: 'Want to save time?',
        fullFormToggleLabel: 'Use our address lookup for a faster checkout'
    });

    expect(deliveryForm.find('.delivery-form__label').props().children).toEqual('Want to save time?');
    expect(deliveryForm.find('.delivery-form__button--toggle-full-address').props().children).toEqual('Use our address lookup for a faster checkout');
});

it('displays select input for address book data', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={true}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
            customerAddresses={[
                {
                    id: '1',
                    street: ['14 Stamford Court'],
                    city: 'Adelaide',
                    postcode: '5000'
                }
            ]}
            defaultAddresses={{
                shipping: '1'
            }}
        />
    ));

    expect(deliveryForm.find('SelectContainer#delivery-form-address_book-test').exists()).toEqual(true);
    expect(deliveryForm.find('AutoCompleteAddressContainer#delivery-address-test').exists()).toEqual(false);
    expect(deliveryForm.find('ManualAddressContainer#delivery-address-test').exists()).toEqual(false);
});

it('handles when default_shipping isn\'t set', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={true}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
            customerAddresses={[
                {
                    id: '20',
                    street: ['14 Stamford Court'],
                    city: 'Adelaide',
                    postcode: '5000'
                },
                {
                    id: '2',
                    street: ['18 Stamford Court'],
                    city: 'Adelaide',
                    postcode: '5000'
                }
            ]}
            defaultAddresses={{}}
        />
    ));

    expect(deliveryForm.find('select.delivery-form__address-book').instance().value).toEqual('20');
});

it('displays one line address when "new" address option is selected from address book', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={true}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
            customerAddresses={[
                {
                    id: '1',
                    street: ['14 Stamford Court'],
                    city: 'Adelaide',
                    postcode: '5000'
                }
            ]}
            defaultAddresses={{
                shipping: '1'
            }}
        />
    ));

    deliveryForm.instance().handleAddressBookChange({
        target: {
            value: 'new'
        }
    });

    deliveryForm.update(); // This is required to make sure Enzyme actually updates what the code below is about to assert against

    expect(deliveryForm.find('SelectContainer#delivery-form-address_book-test').exists()).toEqual(false);
    expect(deliveryForm.find('AutoCompleteAddressContainer#delivery-address-test').exists()).toEqual(true);
    expect(deliveryForm.find('ManualAddressContainer#delivery-address-test').exists()).toEqual(false);
});

it('display full form when user triggers "try full form" toggle', () => {
    const deliveryForm = mount((
        <DeliveryForm
            id="test"
            endpoint=""
            displayOneLineAddress={true}
            onSelectAutosuggest={() => {}}
            oneLineAddress={{ value: '', placeholder: '' }}
            onManualAddressChange={() => {}}
            address={addressObj}
            regions={[]}
            onAutoCompleteChange={() => {}}
            handleSearch={() => {}}
            onSelectAddressBook={() => {}}
            handleChangeAutoCompleteInput={() => {}}
            customerAddresses={[
                {
                    id: '1',
                    street: ['14 Stamford Court'],
                    city: 'Adelaide',
                    postcode: '5000'
                }
            ]}
            defaultAddresses={{
                shipping: '1'
            }}
        />
    ));

    deliveryForm.instance().handleAddressBookChange({
        target: {
            value: 'new'
        }
    });

    deliveryForm.setProps({
        ...deliveryForm.props(),
        displayOneLineAddress: false
    });

    deliveryForm.update(); // This is required to make sure Enzyme actually updates what the code below is about to assert against

    expect(deliveryForm.find('SelectContainer#delivery-form-address_book-test').exists()).toEqual(false);
    expect(deliveryForm.find('AutoCompleteAddressContainer#delivery-address-test').exists()).toEqual(false);
    expect(deliveryForm.find('ManualAddressContainer#delivery-address-test').exists()).toEqual(true);
});
