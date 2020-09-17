import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RatingContainer from './RatingContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The Rating container component', () => {
    it('renders without error', () => {
        const rating1 = mount((
            <RatingContainer
                rating={3}
                icons={
                    {
                        type: 'text',
                        active: '⭐️'
                    }
                }
            />
        ));

        expect(rating1.find('.rating').exists()).toEqual(true);
    });

    it('renders a custom range when passed a max prop', () => {
        const rating2 = mount((
            <RatingContainer
                rating={3}
                max={10}
                icons={
                    {
                        type: 'text',
                        active: '⭐️'
                    }
                }
            />
        ));

        expect(rating2.find('.rating__icons__set--active .rating-icon').hostNodes().length).toEqual(10);
    });

    it('renders an icon as an image when passed the a type of "image" in the icons prop object', () => {
        const rating3 = mount((
            <RatingContainer
                rating={3}
                icons={
                    {
                        type: 'image',
                        active: 'star.svg'
                    }
                }
            />
        ));

        expect(rating3.find('.rating-icon img[src="star.svg"]').exists()).toEqual(true);
    });

    it('fires an onClick event', () => {
        let onClickCalled = false;
        const onClick = () => {
            onClickCalled = true;
        };

        const rating4 = mount((
            <RatingContainer
                rating={3}
                ratingHover={3}
                onClick={onClick}
                icons={
                    {
                        type: 'image',
                        active: 'star.svg'
                    }
                }
            />
        ));

        rating4.find('.rating-icon').first().prop('onClick')();

        expect(onClickCalled).toEqual(true);
    });

    it('fires an onMouseEnter event', () => {
        let onMouseEnterCalled = false;
        const onMouseEnter = () => {
            onMouseEnterCalled = true;
        };

        const rating5 = mount((
            <RatingContainer
                rating={3}
                ratingHover={3}
                onMouseEnter={onMouseEnter}
                icons={
                    {
                        type: 'text',
                        active: '🙂'
                    }
                }
            />
        ));

        rating5.find('.rating-icon').first().prop('onMouseEnter')();

        expect(onMouseEnterCalled).toEqual(true);
    });

    it('fires an onMouseLeave event', () => {
        let onMouseLeaveCalled = false;
        const onMouseLeave = () => {
            onMouseLeaveCalled = true;
        };

        const rating6 = mount((
            <RatingContainer
                rating={3}
                ratingHover={3}
                onMouseLeave={onMouseLeave}
                icons={
                    {
                        type: 'text',
                        active: '🙂'
                    }
                }
            />
        ));

        rating6.find('.rating').hostNodes().prop('onMouseLeave')();

        expect(onMouseLeaveCalled).toEqual(true);
    });

    it('renders an inactive icon set when passed an inactive object in the icons prop', () => {
        const rating7 = mount((
            <RatingContainer
                rating={3}
                max={10}
                icons={
                    {
                        type: 'text',
                        active: '🙂',
                        inactive: '🙁'
                    }
                }
            />
        ));

        expect(rating7.find('.rating__icons__set--inactive .rating-icon').at(0).text()).toEqual('🙁');
    });

    it('renders a default rating value of 0 when not passed a prop', () => {
        const rating8 = mount((
            <RatingContainer
                icons={
                    {
                        type: 'text',
                        active: '🌝'
                    }
                }
            />
        ));

        expect(rating8.find('.rating[data-rating=0]').exists()).toEqual(true);
    });

    it('renders a hover class on rating icons when ratingHover prop is passed', () => {
        const rating9 = mount((
            <RatingContainer
                rating={3}
                ratingHover={4}
                icons={
                    {
                        type: 'text',
                        active: '❤️'
                    }
                }
            />
        ));

        expect(rating9.find('.rating-icon--hover').exists()).toEqual(true);
    });

    it('does not render an inactive icon set when passed a null inactive object in the icons prop', () => {
        const rating10 = mount((
            <RatingContainer
                rating={3}
                icons={
                    {
                        type: 'text',
                        active: '❤️',
                        inactive: null
                    }
                }
            />
        ));

        expect(rating10.find('.rating__icons__set--inactive').exists()).toEqual(false);
    });

    it('renders a unique set of icons when passed as array through the icons prop', () => {
        const rating11 = mount((
            <RatingContainer
                rating={3}
                icons={
                    {
                        type: 'text',
                        active: [
                            '😭',
                            '☹️',
                            '😕',
                            '🙂',
                            '😄'
                        ]
                    }
                }
            />
        ));

        expect(rating11.find('.rating__icons__set--active .rating-icon[data-rating=1]').text()).toEqual('😭');
        expect(rating11.find('.rating__icons__set--active .rating-icon[data-rating=2]').text()).toEqual('☹️');
        expect(rating11.find('.rating__icons__set--active .rating-icon[data-rating=3]').text()).toEqual('😕');
        expect(rating11.find('.rating__icons__set--active .rating-icon[data-rating=4]').text()).toEqual('🙂');
        expect(rating11.find('.rating__icons__set--active .rating-icon[data-rating=5]').text()).toEqual('😄');
    });
});
