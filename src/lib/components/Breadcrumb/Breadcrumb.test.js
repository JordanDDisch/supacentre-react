import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Breadcrumb from './Breadcrumb';

Enzyme.configure({ adapter: new Adapter() });

describe('The Breadcrumb component', () => {
    it('renders a breadcrumb without error', () => {
        const breadcrumb1 = mount((
            <Breadcrumb
                title='Home'
                link='/'
            />
        ));

        expect(breadcrumb1.find('.breadcrumb').exists()).toEqual(true);
    });

    it('does not render a link when not passed a link prop', () => {
        const breadcrumb2 = mount((
            <Breadcrumb
                title='About'
            />
        ));

        expect(breadcrumb2.find('.breadcrumb--link').exists()).toEqual(false);
    });
});
