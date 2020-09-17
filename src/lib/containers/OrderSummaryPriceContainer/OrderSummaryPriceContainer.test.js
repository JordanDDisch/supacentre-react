import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderSummaryPriceContainer from './OrderSummaryPriceContainer';

Enzyme.configure({ adapter: new Adapter() });


const handleRemove = (e) => {
    this.setState({
        ...this.state,
        prices: this.state.prices.filter((price, index) => index !== parseInt(e.target.dataset.index, 10))
    });
};

const prices = [
    {
        className: 'subtotal',
        label: 'Subtotal',
        price: '$50'
    },
    {
        className: 'other',
        label: 'Other',
        price: '$10'
    },
    {
        className: 'gift-card',
        label: 'Gift Card',
        subLabel: '2889084359390202394',
        price: '$10',
        discount: true,
        modifier: true
    },
    {
        className: 'total',
        label: 'Total',
        price: '$60'
    }
];


it('Renders without error', () => {
    const element = mount(<OrderSummaryPriceContainer prices={prices} handleRemove={handleRemove.bind(this)} />);
    expect(element.find('.price-display.subtotal .price-display__price').text()).toEqual('$50');
    expect(element.find('.price-display.gift-card').hasClass('discount')).toEqual(true);
    expect(element.find('.price-display.gift-card .price-display__price').text()).toEqual('$10');
    expect(element.find('.price-display.gift-card .price-display__label span').at(1).text()).toEqual('2889084359390202394');
    expect(element.find('.price-display.gift-card.discount button.remove-modifier').exists()).toEqual(true);
});
