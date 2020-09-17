import React, { Fragment } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductContainer from './../ProductContainer/ProductContainer';
import ListLoaderContainer from './ListLoaderContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The List container', () => {
    it('renders without error', () => {
        const ListLoaderContainer1 = mount((
            <ListLoaderContainer
                page={1}
                name="list-loader-test"
                fetchItems={() => {}}
                isLoading={false}
                numberOfItems={1}
                items={[
                    <ProductContainer
                        key={1}
                        images={[
                            './img/product-fit-flare-1.jpg'
                        ]}
                        title={
                            {
                                title: 'Fit and Flare Dress',
                                subtitle: 'Robyn Boucle'
                            }
                        }
                        link='http://aligent.com.au'
                        prices={[
                            {
                                type: 'Regular',
                                value: '$139.99'
                            }
                        ]}
                        slotDescription={(
                            <Fragment>
                                <div className='product-slot product-slot--link'>
                                    <p>
                                        <a
                                            href='http://aligent.com.au'
                                        >
                                            <span>View product</span>
                                        </a>
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    />,
                    <ProductContainer
                        key={2}
                        images={[
                            './img/product-holland-1.jpg'
                        ]}
                        title={
                            {
                                title: 'Embroidered Dress',
                                subtitle: 'Holland'
                            }
                        }
                        link='http://aligent.com.au'
                        prices={[
                            {
                                type: 'Regular',
                                value: '$169.99'
                            }
                        ]}
                        slotDescription={(
                            <Fragment>
                                <div className='product-slot product-slot--link'>
                                    <p>
                                        <a
                                            href='http://aligent.com.au'
                                        >
                                            <span>View product</span>
                                        </a>
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    />,
                    <ProductContainer
                        key={3}
                        images={[
                            './img/product-louise-1.jpg'
                        ]}
                        title={
                            {
                                title: 'Embroidered Jacquard Dress',
                                subtitle: 'Louise'
                            }
                        }
                        link='http://aligent.com.au'
                        prices={[
                            {
                                type: 'Regular',
                                value: '$159.99'
                            }, {
                                type: 'Sale',
                                value: '$79.99'
                            }
                        ]}
                        slotImage={(
                            <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--50-percent'>
                                <p><span>50%</span> off</p>
                            </div>
                        )}
                        slotDescription={(
                            <Fragment>
                                <div className='product-slot product-slot--link'>
                                    <p>
                                        <a
                                            href='http://aligent.com.au'
                                        >
                                            <span>View product</span>
                                        </a>
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    />,
                    <ProductContainer
                        key={4}
                        images={[
                            './img/product-stassi-1.jpg'
                        ]}
                        title={
                            {
                                title: 'Pointelle Flare Sleeve Dress',
                                subtitle: 'Stassi'
                            }
                        }
                        link='http://aligent.com.au'
                        prices={[
                            {
                                type: 'Regular',
                                value: '$139.99'
                            }, {
                                type: 'Sale',
                                value: '$119.99'
                            }
                        ]}
                        slotImage={(
                            <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--sale'>
                                <p>Sale</p>
                            </div>
                        )}
                        slotDescription={(
                            <Fragment>
                                <div className='product-slot product-slot--link'>
                                    <p>
                                        <a
                                            href='http://aligent.com.au'
                                        >
                                            <span>View product</span>
                                        </a>
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    />,
                    <ProductContainer
                        key={5}
                        images={[
                            './img/product-cara-1.jpg'
                        ]}
                        title={
                            {
                                title: 'Wide Leg Jumpsuit',
                                subtitle: 'Cara'
                            }
                        }
                        link='http://aligent.com.au'
                        prices={[
                            {
                                type: 'Regular',
                                value: '$139.99'
                            }
                        ]}
                        slotDescription={(
                            <Fragment>
                                <div className='product-slot product-slot--link'>
                                    <p>
                                        <a
                                            href='http://aligent.com.au'
                                        >
                                            <span>View product</span>
                                        </a>
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    />,
                    <ProductContainer
                        key={6}
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
                                value: '$129.99'
                            }, {
                                type: 'Sale',
                                value: '$99.99'
                            }
                        ]}
                        slotImage={(
                            <div className='product-slot product-slot--ribbon product-slot product-slot--ribbon--sale'>
                                <p>Sale</p>
                            </div>
                        )}
                        slotDescription={(
                            <Fragment>
                                <div className='product-slot product-slot--link'>
                                    <p>
                                        <a
                                            href='http://aligent.com.au'
                                        >
                                            <span>View product</span>
                                        </a>
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    />
                ]}
            />
        ));

        expect(ListLoaderContainer1.find('.list').exists()).toEqual(true);
        expect(ListLoaderContainer1.find('.list__item').length).toEqual(6);
    });
});
