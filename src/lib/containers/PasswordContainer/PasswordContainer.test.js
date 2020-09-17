import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PasswordContainer from './PasswordContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const passwordContainer = mount(
        <PasswordContainer
            id="password"
            value="mypassword"
            label="Password"
            onChange={() => {}}
            validate={() => {}}
        />
    );

    expect(passwordContainer.find('input').props().value).toEqual('mypassword');
});
