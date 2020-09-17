import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BreadcrumbContainer from './BreadcrumbContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The Breadcrumb container', () => {
    it('renders a list of breadcrumbs without error', () => {
        const breadcrumbs1 = mount((
            <BreadcrumbContainer
                crumbs={[
                    {
                        title: 'Home',
                        link: '/'
                    }, {
                        title: 'About'
                    }
                ]}
            />
        ));

        expect(breadcrumbs1.find('.breadcrumb-list').exists()).toEqual(true);
    });
});
