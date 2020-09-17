import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShippingMethodsContainer from './ShippingMethodsContainer';

Enzyme.configure({ adapter: new Adapter() });

const methods = [
    {
        id: 'standard',
        label: 'Standard Shipping',
        description: '2-7 working days',
        price: 1
    },
    {
        id: 'express',
        label: 'Express Shipping',
        description: '1-3 working days',
        price: 2
    },
    {
        id: 'clickandcollect',
        label: 'Click and Collect',
        description: 'Select a store',
        price: 0
    }
];

describe('ShippingMethodsContainer', () => {
    it('Renders without error', () => {
        const element = mount((
            <ShippingMethodsContainer
                shippingMethods={methods}
                selected=''
                onChange={() => {}}
            />
        ));

        expect(element.find('.shipping-methods__title').exists()).toEqual(false);
        expect(element.find('.shipping-methods').exists()).toEqual(true);
        expect(element.find('.shipping-method--standard .shipping-description').text()).toEqual('2-7 working days');
    });

    it('handles a change event', () => {
        let state = {
            selected: ''
        };

        const handleChange = (selection) => {
            // Using mutation so as to not have to worry about creating a new
            state = {
                ...state,
                selected: selection
            };
        };

        const element = mount((
            <ShippingMethodsContainer
                shippingMethods={methods}
                selected=''
                label='Shipping Options'
                onChange={handleChange}
            />
        ));

        element.find('input#shipping-method--express').simulate('change', {
            target: {
                value: 'standard'
            }
        });
        expect(state.selected).toEqual('standard');
    });
});
