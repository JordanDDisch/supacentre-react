import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputContainer from './InputContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const inputContainer = mount(
        <InputContainer
            id="test"
            value="Test"
            label="Test"
            onChange={() => {}}
        />
    );

    expect(inputContainer.find('input').props().value).toEqual('Test');
});

it('validates a value exists', () => {
    const inputContainer = mount(
        <InputContainer
            id="test"
            value=""
            label="Test"
            onChange={() => {}}
            errorMessage="Error"
            isValid={false}
        />
    );


    expect(inputContainer.find('.validation-message').text()).toEqual('Error');
});

it('validates using custom validator', () => {
    let inputContainer;

    const validate = () => {
        inputContainer.setProps({ isValid: false });
    };

    inputContainer = mount(
        <InputContainer
            id="test"
            value="test"
            label="Test"
            onChange={() => {}}
            errorMessage="Error"
            validate={validate}
        />
    );

    inputContainer.find('input').simulate('blur');

    // The value entered is only 4 chars long, so according to the customer validator function, that is invalid
    expect(inputContainer.update().find('.validation-message').text()).toEqual('Error');
});
