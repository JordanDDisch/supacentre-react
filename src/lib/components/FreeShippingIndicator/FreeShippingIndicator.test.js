import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FreeShippingIndicator from './FreeShippingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('FreeShippingIndicator', () => {
    it('Renders without error', () => {
        const freeshippingindicator = shallow((
            <FreeShippingIndicator
                progress={90.00}
                message='Spend $5 more to qualify for free shipping!'
            />
        ));

        expect(freeshippingindicator.find('div.meter').props().style.width).toEqual('90%');
        expect(freeshippingindicator.find('.progress-label').text()).toEqual('Spend $5 more to qualify for free shipping!');
        expect(freeshippingindicator.find('.meter').props().className.includes('meter-full')).toEqual(false);
    });

    it('adds classname when free shipping is available', () => {
        const freeshippingindicator = shallow((
            <FreeShippingIndicator
                progress={100.00}
                message='Spend $5 more to qualify for free shipping!'
                isAvailable={true}
            />
        ));

        expect(freeshippingindicator.find('.meter').props().className.includes('meter-full')).toEqual(true);
    });
});
