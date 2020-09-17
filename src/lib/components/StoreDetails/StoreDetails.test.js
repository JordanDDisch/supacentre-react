import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StoreDetails from './StoreDetails';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./../../containers/RadioContainer/RadioContainer');

it('Renders with validation message', () => {
    const address = {
        street: '14 Stamford Ct',
        suburb: 'Adelaide',
        state: 'SA',
        postcode: '5000'
    };
    const additionalInfo = {
        label: 'Opening Hours',
        value: 'Mon-Fri:9am-5pm'
    };

    const div = document.createElement('div');
    const element = (
        <StoreDetails
            id={1}
            name="Supacentre"
            address={address}
            distance="0.2"
            onChange={() => {}}
            additionalInfo={additionalInfo}
            errorMessage="Test error"
        />
    );
    ReactDOM.render(element, div);
});
