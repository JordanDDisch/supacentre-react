import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccordionKeyContainer from './AccordionKeyContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The AccordionKeyContainer component', () => {
    it('renders an accordion key container without error', () => {
        const accordionKeyContainer1 = mount((
            <AccordionKeyContainer
                label='An accordion key'
                name='accordionKey1'
            >
                <p>Some content</p>
            </AccordionKeyContainer>
        ));

        expect(accordionKeyContainer1.find('.accordion-key').exists()).toEqual(true);
    });
});
