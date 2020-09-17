import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Swatch from './Swatch';

Enzyme.configure({ adapter: new Adapter() });

describe('The swatch component', () => {
    it('renders a swatch without error', () => {
        const swatch1 = mount((
            <Swatch
                label='Blue'
                name='swatch1'
            />
        ));

        expect(swatch1.exists()).toEqual(true);
    });
});
