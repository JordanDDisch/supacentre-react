import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaymentModifierContainer from './PaymentModifierContainer';

Enzyme.configure({ adapter: new Adapter() });


const modifiers = [
    {
        id: 'promo-code',
        label: 'Promotion Code'
    },
    {
        id: 'gift-card',
        label: 'Gift Card'
    },
    {
        id: 'exchange-card',
        label: 'Exchange Card'
    }
];


it('Renders without error', () => {
    const element = mount((
        <PaymentModifierContainer
            id='test'
            modifiers={modifiers}
            className='all-modifiers'
            label='Enter code'
            buttonLabel='APPLY'
            appliedDiscounts={['Test']}
            submit={() => {}}
            validate={() => {}}
        />
    ));

    expect(element.find('.payment-modifier').hasClass('all-modifiers')).toEqual(true);
    expect(element.find('.payment-modifier__options div').length).toEqual(3);
    expect(element.find('.payment-modifier__options .modifier--promo-code label').text()).toEqual('Promotion Code');
    expect(element.find('.payment-modifier__form label').text()).toEqual('Enter code');
    expect(element.find('.payment-modifier__apply-button').text()).toEqual('APPLY');
    expect(element.find('.payment-modifier__applied-discounts').exists()).toEqual(true);
});


it('Updates state.selection', () => {
    const element = mount((
        <PaymentModifierContainer
            id='test'
            modifiers={modifiers}
            className='all-modifiers'
            label='Enter code'
            buttonLabel='APPLY'
            appliedDiscounts={[]}
            submit={() => {}}
            validate={() => {}}
        />
    ));

    element.find('input#payment-modifier-gift-card-radio').simulate('change');
    expect(element.state('selection')).toEqual('gift-card');
});


it('Updates state.code', () => {
    const element = mount((
        <PaymentModifierContainer
            id='test'
            modifiers={modifiers}
            className='all-modifiers'
            label='Enter code'
            buttonLabel='APPLY'
            appliedDiscounts={[]}
            submit={() => {}}
            validate={() => {}}
        />
    ));

    element.find('input#payment-modifier-test-input')
        .simulate('change', {
            target: { value: '12345678' }
        });

    expect(element.state('modifiercode')).toEqual('12345678');
    expect(element.update().find('.form-input').props().value).toEqual('12345678');
});


it('Adds message for no input', async () => {
    const element = mount((
        <PaymentModifierContainer
            id='test'
            modifiers={modifiers}
            className='all-modifiers'
            label='Enter code'
            buttonLabel='APPLY'
            appliedDiscounts={[]}
            submit={() => {}}
            validate={() => {}}
        />
    ));

    expect(element.find('.payment-modifier__applied-discounts').exists()).toEqual(false);

    element.find('.payment-modifier__apply-button').simulate('submit');

    expect(element.find('.payment-modifier__messages').exists()).toEqual(true);
    expect(element.find('.payment-modifier__current-message').text()).toEqual('Please enter a code');
});

it('Doesn\'t dipslay balance when one isn\'t provided', () => {
    const element = shallow((
        <PaymentModifierContainer
            id='test'
            modifiers={modifiers}
            className='all-modifiers'
            label='Enter code'
            buttonLabel='APPLY'
            appliedDiscounts={[]}
            submit={() => {}}
            canCheckBalance={true}
        />
    ));


    expect(element.find('.payment-modifier__card-balance').exists()).toEqual(false);
});

it('Displays balance when one is provided', () => {
    const element = shallow((
        <PaymentModifierContainer
            id='test'
            modifiers={modifiers}
            className='all-modifiers'
            label='Enter code'
            buttonLabel='APPLY'
            appliedDiscounts={[]}
            submit={() => {}}
            canCheckBalance={true}
        />
    ));

    element.setState({
        ...element.state(),
        balance: 20
    });

    expect(element.find('.payment-modifier__card-balance').exists()).toEqual(true);
});
