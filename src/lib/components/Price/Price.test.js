import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Price from './Price';

Enzyme.configure({ adapter: new Adapter() });

describe('The Price component', () => {
    it('renders without error', () => {
        const price1 = mount((
            <Price
                prices={[
                    {
                        type: 'Regular',
                        value: '$200.00'
                    }
                ]}
            />
        ));

        expect(price1.find('.price').exists()).toEqual(true);
    });

    it('renders multiple prices when passed more than one object in the prices array', () => {
        const price2 = mount((
            <Price
                prices={[
                    {
                        type: 'Regular',
                        value: '$200.00'
                    }, {
                        type: 'Sale',
                        value: '$139.99'
                    }
                ]}
            />
        ));

        expect(price2.find('.price').length).toEqual(2);
    });

    it('renders all but last price as strikethrough when passed more than one object in the prices array', () => {
        const price3 = mount((
            <Price
                prices={[
                    {
                        type: 'Regular',
                        value: '$200.00'
                    }, {
                        type: 'Sale',
                        value: '$139.99'
                    }
                ]}
            />
        ));

        expect(price3.find('.price--regular s').exists()).toEqual(true);
    });
});
