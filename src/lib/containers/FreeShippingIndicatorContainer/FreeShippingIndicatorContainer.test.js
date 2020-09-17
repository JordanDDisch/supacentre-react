import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FreeShippingIndicatorContainer from './FreeShippingIndicatorContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('FreeShippingIndicatorContainer', () => {
    it('Renders without error', () => {
        const freeShippingIndicatorContainer = mount((
            <FreeShippingIndicatorContainer
                progress={90.00}
                messageAvailable="You have unlocked free shipping"
                messageUnavailable="You are $5.00 away from free shipping"
                isAvailable={false}
            />
        ));

        expect(freeShippingIndicatorContainer.find('.progress-label').text()).toEqual('You are $5.00 away from free shipping');

        // Mock changing props to test if the message gets updated
        freeShippingIndicatorContainer.setProps({
            ...freeShippingIndicatorContainer.props(),
            progress: 110.00, // Some random number
            isAvailable: true
        });

        expect(freeShippingIndicatorContainer.find('.progress-label').text()).toEqual('You have unlocked free shipping');
    });

    it('ensures width is no bigger than 100%', () => {
        const freeShippingIndicatorContainer = mount((
            <FreeShippingIndicatorContainer
                progress={110.00}
                messageAvailable=""
                messageUnavailable=""
                isAvailable={true}
            />
        ));

        expect(freeShippingIndicatorContainer.find('div.meter').props().style.width).toEqual('100%');
    });
});
