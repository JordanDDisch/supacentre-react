import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FieldsetContainer from './FieldsetContainer';
import CheckboxRadioContainer from './../CheckboxRadioContainer/CheckboxRadioContainer';

Enzyme.configure({ adapter: new Adapter() });

function getCheckboxGroup() {
    return [
        {
            id: 'checkbox-list-item-1',
            value: 'checkbox-list-item-1',
            label: 'Checkbox item 1'
        }, {
            id: 'checkbox-list-item-2',
            value: 'checkbox-list-item-2',
            label: 'Checkbox item 2'
        }, {
            id: 'checkbox-list-item-3',
            value: 'checkbox-list-item-3',
            label: 'Checkbox item 3'
        }
    ].map((item, index) => {
        return (
            <CheckboxRadioContainer
                key={index}
                type='checkbox'
                name='checkbox-list-1'
                onChange={() => {}}
                {...item}
            />
        );
    });
}

describe('The Fieldset container', () => {
    it('renders without error', () => {
        const checkboxRadioList1 = mount((
            <FieldsetContainer
                type='checkbox'
                name='checkbox-list-1'
                legend='Checkbox list'
                onChange={() => {}}
            >
                { getCheckboxGroup() }
            </FieldsetContainer>
        ));

        expect(checkboxRadioList1.find('fieldset').exists()).toEqual(true);
    });

    it('renders a legend when passed a legend prop', () => {
        const checkboxRadioList2 = mount((
            <FieldsetContainer
                type='checkbox'
                name='checkbox-list-1'
                legend='Checkbox list'
                onChange={() => {}}
            >
                { getCheckboxGroup() }
            </FieldsetContainer>
        ));

        expect(checkboxRadioList2.find('.fieldset__legend').text()).toEqual('Checkbox list');
    });


    it('renders the name prop as a class on the fieldset', () => {
        const checkboxRadioList3 = mount((
            <FieldsetContainer
                type='checkbox'
                name='checkbox-list-1'
                legend='Checkbox list'
                onChange={() => {}}
            >
                { getCheckboxGroup() }
            </FieldsetContainer>
        ));

        expect(checkboxRadioList3.find('fieldset').hasClass('fieldset--checkbox-list-1')).toEqual(true);
    });
});
