import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaginationContainer from './PaginationContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('PaginationContainer', () => {
    it('Renders without error', () => {
        const paginationContainer = mount(
            <PaginationContainer
                page={1}
                name="test-pagination"
                onClick={() => {}}
                numberOfItems={4}
            />
        );

        expect(paginationContainer.find('.pagination__page-numbers__list').exists()).toEqual(true);
        expect(paginationContainer.find('.pagination__control').length).toEqual(3);
    });

    it('Shows with next & prev buttons', () => {
        const paginationContainer = mount(
            <PaginationContainer
                page={1}
                name="test-pagination"
                onClick={() => {}}
                numberOfItems={4}
                itemsPerPage={1}
            />
        );

        expect(paginationContainer.find('.pagination__page-numbers__list').exists()).toEqual(true);
        expect(paginationContainer.find('.pagination__control').length).toEqual(6);
    });

    it('Manually Hide next & prev buttons', () => {
        const paginationContainer = mount(
            <PaginationContainer
                page={1}
                name="test-pagination"
                onClick={() => {}}
                numberOfItems={4}
                itemsPerPage={1}
                prevNextControls={false}
                startEndControls={false}
            />
        );

        expect(paginationContainer.find('.pagination__page-numbers__list').exists()).toEqual(true);
        expect(paginationContainer.find('.pagination__control').length).toEqual(4);
    });

    it('Can set text of controls', () => {
        const paginationContainer = mount(
            <PaginationContainer
                page={1}
                name="test-pagination"
                onClick={() => {}}
                numberOfItems={4}
                itemsPerPage={1}
                prevControl="Prev"
                nextControl="Next"
                startEndControls={true}
                startControl="First"
                endControl="Last"
            />
        );

        expect(paginationContainer.find('.pagination__page-numbers__list').exists()).toEqual(true);
        expect(paginationContainer.find('.pagination__control').length).toEqual(8);
        expect(paginationContainer.find('.pagination__control .pagination__text').length).toEqual(1);
        expect(paginationContainer.find('.pagination__control .pagination__button').at(0).text()).toEqual('First');
        expect(paginationContainer.find('.pagination__control .pagination__button').at(1).text()).toEqual('Prev');
        expect(paginationContainer.find('.pagination__control .pagination__button').at(5).text()).toEqual('Next');
        expect(paginationContainer.find('.pagination__control .pagination__button').at(6).text()).toEqual('Last');
    });

    it('Can set controls to node', () => {
        const control = <span>{'control'}</span>;
        const paginationContainer = mount(
            <PaginationContainer
                page={1}
                name="test-pagination"
                onClick={() => {}}
                numberOfItems={1}
                itemsPerPage={1}
                prevControl={control}
                nextControl={control}
            />
        );

        expect(paginationContainer.find('.pagination__page-numbers__list').exists()).toEqual(true);
        expect(paginationContainer.find('.pagination__control').length).toEqual(3);
        expect(paginationContainer.find('.pagination__control .pagination__button span').at(0).matchesElement(control)).toEqual(true);
        expect(paginationContainer.find('.pagination__control .pagination__button span').at(1).matchesElement(control)).toEqual(true);
    });

    it('Shows page count', () => {
        const paginationContainer = mount(
            <PaginationContainer
                page={1}
                name="test-pagination"
                onClick={() => {}}
                numberOfItems={4}
                itemsPerPage={1}
                showPageCount={true}
            />
        );

        //     <div className='pagination__page-number'>
        //     <p>Page {page} of {this.state.totalPages}</p>
        // </div>

        expect(paginationContainer.find('.pagination__page-number').exists()).toEqual(true);
        expect(paginationContainer.find('.pagination__page-number p').text()).toEqual('Page 1 of 4');
    });
});
