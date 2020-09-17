import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AutoComplete from './AutoComplete';

Enzyme.configure({ adapter: new Adapter() });

const testSuggestions = [
    {
        value: 'Test1',
        selectable: true
    },
    {
        value: 'Test2',
        selectable: true
    }
];

it('Renders without error', () => {
    const element = mount(
        <AutoComplete
            suggestions={testSuggestions}
            onClick={() => {}}
        />
    );

    expect(element.find('button').length).toEqual(2);
});

it('Is empty with no suggestions', () => {
    const element = mount(
        <AutoComplete
            onClick={() => {}}
        />
    );

    expect(element.find('button').length).toEqual(0);
});

it('rendering non-selectable results', () => {
    const element = mount(
        <AutoComplete
            suggestions={[
                {
                    value: 'Searching...',
                    selectable: false
                }
            ]}
            onClick={() => {}}
        />
    );

    expect(element.find('button').length).toEqual(0);
    expect(element.find('span').length).toEqual(1);
});

it('can select item', () => {
    let selectedItem = { value: '' };

    const element = mount(
        <AutoComplete
            suggestions={testSuggestions}
            onClick={(index, suggestion) => { selectedItem = suggestion; }}
        />
    );

    element.find('button').first().simulate('click');

    expect(element.find('button').length).toEqual(2);
    expect(element.find('span').length).toEqual(0);
    expect(selectedItem.value).toEqual(testSuggestions[0].value);
});
