import React, { Fragment } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductContainer from './ProductContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The Product container', () => {
    it('renders without error', () => {
        const productContainer1 = mount((
            <ProductContainer
                images={[
                    './img/product-danielle-1.jpg'
                ]}
                title={
                    {
                        title: 'Hi-Lo Dress',
                        subtitle: 'Danielle'
                    }
                }
                link='http://aligent.com.au'
                prices={[
                    {
                        type: 'Regular',
                        value: '$139.99'
                    }
                ]}
            />
        ));

        expect(productContainer1.find('.product').exists()).toEqual(true);
    });

    it('renders a custom link target when passed the linkTarget prop', () => {
        const productContainer2 = mount((
            <ProductContainer
                images={[
                    './product-fit-flare-1.jpg'
                ]}
                title={
                    {
                        title: 'Wide Leg Jumpsuit',
                        subtitle: 'Cara'
                    }
                }
                link='http://aligent.com.au'
                linkTarget='_blank'
                prices={[
                    {
                        type: 'Regular',
                        value: '$139.99'
                    }
                ]}
                slotImage={(
                    <div className='product-slot productContainer-slot--ribbon product-slot productContainer-slot--ribbon--sale' key='ribbon'>
                        <p>Sale</p>
                    </div>
                )}
                slotDescription={(
                    <Fragment>
                        <div className='product-slot productContainer-slot--description'>
                            <p>Black</p>
                        </div>
                    </Fragment>
                )}
            />
        ));

        expect(productContainer2.find('a').everyWhere(link => link.props('target="_blank"'))).toEqual(true);
    });

    it('renders a title component when passed a title prop', () => {
        const productContainer3 = mount((
            <ProductContainer
                images={[
                    './product-fit-flare-1.jpg'
                ]}
                title={
                    {
                        title: 'Wide Leg Jumpsuit',
                        subtitle: 'Cara'
                    }
                }
                link='http://aligent.com.au'
                linkTarget='_blank'
                prices={[
                    {
                        type: 'Regular',
                        value: '$139.99'
                    }
                ]}
                slotImage={(
                    <div className='product-slot productContainer-slot--ribbon product-slot productContainer-slot--ribbon--sale' key='ribbon'>
                        <p>Sale</p>
                    </div>
                )}
                slotDescription={(
                    <Fragment>
                        <div className='product-slot productContainer-slot--description'>
                            <p>Black</p>
                        </div>
                    </Fragment>
                )}
            />
        ));

        expect(productContainer3.find('.page-title').exists()).toEqual(true);
    });

    it('renders a price component when passed prices prop', () => {
        const productContainer3 = mount((
            <ProductContainer
                title={
                    {
                        title: 'Wide Leg Jumpsuit',
                        subtitle: 'Cara'
                    }
                }
                link='http://aligent.com.au'
                prices={[
                    {
                        type: 'Was',
                        value: '$139.99'
                    }, {
                        type: 'Sale',
                        value: '$119.99'
                    }
                ]}
            />
        ));

        expect(productContainer3.find('.price-wrapper').exists()).toEqual(true);
    });

    it('renders images when passed the images prop', () => {
        const productContainer4 = mount((
            <ProductContainer
                title={
                    {
                        title: 'Wide Leg Jumpsuit',
                        subtitle: 'Cara'
                    }
                }
                link='http://aligent.com.au'
                prices={[
                    {
                        type: 'Was',
                        value: '$139.99'
                    }, {
                        type: 'Sale',
                        value: '$119.99'
                    }
                ]}
                images={[
                    './img/product-fit-flare-1.jpg',
                    './img/product-fit-flare-2.jpg',
                    './img/product-fit-flare-3.jpg'
                ]}
            />
        ));

        expect(productContainer4.find('.product-slot--images img').length).toEqual(3);
    });
});
