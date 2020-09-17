import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RadioContainer from './RadioContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders with validation message', () => {
    const div = document.createElement('div');
    const element = (
        <RadioContainer
            id="radio-test"
            val="1"
            onChange={() => {}}
        />
    );
    ReactDOM.render(element, div);
});
