import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccordionContainer from './AccordionContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The AccordionContainer component', () => {
    it('renders an accordion container without error', () => {
        const accordionKeyContainer1 = mount((
            <AccordionContainer
                keys={[
                    {
                        id: 'accordion-key-1',
                        label: 'Textures',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-2',
                        label: 'Colors',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-3',
                        label: 'Sizes',
                        children: (
                            <p>Some content</p>
                        )
                    }
                ]}
                name='accordionKeyList1'
                onClick={() => {}}
            />
        ));

        expect(accordionKeyContainer1.find('.accordion-key').exists()).toEqual(true);
    });

    it('render keys with open classes when passed a openKeys array', () => {
        const accordionKeyContainer2 = mount((
            <AccordionContainer
                keys={[
                    {
                        id: 'accordion-key-1',
                        label: 'Textures',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-2',
                        label: 'Colors',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-3',
                        label: 'Sizes',
                        children: (
                            <p>Some content</p>
                        )
                    }
                ]}
                name='accordionKeyList1'
                openKeys={[
                    'accordion-key-1'
                ]}
            />
        ));

        expect(accordionKeyContainer2.find('#accordion-key-1.accordion-key--open').exists()).toEqual(true);
        expect(accordionKeyContainer2.find('#accordion-key-2.accordion-key--closed').exists()).toEqual(true);
    });

    it('render keys with disabled classes and attributes when passed a disabledKeys array', () => {
        const accordionKeyContainer3 = mount((
            <AccordionContainer
                keys={[
                    {
                        id: 'accordion-key-1',
                        label: 'Textures',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-2',
                        label: 'Colors',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-3',
                        label: 'Sizes',
                        children: (
                            <p>Some content</p>
                        )
                    }
                ]}
                name='accordionKeyList1'
                disabledKeys={[
                    'accordion-key-2'
                ]}
            />
        ));

        expect(accordionKeyContainer3.find('#accordion-key-2.accordion-key--disabled').exists()).toEqual(true);
        expect(accordionKeyContainer3.find('#accordion-key-2 .accordion-key__trigger[disabled=true]').exists()).toEqual(true);
    });

    it('fires an onClick function where passed an onClick prop', () => {
        let onClickCalled = false;
        const onClick = () => {
            onClickCalled = true;
        };

        const accordionKeyContainer4 = mount((
            <AccordionContainer
                keys={[
                    {
                        id: 'accordion-key-1',
                        label: 'Textures',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-2',
                        label: 'Colors',
                        children: (
                            <p>Some content</p>
                        )
                    }, {
                        id: 'accordion-key-3',
                        label: 'Sizes',
                        children: (
                            <p>Some content</p>
                        )
                    }
                ]}
                name='accordionKeyList1'
                onClick={onClick}
            />
        ));

        accordionKeyContainer4.find('#accordion-key-1 .accordion-key__trigger').hostNodes().simulate('click');

        expect(onClickCalled).toEqual(true);
    });
});
