import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from './Input';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const input = mount(<Input id="test" value="Test" onChange={() => {}} />);

    expect(input.find('input').props().value).toEqual('Test');
});

it('Renders with error', () => {
    const input = mount(<Input id="test" value="Test" isValid={false} errorMessage={'error'} onChange={() => {}} />);

    expect(input.find('.validation-message').text()).toEqual('error');
});

it('Renders custom placeholder', () => {
    const input = mount(<Input id="test" value="Test" placeholder="Input Test" onChange={() => {}} />);

    expect(input.find('input').props().placeholder).toEqual('Input Test');
});

it('Uses label for placeholder when placeholder not defined', () => {
    const input = mount(<Input id="test" value="Test" label="Test label" onChange={() => {}} />);

    expect(input.find('input').props().placeholder).toEqual('Test label');
});

it('Omits placeholder when set to false', () => {
    const input = mount(<Input id="test" value="Test" placeholder={false} onChange={() => {}} />);

    expect(input.find('input').props().placeholder).toEqual('');
});

it('Renders custom error message', () => {
    const input = mount(
        <Input id="test" value="Test" isValid={false} errorMessage="The test input field is not valid" onChange={() => {}} />
    );

    expect(input.find('.validation-message').text()).toEqual('The test input field is not valid');
});

it('Renders label required *', () => {
    const input = mount(
        <Input
            id="test"
            value="Test"
            isRequired={true}
            onChange={() => {}}
        />
    );

    expect(input.find('.input-label-required').text()).toEqual('*');
});

it('Renders label custom required character', () => {
    const input = mount(
        <Input
            id="test"
            value="Test"
            requiredIndicator={'⚠️'}
            isRequired={true}
            onChange={() => {}}
        />
    );

    expect(input.find('.input-label-required').text()).toEqual('⚠️');
});

describe('Input', () => {
    it('will toggle focus class', () => {
        const input = shallow(
            <Input
                id="test"
                value="Test"
                requiredIndicator={'⚠️'}
                isRequired={true}
                onChange={() => {}}
            />
        );
        input.children().find('input').simulate('focus');

        expect(input.hasClass('input-container--focused')).toEqual(true);
    });
});
