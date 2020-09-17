import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Title from './Title';

Enzyme.configure({ adapter: new Adapter() });

describe('The Title component', () => {
    it('renders without error', () => {
        const title1 = mount((
            <Title
                title='Title'
            />
        ));

        expect(title1.find('.page-title').exists()).toEqual(true);
    });

    it('renders a subtitle when passed the subtitle prop', () => {
        const title2 = mount((
            <Title
                title='Title'
                subtitle='Subtitle'
            />
        ));

        expect(title2.find('.page-title__subtitle').exists()).toEqual(true);
    });
});
