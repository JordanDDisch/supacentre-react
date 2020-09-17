import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from './Select';

Enzyme.configure({ adapter: new Adapter() });

const selectOptions = [
    {
        value: 1,
        label: 'one',
        disabled: false
    },
    {
        value: 2,
        label: 'two',
        disabled: false
    },
    {
        value: 3,
        label: 'three',
        disabled: true
    }
];

it('Renders without error', () => {
    const element = mount(<Select id="select-test" name="select-test" options={selectOptions} onChange={() => {}} value={selectOptions[1]} />);

    expect(element.find('.select-input').exists()).toEqual(true);
    expect(element.find('option').length).toEqual(3);
    expect(element.find('.select-input').instance().value).toEqual('2');
});
