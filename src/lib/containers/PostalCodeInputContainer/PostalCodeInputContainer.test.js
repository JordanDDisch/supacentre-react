import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PostalCodeInputContainer from './PostalCodeInputContainer';

Enzyme.configure({ adapter: new Adapter() });


it('Renders without error', () => {
    const element = mount(
        <PostalCodeInputContainer
            id="test"
            value="Test"
            onChange={() => {}}
            validate={() => {}}
        />
    );
    expect(element.find('input').props().value).toEqual('Test');
});

it('Errors on invalid input', () => {
    let element;
    function validate() {
        element.setProps({ isValid: false });
    }

    element = mount(
        <PostalCodeInputContainer
            id="test"
            value="Test"
            onChange={() => {}}
            validate={validate}
            isValid={false}
            isRequired={true}

        />
    );

    element.find('input').simulate('blur');

    expect(element.update().find('.validation-message').text()).toEqual('Please enter a valid postcode');
});
