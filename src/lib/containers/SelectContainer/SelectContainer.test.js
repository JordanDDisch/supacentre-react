import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectContainer from './SelectContainer';

Enzyme.configure({ adapter: new Adapter() });

const options = [
    {
        label: '',
        value: ''
    },
    {
        label: 'Australia',
        value: 'au'
    }
];

it('Renders without error', () => {
    const element = mount(<SelectContainer id="countries" name="countries" label="Countries" options={options} handleChange={() => {}} />);
    expect(element.find('.select-wrapper').exists()).toEqual(true);
});

it('Renders with validation message', () => {
    const element = mount(
        <SelectContainer
            id="countries"
            name="countries"
            label="Countries"
            isValid={false}
            errorMessage="Please select a country from the list"
            options={options}
            handleChange={() => {}}
        />
    );

    expect(element.find('.validation-message').text()).toEqual('Please select a country from the list');
});

it('Renders with label required', () => {
    const element = mount(<SelectContainer id="countries" name="countries" label="Countries" isRequired={true} options={options} handleChange={() => {}} />);

    expect(element.find('.input-label-required').text()).toEqual('*');
});

it('Renders with label custom required character', () => {
    const element = mount(
        <SelectContainer
            id="countries"
            name="countries"
            label="Countries"
            requiredIndicator={'$$$'}
            isRequired={true}
            options={options}
            handleChange={() => {}}
        />
    );

    expect(element.find('.input-label-required').text()).toEqual('$$$');
});

it('Handles onChange correctly', () => {
    let state;
    const element = mount(
        <SelectContainer
            id="countries"
            name="countries"
            label="Countries"
            options={options}
            handleChange={({ target }) => {
                state = target;
            }}
        />
    );

    expect(element.find('select').props().value).toEqual('');
    element.find('select').simulate('change', { target: { value: 'au' } });
    expect(state).toEqual({ name: 'countries', value: 'au' });
    expect(element.find('select').props().value).toEqual('au');
});
