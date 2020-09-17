import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Radio from './Radio';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const div = document.createElement('div');
    const element = (
        <Radio
            id="test-radio"
            name="test-radio-group"
            value="25"
            onChange={() => {}}
        />
    );
    ReactDOM.render(element, div);
});
