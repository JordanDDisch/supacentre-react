import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextAreaContainer from './TextAreaContainer';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const textAreaContainer = mount((
        <TextAreaContainer
            id="test"
            value='Test'
            onChange={() => {}}
        />
    ));

    expect(textAreaContainer.find('textarea').exists()).toEqual(true);
});
