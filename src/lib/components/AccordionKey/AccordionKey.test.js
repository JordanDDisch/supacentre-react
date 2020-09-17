import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccordionKey from './AccordionKey';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    jest.useFakeTimers();
});

describe('The AccordionKey component', () => {
    it('renders an accordion key without error', () => {
        const accordionKey1 = mount((
            <AccordionKey
                label='An accordion key'
                name='accordionKey1'
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        expect(accordionKey1.find('.accordion-key').exists()).toEqual(true);
    });

    it('renders an open accordion key class when passed the isOpen prop', () => {
        const accordionKey2 = mount((
            <AccordionKey
                label='I am open'
                name='accordionKey2'
                isOpen={true}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        expect(accordionKey2.find('.accordion-key--open').exists()).toEqual(true);
    });

    it('renders a closed accordion key class when not passed the isOpen prop', () => {
        const accordionKey3 = mount((
            <AccordionKey
                label='I am closed'
                name='accordionKey3'
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        expect(accordionKey3.find('.accordion-key--closed').exists()).toEqual(true);
    });

    it('renders a disabled class and disabled attribute when passed the isDiabled prop', () => {
        const accordionKey4 = mount((
            <AccordionKey
                label='I am disabled'
                name='accordionKey4'
                isDisabled={true}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        expect(accordionKey4.find('.accordion-key--disabled').exists()).toEqual(true);
        expect(accordionKey4.find('.accordion-key__trigger[disabled=true]').exists()).toEqual(true);
    });

    it('fires an onClick function where passed an onClick prop', () => {
        let onClickCalled = false;
        const onClick = () => {
            onClickCalled = true;
        };

        const accordionKey4 = mount((
            <AccordionKey
                label='I am clicked'
                name='accordionKey4'
                onClick={onClick}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        accordionKey4.find('.accordion-key__trigger').simulate('click');

        expect(onClickCalled).toEqual(true);
    });

    it('closes content when the trigger button is clicked', () => {
        let accordionKey5;

        const onClick = () => {
            accordionKey5.setProps({
                isOpen: false
            });
        };

        accordionKey5 = mount((
            <AccordionKey
                label='I am going to close'
                name='accordionKey5'
                onClick={onClick}
                isOpen={true}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        accordionKey5.find('.accordion-key__trigger').simulate('click');

        expect(accordionKey5.find('.accordion-key--closed').exists()).toEqual(true);
    });

    it('opens content when the trigger button is clicked', () => {
        let accordionKey6;

        const onClick = () => {
            accordionKey6.setProps({
                isOpen: true
            });
        };

        accordionKey6 = mount((
            <AccordionKey
                label='I am going to open'
                name='accordionKey6'
                onClick={onClick}
                isOpen={false}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        accordionKey6.find('.accordion-key__trigger').simulate('click');

        expect(accordionKey6.find('.accordion-key--open').exists()).toEqual(true);
    });

    it('does not update state if same isOpen prop is passed', () => {
        let accordionKey7;

        const onClick = () => {
            accordionKey7.setProps({
                isOpen: accordionKey7.props().isOpen
            });
        };

        accordionKey7 = mount((
            <AccordionKey
                label='I am not going to change state if my previous isOpen state is set'
                name='accordionKey7'
                onClick={onClick}
                isOpen={false}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        accordionKey7.find('.accordion-key__trigger').simulate('click');

        expect(accordionKey7.find('.accordion-key--closed').exists()).toEqual(true);
    });

    it('cancels interval timer when clicked twice before transition is finished', () => {
        let accordionKey8;

        const onClick = () => {
            accordionKey8.setProps({
                isOpen: !accordionKey8.props().isOpen
            });
        };

        accordionKey8 = mount((
            <AccordionKey
                label='I am going to open and then close before the initial open transition finishes'
                name='accordionKey8'
                onClick={onClick}
                isOpen={false}
            >
                <p>Some content</p>
            </AccordionKey>
        ));

        accordionKey8.find('.accordion-key__trigger').simulate('click');
        accordionKey8.find('.accordion-key__trigger').simulate('click');

        jest.runOnlyPendingTimers();

        expect(accordionKey8.find('.accordion-key--closed').exists()).toEqual(true);
    });
});
