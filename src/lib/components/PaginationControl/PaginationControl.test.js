import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaginationControl from './PaginationControl';

Enzyme.configure({ adapter: new Adapter() });

describe('The Pagination Control component', () => {
    it('renders without error', () => {
        const paginationControl1 = mount((
            <PaginationControl>Page 1</PaginationControl>
        ));

        expect(paginationControl1.find('.pagination__control').exists()).toEqual(true);
    });

    it('fires an onClick function where passed an onClick prop', () => {
        let onClickCalled = false;
        const onClick = () => {
            onClickCalled = true;
        };

        const paginationControl2 = mount((
            <PaginationControl
                onClick={onClick}
            >
                Page 1
            </PaginationControl>
        ));

        paginationControl2.find('.pagination__button').hostNodes().simulate('click');

        expect(onClickCalled).toEqual(true);
    });

    it('renders a single custom className when passed a string as a className prop', () => {
        const paginationControl3 = mount((
            <PaginationControl
                className='custom'
            >
                Page 1
            </PaginationControl>
        ));

        expect(paginationControl3.find('.pagination__control--custom').exists()).toEqual(true);
    });

    it('renders multiple custom classNames when passed an array of strings as a className prop', () => {
        const paginationControl4 = mount((
            <PaginationControl
                className={[
                    'custom1',
                    'custom2'
                ]}
            >
                Page 1
            </PaginationControl>
        ));

        expect(paginationControl4.find('.pagination__control--custom1').exists()).toEqual(true);
        expect(paginationControl4.find('.pagination__control--custom2').exists()).toEqual(true);
    });

    it('renders the control as a noninteractive span if isSelected prop is set to true', () => {
        const paginationControl5 = mount((
            <PaginationControl
                isSelected={true}
            >
                Page 1
            </PaginationControl>
        ));

        expect(paginationControl5.find('span.pagination__text').exists()).toEqual(true);
    });

    it('renders the control with a disabled className and attribute if isDisabled prop is set to true', () => {
        const paginationControl6 = mount((
            <PaginationControl
                isDisabled={true}
            >
                Page 1
            </PaginationControl>
        ));

        expect(paginationControl6.find('.pagination__control--disabled').exists()).toEqual(true);
        expect(paginationControl6.find('.pagination__button[disabled]').exists()).toEqual(true);
    });

    it('renders the control with a hidden className if isHidden prop is set to true', () => {
        const paginationControl7 = mount((
            <PaginationControl
                isHidden={true}
            >
                Page 1
            </PaginationControl>
        ));

        expect(paginationControl7.find('.pagination__control--hidden').exists()).toEqual(true);
    });

    it('renders the control with a title attribute if passed a title prop', () => {
        const paginationControl8 = mount((
            <PaginationControl
                title='A title'
            >
                Page 1
            </PaginationControl>
        ));

        expect(paginationControl8.find('.pagination__button[title=\'A title\']').exists()).toEqual(true);
    });
});
