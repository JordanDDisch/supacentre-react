import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListContainer from './ListContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The List container', () => {
    it('renders without error', () => {
        const listContainer1 = mount((
            <ListContainer
                items={[
                    '<div>List item</div>',
                    '<div>List item</div>',
                    '<div>List item</div>',
                    '<div>List item</div>',
                    '<div>List item</div>'
                ]}
            />
        ));

        expect(listContainer1.find('.list').exists()).toEqual(true);
    });

    it('renders a class onto the list when a className prop is passed', () => {
        const listContainer2 = mount((
            <ListContainer
                items={[
                    '<div>List item</div>',
                    '<div>List item</div>',
                    '<div>List item</div>',
                    '<div>List item</div>',
                    '<div>List item</div>'
                ]}
                className='product'
            />
        ));

        expect(listContainer2.find('.list.list--product').exists()).toEqual(true);
    });
});
