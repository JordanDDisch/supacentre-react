import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TabbedUiContainer from './TabbedUiContainer';

Enzyme.configure({ adapter: new Adapter() });


const tabs = [
    {
        code: 'creditcard',
        label: 'Credit Card',
        content: (
            <iframe src="" frameBorder="0" title="Credit Card Iframe"></iframe>
        ),
        buttonLabel: 'Pay with Credit Card'
    },
    {
        code: 'paypal',
        iconUrl: 'pp-not-here.png',
        label: 'Paypal',
        content: 'You will be redirected to PayPal',
        buttonLabel: 'Pay with PayPal'
    },
    {
        code: 'zippay',
        iconUrl: 'zp-not-here.png',
        label: 'zipPay',
        content: 'You will be redirected to zipPay',
        buttonLabel: 'Pay with zipPay'
    }
];


it('Renders without error', () => {
    const element = mount(<TabbedUiContainer tabs={tabs} />);
    expect(element.find('.tabbed-ui__tabs li').length).toEqual(3);
});


it('Use label if !iconUrl', () => {
    const element = mount(<TabbedUiContainer tabs={tabs} />);
    expect(element.find('.tabbed-ui__tabs li').at(0).text()).toEqual('Credit Card');
    expect(element.find('.tabbed-ui__tabs li').at(1).find('img').prop('src')).toEqual('pp-not-here.png');
});


it('Toggles content and submit', () => {
    const element = mount(<TabbedUiContainer tabs={tabs}/>);
    element.find('.tabbed-ui__tabs li').at(1).simulate('click');
    expect(element.find('.tabbed-ui__content .active').text()).toEqual('You will be redirected to PayPal');
    expect(element.find('.tabbed-ui__actions .tabbed-ui__action-button').text()).toEqual('Pay with PayPal');
});

it('handles when when tabs prop is empty', () => {
    const element = mount(<TabbedUiContainer tabs={[]} noTabsMessage='No tabs provided'/>);

    expect(element.find('.tabbed-ui__tab').length).toEqual(1);
    expect(element.find('.tabbed-ui__tab').text()).toEqual('No tabs provided');
});

it('uses custom button', () => {
    const tab = [
        {
            code: 'test',
            label: 'Test Label',
            content: 'Test content',
            button: <button className="customButton">Custom Button</button>
        }
    ];
    const element = mount(<TabbedUiContainer tabs={tab}/>);

    expect(element.find('.customButton').exists()).toEqual(true);
});
