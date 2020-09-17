import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rating from './Rating';

Enzyme.configure({ adapter: new Adapter() });

describe('The Rating component', () => {
    it('renders without error', () => {
        const rating1 = mount((
            <Rating
                rating={3}
                icons={
                    [
                        (
                            <div
                                key={1}
                                className='rating__icons__set rating__icons__set--active'
                                style={
                                    { width: '60%' }
                                }
                            >
                                <span data-rating='1' className='rating-icon'>
                                    <span role="img" aria-label="crying">😭</span>
                                </span>
                                <span data-rating='2' className='rating-icon'>
                                    <span role="img" aria-label="sad">☹</span>
                                ️</span>
                                <span data-rating='3' className='rating-icon'>
                                    <span role="img" aria-label="crap">😕</span>
                                </span>
                                <span data-rating='4' className='rating-icon'>
                                    <span role="img" aria-label="simle">🙂</span>
                                </span>
                                <span data-rating='5' className='rating-icon'>
                                    <span role="img" aria-label="happy">😄</span>
                                </span>
                            </div>
                        ), (
                            <div
                                key={2}
                                className='rating__icons__set rating__icons__set--inactive'
                                style={
                                    { width: '40%' }
                                }
                            >
                                <span data-rating='1' className='rating-icon'>
                                    <span role="img" aria-label="crying">😭</span>
                                </span>
                                <span data-rating='2' className='rating-icon'>
                                    <span role="img" aria-label="sad">☹</span>
                                ️</span>
                                <span data-rating='3' className='rating-icon'>
                                    <span role="img" aria-label="crap">😕</span>
                                </span>
                                <span data-rating='4' className='rating-icon'>
                                    <span role="img" aria-label="simle">🙂</span>
                                </span>
                                <span data-rating='5' className='rating-icon'>
                                    <span role="img" aria-label="happy">😄</span>
                                </span>
                            </div>
                        )
                    ]
                }
            />
        ));

        expect(rating1.find('.rating').exists()).toEqual(true);
    });

    it('renders a default rating prop as 0 when not supplied', () => {
        const rating2 = mount((
            <Rating
                icons={
                    [
                        (
                            <div
                                key={1}
                                className='rating__icons__set rating__icons__set--active'
                                style={
                                    { width: '60%' }
                                }
                            >
                                <span data-rating='1' className='rating-icon'>
                                    <span role="img" aria-label="crying">😭</span>
                                </span>
                                <span data-rating='2' className='rating-icon'>
                                    <span role="img" aria-label="sad">☹</span>
                                ️</span>
                                <span data-rating='3' className='rating-icon'>
                                    <span role="img" aria-label="crap">😕</span>
                                </span>
                                <span data-rating='4' className='rating-icon'>
                                    <span role="img" aria-label="simle">🙂</span>
                                </span>
                                <span data-rating='5' className='rating-icon'>
                                    <span role="img" aria-label="happy">😄</span>
                                </span>
                            </div>
                        ), (
                            <div
                                key={2}
                                className='rating__icons__set rating__icons__set--inactive'
                                style={
                                    { width: '40%' }
                                }
                            >
                                <span data-rating='1' className='rating-icon'>
                                    <span role="img" aria-label="crying">😭</span>
                                </span>
                                <span data-rating='2' className='rating-icon'>
                                    <span role="img" aria-label="sad">☹</span>
                                ️</span>
                                <span data-rating='3' className='rating-icon'>
                                    <span role="img" aria-label="crap">😕</span>
                                </span>
                                <span data-rating='4' className='rating-icon'>
                                    <span role="img" aria-label="simle">🙂</span>
                                </span>
                                <span data-rating='5' className='rating-icon'>
                                    <span role="img" aria-label="happy">😄</span>
                                </span>
                            </div>
                        )
                    ]
                }
            />
        ));

        expect(rating2.find('.rating[data-rating=0]').exists()).toEqual(true);
    });

    it('renders a default max prop as 5 when not supplied', () => {
        const rating2 = mount((
            <Rating
                icons={
                    [
                        (
                            <div
                                key={1}
                                className='rating__icons__set rating__icons__set--active'
                                style={
                                    { width: '60%' }
                                }
                            >
                                <span data-rating='1' className='rating-icon'>
                                    <span role="img" aria-label="crying">😭</span>
                                </span>
                                <span data-rating='2' className='rating-icon'>
                                    <span role="img" aria-label="sad">☹</span>
                                ️</span>
                                <span data-rating='3' className='rating-icon'>
                                    <span role="img" aria-label="crap">😕</span>
                                </span>
                                <span data-rating='4' className='rating-icon'>
                                    <span role="img" aria-label="simle">🙂</span>
                                </span>
                                <span data-rating='5' className='rating-icon'>
                                    <span role="img" aria-label="happy">😄</span>
                                </span>
                            </div>
                        ), (
                            <div
                                key={2}
                                className='rating__icons__set rating__icons__set--inactive'
                                style={
                                    { width: '40%' }
                                }
                            >
                                <span data-rating='1' className='rating-icon'>
                                    <span role="img" aria-label="crying">😭</span>
                                </span>
                                <span data-rating='2' className='rating-icon'>
                                    <span role="img" aria-label="sad">☹</span>
                                ️</span>
                                <span data-rating='3' className='rating-icon'>
                                    <span role="img" aria-label="crap">😕</span>
                                </span>
                                <span data-rating='4' className='rating-icon'>
                                    <span role="img" aria-label="simle">🙂</span>
                                </span>
                                <span data-rating='5' className='rating-icon'>
                                    <span role="img" aria-label="happy">😄</span>
                                </span>
                            </div>
                        )
                    ]
                }
            />
        ));

        expect(rating2.find('.rating[data-rating-max=5]').exists()).toEqual(true);
    });
});
