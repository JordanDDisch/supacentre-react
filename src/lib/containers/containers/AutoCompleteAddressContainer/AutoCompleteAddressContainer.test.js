import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AutoCompleteAddressContainer from './AutoCompleteAddressContainer';

Enzyme.configure({ adapter: new Adapter() });

const options = {
    id: 'test',
    label: 'Test',
    name: 'test',
    address: '',
    onChange: () => {},
    validate: () => true,
    endpoint: '',
    handleClick: () => {},
    handleSearch: () => {},
    handleChange: () => {}
};

describe('AutoCompleteAddressContainer', () => {
    it('Renders without error', () => {
        const element = shallow(<AutoCompleteAddressContainer
            {...options}
        />);

        expect(element.exists()).toEqual(true);
    });

    it('Clears results when less than minimum characters', () => {
        const element = mount(
            <AutoCompleteAddressContainer
                {...options}
                minCharacters={3}
            />
        );

        element.find('input').simulate('change', { target: { value: 'aa' } });
        expect(element.find('a').length).toEqual(0);
    });

    it('won\'t call getResults after selecting a suggested value', () => {
        let handleSearchCalled = false;
        let handleClickCalled = false;

        const handleSearch = () => {
            handleSearchCalled = true;
        };

        const handleClick = () => {
            handleClickCalled = true;
        };

        const element = shallow(
            <AutoCompleteAddressContainer
                {...options}
                suggestions={[
                    'First',
                    'Second',
                    'Third'
                ]}
                minCharacters={3}
                willUpdateValue={true}
                handleClick={handleClick}
                handleSearch={handleSearch}
            />
        );

        // Call the clickResult function
        element.instance().clickResult(2);
        // Check that the canGetResults state value is updated
        expect(element.state().canGetResults).toEqual(false);
        // Set the address prop - emulates when a user selects a value from the suggestion list, and that value gets placed into the address prop
        element.setProps({ address: 'Third suggestion' });
        // Check that the handleSearch function isn't called
        expect(handleSearchCalled).toEqual(false);
        expect(handleClickCalled).toEqual(true);
        // Ensure the canGetResults state property has been reset for the next interaction
        expect(element.state().canGetResults).toEqual(true);
    });
});
