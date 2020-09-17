import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextArea from './TextArea';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const textArea = mount((
        <TextArea
            id="test"
            value='Test'
            onChange={() => {}}
        />
    ));

    expect(textArea.find('textarea').props().value).toEqual('Test');
});

it('Renders with validation errors', () => {
    const textArea = mount((
        <TextArea
            id="test"
            value='Test'
            onChange={() => {}}
            isValid={false}
            showMessage={true}
            errorMessage="Please enter a value"
        />
    ));

    // Using children because the element is a textarea, not an input, so value is stored as a children to the element,
    // not an attribute
    expect(textArea.find('.validation-message').props().children).toEqual('Please enter a value');
});

it('Marks element as required', () => {
    const textArea = mount((
        <TextArea
            id="test"
            value='Test'
            onChange={() => {}}
            isRequired={true}
        />
    ));

    expect(textArea.find('textarea').props().required).toEqual(true);
});

it('Calls change function', () => {
    let onChangeCalled = false;
    const onChange = () => {
        onChangeCalled = true;
    };

    const textArea = mount((
        <TextArea
            id="test"
            value='Test'
            onChange={onChange}
        />
    ));

    textArea.find('textarea')
        .simulate('change', {
            target: {
                value: 'Test textarea'
            }
        });

    expect(onChangeCalled).toEqual(true);
});

it('Calls change function', () => {
    let onBlurCalled = false;
    const onBlur = () => {
        onBlurCalled = true;
    };

    const textArea = mount((
        <TextArea
            id="test"
            value='Test'
            onChange={() => {}}
            onBlur={onBlur}
        />
    ));

    textArea.find('textarea')
        .simulate('blur');

    expect(onBlurCalled).toEqual(true);
});
