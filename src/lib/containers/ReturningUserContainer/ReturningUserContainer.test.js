import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReturningUserContainer from './ReturningUserContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const inputContainer = mount((
        <ReturningUserContainer
            email={{ value: 'my@email.com', valid: true }}
            password={{ value: 'p@ssw0rd', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={() => {}}
        />
    ));

    expect(inputContainer.find('input[type="email"]').props().value).toEqual('my@email.com');
    expect(inputContainer.find('input[type="password"]').props().value).toEqual('p@ssw0rd');
    expect(inputContainer.find('input[type="password"]').length).toEqual(1);
});

it('hides password field when user forgot password', () => {
    const inputContainer = shallow((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={() => {}}
        />
    ));

    inputContainer.setState({
        ...inputContainer.state,
        forgotPassword: true
    });

    expect(inputContainer.find('input[type="password"]').length).toEqual(0);
});

it('updates state correctly when user forgets password', () => {
    const inputContainer = shallow((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={() => {}}
        />
    ));

    const mockEvent = {
        target: {
            name: 'forgotPassword',
            checked: true
        }
    };

    inputContainer.instance().handleCheckbox(mockEvent);

    expect(inputContainer.state().forgotPassword).toEqual(true);
    // Make sure the other piece of state hasn't been inadvertently changed
    expect(inputContainer.state().rememberMe).toEqual(false);
});

it('updates state correctly when user selects to remember me', () => {
    const inputContainer = shallow((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={() => {}}
        />
    ));

    const mockEvent = {
        target: {
            name: 'rememberMe',
            checked: true
        }
    };

    inputContainer.instance().handleCheckbox(mockEvent);

    expect(inputContainer.state().rememberMe).toEqual(true);
    // Make sure the other piece of state hasn't been inadvertently changed
    expect(inputContainer.state().forgotPassword).toEqual(false);
});

it('calls handleLogin function', () => {
    let loginHandled = false;
    const handleLogin = () => {
        loginHandled = true;
    };

    const inputContainer = mount((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={handleLogin}
            handleReset={() => {}}
            handleChange={() => {}}
        />
    ));

    inputContainer.find('button.returning-user__log-in-button').simulate('submit');

    expect(loginHandled).toEqual(true);
});

it('calls handleReset function', () => {
    let resetHandled = false;
    const handleReset = () => {
        resetHandled = true;
    };

    const inputContainer = shallow((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={handleReset}
            handleChange={() => {}}
        />
    ));

    inputContainer.setState({
        forgotPassword: true
    });

    inputContainer.find('button.returning-user__reset-password-button').simulate('click');

    expect(resetHandled).toEqual(true);
});

it('calls handleChange function', () => {
    let changeHandled = false;
    const handleChange = () => {
        changeHandled = true;
    };

    const inputContainer = mount((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={handleChange}
        />
    ));

    inputContainer.find('input[name="email"]').simulate('change', {
        target: { value: 'test@test.com' }
    });

    expect(changeHandled).toEqual(true);
});

it('renders default helper text', () => {
    const returningUserContainer = shallow((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={() => {}}
        />
    ));

    expect(returningUserContainer.find('.helper-text').text()).toEqual(ReturningUserContainer.defaultProps.existingAccountText);

    returningUserContainer.setState({
        ...returningUserContainer.state(),
        forgotPassword: true
    });

    expect(returningUserContainer.find('.helper-text').text()).toEqual(ReturningUserContainer.defaultProps.passwordResetText);
});

it('renders custom helper text', () => {
    const existingAccountText = 'If you\'re already a cool kid, just enter your cool kid email address';
    const passwordResetText = 'Enter your email and we\'ll track down a new password for you!';

    const returningUserContainer = shallow((
        <ReturningUserContainer
            email={{ value: '', valid: true }}
            password={{ value: '', valid: true }}
            handleLogin={() => {}}
            handleReset={() => {}}
            handleChange={() => {}}
            existingAccountText={existingAccountText}
            passwordResetText={passwordResetText}
        />
    ));

    expect(returningUserContainer.find('.helper-text').text()).toEqual(existingAccountText);

    returningUserContainer.setState({
        ...returningUserContainer.state(),
        forgotPassword: true
    });

    expect(returningUserContainer.find('.helper-text').text()).toEqual(passwordResetText);
});
