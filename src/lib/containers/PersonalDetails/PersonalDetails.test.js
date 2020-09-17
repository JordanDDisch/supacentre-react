import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PersonalDetails from './PersonalDetails';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const personalDetails = mount((
        <PersonalDetails
            firstname={{ value: 'Clark', valid: true }}
            lastname={{ value: 'Kent', valid: true }}
            email={{ value: 'kalel@krypton.com', valid: true }}
            telephone={{ value: '\'579-7866\'', valid: true }}
            onChange={() => {}}
        />
    ));

    expect(personalDetails.exists()).toEqual(true);
});

it('Renders children', () => {
    const personalDetails = mount((
        <PersonalDetails
            firstname={{ value: 'Clark', valid: true }}
            lastname={{ value: 'Kent', valid: true }}
            email={{ value: 'kalel@krypton.com', valid: true }}
            telephone={{ value: '\'579-7866\'', valid: true }}
            onChange={() => {}}
        >
            <div className="testChild">Test element</div>
        </PersonalDetails>
    ));

    expect(personalDetails.find('.testChild').exists()).toEqual(true);
});

it('omits email when prop set to false', () => {
    const personalDetails = mount((
        <PersonalDetails
            firstname={{ value: 'Clark', valid: true }}
            lastname={{ value: 'Kent', valid: true }}
            email={{ value: 'kalel@krypton.com', valid: true }}
            telephone={{ value: '\'579-7866\'', valid: true }}
            onChange={() => {}}
            displayEmail={false}
        >
            <div className="testChild">Test element</div>
        </PersonalDetails>
    ));

    expect(personalDetails.find('#personal-details__email').exists()).toEqual(false);
});
