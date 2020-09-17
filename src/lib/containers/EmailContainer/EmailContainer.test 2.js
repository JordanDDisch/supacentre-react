import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmailContainer from './EmailContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const emailContainer = mount(
        <EmailContainer
            id="email"
            value="my@email.com"
            onChange={() => {}}
            validate={() => {}}
        />
    );

    expect(emailContainer.find('input').props().value).toEqual('my@email.com');
});

it('validates email', () => {
    let emailContainer;
    const validate = () => {
        emailContainer.setProps({ isValid: false });
    };

    emailContainer = mount(
        <EmailContainer
            id="email"
            value="myemailaddress"
            onChange={() => {}}
            validate={validate}
        />
    );

    emailContainer.find('input').simulate('blur');

    expect(emailContainer.update().find('.validation-message').text()).toEqual('Please enter a valid email');
});
