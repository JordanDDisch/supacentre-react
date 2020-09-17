import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GeolocateButton from './GeolocateButton';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./../../utils/WindowNavigatorWrapper', () => {
    return {
        geolocation: true
    };
});

it('Renders without error', () => {
    const buttonEl = mount(<GeolocateButton handleGeolocation={() => {}}/>);

    expect(buttonEl.find('button').exists()).toEqual(true);
});

it.skip('Doesn\'t render when geolocation isn\'t available', () => {
    // To be able to complete this test, need to figure out the best way to change the mocked object
    const buttonEl = mount(<GeolocateButton handleGeolocation={() => {}}/>);
    expect(buttonEl.find('button').exists()).toEqual(false);
});
