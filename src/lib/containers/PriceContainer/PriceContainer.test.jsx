import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PriceContainer from './PriceContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The Price container', () => {
    it('renders without error', () => {
        const price1 = mount((
            <PriceContainer
                prices={[
                    {
                        type: 'Regular',
                        value: '$200.00'
                    }, {
                        type: 'Sale',
                        value: '$100.00'
                    }
                ]}
            />
        ));

        expect(price1.find('.price').exists()).toEqual(true);
    });
});
