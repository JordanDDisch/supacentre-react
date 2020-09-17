import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxRadioContainer from './CheckboxRadioContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The CheckboxRadio container', () => {
    it('renders without error', () => {
        const checkboxRadioContainer = mount((
            <CheckboxRadioContainer
                type="checkbox"
                id="checkbox"
                value="checkbox"
                name="checkbox"
                label="checkbox"
                onChange={() => {}}
            />
        ));

        expect(checkboxRadioContainer.find('#checkbox').exists()).toEqual(true);
    });
});
