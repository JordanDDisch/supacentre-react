import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PriceDisplay from './PriceDisplay';

Enzyme.configure({ adapter: new Adapter() });


it('Renders without error', () => {
    const element = mount(<PriceDisplay
        id={0}
        className="subtotal"
        label="Test"
        price="$0"
        handleRemove={() => {}}
    />);
    expect(element.find('.price-display').hasClass('subtotal')).toEqual(true);
    expect(element.find('.price-display__label').text()).toEqual('Test');
    expect(element.find('.price-display__price').text()).toEqual('$0');
});

it('Renders with complex label', () => {
    const element = mount(<PriceDisplay
        id={0}
        className="subtotal"
        label={<span className="label">Label</span>}
        price="$0"
        handleRemove={() => {}}
    />);
    expect(element.find('.price-display__label').text()).toEqual('Label');
    expect(element.find('.price-display__label--control span').hasClass('label')).toEqual(true);
});
