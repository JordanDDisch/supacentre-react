import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RatingIcon from './RatingIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('The Rating icon component', () => {
    it('renders without error', () => {
        const ratingIcon1 = mount((
            <RatingIcon ratingIndex={1}>
                { '⭐️' }
            </RatingIcon>
        ));

        expect(ratingIcon1.exists()).toEqual(true);
    });
});
