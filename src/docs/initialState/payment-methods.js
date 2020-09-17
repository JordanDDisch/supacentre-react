import React from 'react';

export default [
    {
        label: 'Credit Card',
        content: 'Credit card iFrame',
        buttonLabel: 'Pay with Credit Card'
    },
    {
        iconUrl: 'pp-not-here.png',
        label: 'Paypal',
        content: 'You will be redirected to PayPal',
        buttonLabel: 'Pay with PayPal'
    },
    {
        iconUrl: 'zp-not-here.png',
        label: 'zipPay',
        content: 'You will be redirected to zipPay',
        buttonLabel: 'Pay with zipPay'
    },
    {
        label: 'Custom Payment',
        content: 'This example uses a custom button',
        button: (
            <button className="tabbed-ui__action-button custom-button" onClick={() => { alert('Custom Pay now button clicked'); }}>
                Pay now with custom button
            </button>
        )
    }
];
