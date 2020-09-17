export default {
    uri: '#',
    sku: '123456',
    price: 169.99,
    name: 'Test',
    priceSale: 99.99,
    image: {
        src: 'https://s3.amazonaws.com/ffe-ugc/intlportal2/dev-temp/en-US/__56ee92ea36756-15164a2197e03206462d6ce19928cf74b69c3433-30fcfef6d0c04810.jpg',
        alt: 'image alt',
        width: '',
        height: ''
    },
    message: '<div class="order-status--pre-order"><span>ON PRE-ORDER</span><span>New shipment expected 29/06/18</span></div>',
    configurables: {
        foo: {
            id: 'foo',
            label: 'Kung Foo',
            labelOnly: true,
            selection: 'fighting',
            options: [
                {
                    label: 'Fighting',
                    value: 'fighting'
                },
                {
                    label: 'Frightening',
                    value: 'frightening'
                }
            ]
        },
        color: {
            id: 'color',
            label: 'Colour',
            selection: 'purple',
            options: [
                {
                    label: 'Purple',
                    value: 'purple'
                },
                {
                    label: 'Red',
                    value: 'red'
                },
                {
                    label: 'Black',
                    value: 'black'
                }
            ]
        },
        size: {
            id: 'size',
            label: 'Size',
            selection: '14',
            options: [
                {
                    label: '10',
                    value: '10'
                },
                {
                    label: '12',
                    value: '12'
                },
                {
                    label: '14',
                    value: '14'
                },
                {
                    label: '16',
                    value: '16'
                }
            ]
        },
        qty: {
            id: 'qty',
            label: 'Qty',
            selection: '2',
            options: [
                {
                    label: '1',
                    value: '1'
                },
                {
                    label: '2',
                    value: '2'
                },
                {
                    label: '3',
                    value: '3'
                },
                {
                    label: '4',
                    value: '4'
                },
                {
                    label: '5',
                    value: '5'
                }
            ]
        }
    }
};
