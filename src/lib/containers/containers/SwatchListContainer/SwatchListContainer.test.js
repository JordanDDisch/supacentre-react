import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SwatchListContainer from './SwatchListContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The swatch list container', () => {
    it('renders without error', () => {
        const swatchListContainer = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                name='swatchList2'
                title={<h3>Color</h3>}
                onClick={() => {}}
            />
        ));

        expect(swatchListContainer.find('.swatch').hostNodes().length).toEqual(4);
    });

    it('renders a noSelectionLabel title if no swatch is selected and noSelectionLabel prop passed', () => {
        const swatchListContainer2 = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                name='swatchList2'
                title={<h3>Color</h3>}
                noSelectionLabel='Select a color'
            />
        ));

        expect(swatchListContainer2.find('.swatch-list-header__selected').text()).toEqual('Select a color');
    });


    it('renders a swatch label title if a swatch is selected', () => {
        const swatchListContainer3 = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                name='swatchList2'
                title={<h3>Color</h3>}
                selectedSwatch='swatch-item-7'
                noSelectionLabel='Select a color'
            />
        ));

        expect(swatchListContainer3.find('.swatch-list-header__selected').text()).toEqual('Green');
    });

    it('Does not render a noSelectionLabel title if no swatch is selected and no noSelectionLabel prop passed', () => {
        const swatchListContainer4 = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                name='swatchList2'
                title={<h3>Color</h3>}
            />
        ));

        expect(swatchListContainer4.find('.swatch-list-header__selected').exists()).toEqual(false);
    });

    it('renders a list title if a title prop is passed', () => {
        const swatchListContainer5 = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                name='swatchList2'
                title={<h3>Color</h3>}
            />
        ));

        expect(swatchListContainer5.find('.swatch-list-header__title').text()).toEqual('Color');
    });

    it('does not render a list title if no title prop is passed', () => {
        const swatchListContainer6 = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                name='swatchList2'
            />
        ));

        expect(swatchListContainer6.find('.swatch-list-header__title').exists()).toEqual(false);
    });

    it('renders a list item with selected class if isSelected prop set to true', () => {
        const swatchListContainer7 = mount(
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                selectedSwatch='swatch-item-6'
                name='swatchList2'
                title={<h3>Color</h3>}
            />
        );

        expect(swatchListContainer7.find('.swatch-list__item').at(1).hasClass('swatch-list__item--selected')).toEqual(true);
    });


    it('renders list item with disabled class if isDisabled prop set to true', () => {
        const swatchListContainer8 = mount((
            <SwatchListContainer
                swatches={[
                    {
                        id: 'swatch-item-5',
                        label: 'Yellow',
                        backgroundColor: '#fdff75'
                    }, {
                        id: 'swatch-item-6',
                        label: 'Aqua',
                        backgroundColor: 'aqua'
                    }, {
                        id: 'swatch-item-7',
                        label: 'Green',
                        backgroundColor: '#75ffaf'
                    }, {
                        id: 'swatch-item-8',
                        label: 'Red',
                        backgroundColor: '#ff8f75'
                    }
                ]}
                disabledSwatches={[
                    'swatch-item-6',
                    'swatch-item-8'
                ]}
                name='swatchList2'
                title={<h3>Color</h3>}
            />
        ));

        expect(swatchListContainer8.find('.swatch-list__item').at(1).hasClass('swatch-list__item--disabled')).toEqual(true);
        expect(swatchListContainer8.find('.swatch-list__item').at(3).hasClass('swatch-list__item--disabled')).toEqual(true);
    });
});
