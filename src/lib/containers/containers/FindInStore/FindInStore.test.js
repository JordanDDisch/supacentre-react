import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FindInStore from './FindInStore';

Enzyme.configure({ adapter: new Adapter() });

const stockists = [
    {
        id: 1,
        name: 'Aligent Consulting',
        address: {
            street: '14 Stamford Ct',
            suburub: 'Adelaide',
            state: 'SA',
            postcode: '5000'
        },
        click_and_collect_available: true,
        product_stock: [
            {
                product_id: '1',
                stock_level: '10'
            },
            {
                product_id: '5',
                stock_level: '2'
            },
            {
                product_id: '25',
                stock_level: '5'
            }
        ],
        is_featured: true,
        distance: '1.2',
        additional_info: {
            label: 'Opening Hours',
            value: 'Mon-Fri:9am-5pm'
        }
    },
    {
        id: 2,
        name: 'Old Aligent Consulting',
        address: {
            street: 'Flinders St',
            suburub: 'Adelaide',
            state: 'SA',
            postcode: '5000'
        },
        click_and_collect_available: false,
        product_stock: [
            {
                product_id: '1',
                stock_level: '0'
            },
            {
                product_id: '5',
                stock_level: '0'
            },
            {
                product_id: '25',
                stock_level: '0'
            }
        ],
        is_featured: false,
        distance: '2.2',
        additional_info: {
            label: 'Opening Hours',
            value: 'Mon-Fri:10am-1pm'
        }
    }
];

it('Renders without error', () => {
    const findInStore = mount(<FindInStore stockists={[]} handleSearch={() => {}} errorMessage="Some items aren't available for click & collect"/>);

    expect(findInStore.find('input#find-in-store-search-suburb').exists()).toEqual(true);
});

it('can hide stockists with no stock, then reinstate original stockists again', () => {
    const findInStore = mount(<FindInStore stockists={stockists} handleSearch={() => {}} errorMessage="Some items aren't available for click & collect"/>);

    // Simulate hiding stockists with no stock
    findInStore.instance().handleToggleNoStock({ target: { checked: true } });
    expect(findInStore.state().featuredStores.length).toEqual(1);
    expect(findInStore.state().stores.length).toEqual(0);

    // Simulate showing all stockists again
    findInStore.instance().handleToggleNoStock({ target: { checked: false } });
    expect(findInStore.state().featuredStores.length).toEqual(1);
    expect(findInStore.state().stores.length).toEqual(1);
});

it('tracks value entered into the suburb field', () => {
    const findInStore = mount(<FindInStore stockists={[]} handleSearch={() => {}} errorMessage="Some items aren't available for click & collect"/>);

    findInStore.find('input#find-in-store-search-suburb')
        .simulate('change', {
            target: { value: '5000' }
        });

    expect(findInStore.state().suburb).toEqual('5000');
});

it('calls handleSearch function when button clicked', () => {
    let isCalled = false;

    const handleSearch = () => {
        isCalled = true;
    };

    const findInStore = mount(<FindInStore stockists={[]} handleSearch={handleSearch} errorMessage="Some items aren't available for click & collect"/>);

    findInStore.find('input#find-in-store-search-suburb')
        .simulate('change', {
            target: { value: '5000' }
        });

    findInStore.find('button.find-in-store__search-btn')
        .simulate('submit');

    expect(isCalled).toBe(true);
});

it('passes suburb through to handleSearchSuburb function', () => {
    let suburb = '';

    const handleSearch = ({ search }) => {
        suburb = search;
    };

    const findInStore = mount(<FindInStore stockists={[]} handleSearch={handleSearch} errorMessage="Some items aren't available for click & collect"/>);

    findInStore.find('input#find-in-store-search-suburb')
        .simulate('change', {
            target: { value: '5000' }
        });

    findInStore.find('.find-in-store__form').simulate('submit');

    expect(suburb).toBe('5000');
});

it('passes object of coordinates when geolocate function is called', () => {
    const coords = {
        lat: '35',
        lng: '-135'
    };
    let resultCoords;

    const handleSearch = ({ search }) => {
        resultCoords = search;
    };

    const findInStore = mount(<FindInStore stockists={[]} handleSearch={handleSearch} errorMessage="Some items aren't available for click & collect"/>);

    findInStore.instance().handleGeolocate({
        coords
    });

    expect(resultCoords).toEqual(coords);
});
