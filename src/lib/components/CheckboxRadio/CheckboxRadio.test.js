import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxRadio from './CheckboxRadio';

Enzyme.configure({ adapter: new Adapter() });

describe('The CheckboxRadio component', () => {
    it('renders a checkbox without error', () => {
        const checkbox1 = mount((
            <CheckboxRadio
                type='checkbox'
                id='checkbox'
                label='checkbox'
                value='checkbox'
                name='checkbox'
                onChange={() => {}}
            />
        ));

        expect(checkbox1.find('#checkbox').exists()).toEqual(true);
    });

    it('renders a radio button without error', () => {
        const radio1 = mount((
            <CheckboxRadio
                type='radio'
                id='radio'
                label='radio'
                value='radio'
                name='radio'
                onChange={() => {}}
            />
        ));

        expect(radio1.find('#radio').exists()).toEqual(true);
    });

    it('renders labels in multiple elements when passed an object as a label prop', () => {
        const checkbox2 = mount((
            <CheckboxRadio
                type='checkbox'
                id='checkbox'
                name='checkbox'
                label={(<span><span>Table Column 1</span><span>Table Column 2</span><span>Table Column 3</span></span>)}
                onChange={() => {}}
            />
        ));

        expect(checkbox2.find('span > span').length).toEqual(3);
    });

    it('renders as checked when passed the isSelected prop', () => {
        const checkbox3 = mount((
            <CheckboxRadio
                type='checkbox'
                id='checkbox'
                name='checkbox'
                label="I should be selected"
                onChange={() => {}}
                isSelected={true}
            />
        ));

        expect(checkbox3.find('#checkbox').hostNodes().props().checked).toEqual(true);
    });

    it('renders as disabled when passed the isDisabled prop', () => {
        const checkbox4 = mount((
            <CheckboxRadio
                type='checkbox'
                id='checkbox'
                name='checkbox'
                label='I should be selected'
                onChange={() => {}}
                isDisabled={true}
            />
        ));

        expect(checkbox4.find('#checkbox[disabled]').exists()).toEqual(true);
    });

    it('fires an onChange event', () => {
        let onChangeCalled = false;
        const onChange = () => {
            onChangeCalled = true;
        };

        const checkbox5 = mount((
            <CheckboxRadio
                type='checkbox'
                id='checkbox'
                name='checkbox'
                label='I should fire an onChange event'
                onChange={onChange}
            />
        ));

        checkbox5.find('#checkbox').hostNodes().simulate('change');

        expect(onChangeCalled).toEqual(true);
    });
});
