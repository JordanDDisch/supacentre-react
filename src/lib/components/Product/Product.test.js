import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Product from './Product';

Enzyme.configure({ adapter: new Adapter() });

describe('The Product component', () => {
    it('renders without error', () => {
        const product1 = mount((
            <Product/>
        ));

        expect(product1.find('.product').exists()).toEqual(true);
    });
});
