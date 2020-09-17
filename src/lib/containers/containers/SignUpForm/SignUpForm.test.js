import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUpForm from './SignUpForm';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const signUpForm = mount((
        <SignUpForm
            handleContinue={() => {}}
        />
    ));

    expect(signUpForm.find('input#signup-password').props().type).toEqual('password');
});

it('validates required fields have data', () => {
    const signUpForm = mount((
        <SignUpForm
            handleContinue={() => {}}
        />
    ));

    signUpForm.setState({
        ...signUpForm.state,
        firstname: 'Test',
        lastname: '',
        email: 'test.user@testdomain.com',
        password: 'password123'
    });

    signUpForm.find('.sign-up-form__button--continue').simulate('submit');

    expect(signUpForm.state().isValid).toEqual(false);
    expect(signUpForm.state().validationMessage).toEqual('Please fill in all fields');
});

it('validates passwords match', () => {
    const signUpForm = mount((
        <SignUpForm
            handleContinue={() => {}}
        />
    ));

    signUpForm.setState({
        ...signUpForm.state,
        firstname: 'Test',
        lastname: 'User',
        email: 'test.user@testdomain.com',
        password: 'password123',
        passwordConfirmation: 'password12'
    });

    signUpForm.find('.sign-up-form__button--continue').simulate('submit');

    expect(signUpForm.state().isValid).toEqual(false);
    expect(signUpForm.state().validationMessage).toEqual('Please make sure passwords match');
});

it('hides password field when user forgot password', () => {
    const signUpForm = mount((
        <SignUpForm
            handleContinue={() => {}}
        />
    ));

    signUpForm.find('input#sign-up-newsletter')
        .simulate('change', {
            target: {
                checked: true
            }
        });

    expect(signUpForm.state().signUpNewsletter).toEqual(true);
});
