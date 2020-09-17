import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ManualAddressContainer from './ManualAddressContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const address = {
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
        }
    };
    const element = mount((
        <ManualAddressContainer
            id="test"
            handleChange={() => {}}
            address={address}
        />
    ));

    expect(element.find('input').exists()).toEqual(true);
});

it('Renders a select when given regions', () => {
    const address = {
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
        }
    };

    const element = mount((
        <ManualAddressContainer
            id="test"
            handleChange={() => {}}
            address={address}
            regions={[
                {
                    label: 'South Australia',
                    value: 'SA'
                }
            ]}
        />
    ));

    expect(element.find('.select-container').exists()).toEqual(true);
});

it('omits region when not provided', () => {
    const address = {
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
        }
    };

    const element = mount((
        <ManualAddressContainer
            id="test"
            handleChange={() => {}}
            address={address}
        />
    ));

    expect(element.find('#region-manual-test').exists()).toEqual(false);
});

it('renders city when provided', () => {
    const address = {
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
        city: {
            value: '',
            label: '',
            errorMessage: '',
            valid: true
        }
    };

    const element = mount((
        <ManualAddressContainer
            id="test"
            handleChange={() => {}}
            address={address}
        />
    ));

    expect(element.find('#city-manual-test').exists()).toEqual(true);
});
