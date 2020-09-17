/**
 * FindInStore React Component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, StoreDetailsContainer, GeolocateButton } from './../../index';

class FindInStore extends Component {

    constructor(props) {
        super(props);

        const featuredStores = FindInStore.ParseStores(props.stockists, true);
        const stores = FindInStore.ParseStores(props.stockists, false);

        this.state = {
            suburb: '',
            hideNoStock: false,
            selectedStoreId: '',
            featuredStores,
            stores
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            featuredStores: FindInStore.ParseStores(props.stockists, true, state.hideNoStock),
            stores: FindInStore.ParseStores(props.stockists, false, state.hideNoStock)
        };
    }

    /**
     * Parse the provided store list, returning either only regular stockists, or only features stockists
     *
     * @param {Array} stockists  Array of stockists to be parsed
     * @param {boolean} isFeatured [Optional] True/false indicating if returning featured or regular stockists
     * @param hideNoStock
     * @returns {Array}
     */
    static ParseStores(stockists, isFeatured = false, hideNoStock = false) {
        const parsedStockists = stockists.filter((store) => !!store.is_featured === isFeatured);
        return hideNoStock ? FindInStore.FilterStoresWithNoStock(parsedStockists) : parsedStockists;
    }

    /**
     * Loop through product stock associated with each store, and return only the stores that have stock for each
     * item, and therefore can fullfill Click and Collect for all items
     *
     * @param {Array} stores Array of stores to be filtered
     *
     * @returns {Array}
     */
    static FilterStoresWithNoStock(stores) {
        return stores.filter((store) => {
            // Find all stores that have a product with stock level 0
            return store.product_stock.filter((stock) => {
                return parseInt(stock.stock_level, 10) <= 0;
            }).length === 0; // Return only stores that don't find a product with stock level 0
        });
    }

    /**
     *
     * @param storeId
     *
     * @returns {null}
     */
    setSelectedStore = (storeId) => {
        this.setState({
            selectedStoreId: storeId
        });
        this.props.onSelectStore(storeId);
    };

    setSuburb = (suburb) => {
        this.setState({
            suburb
        });
    };

    handleInputChange = (e) => {
        this.setState({
            ...this.state,
            suburb: e.target.value
        });
    };

    handleStoreSelected = (e) => {
        this.setState({
            ...this.state,
            selectedStoreId: e.target.value
        });

        this.props.onSelectStore(e.target.value);
    };

    handleSearchSuburb = (e) => {
        e.preventDefault();

        this.props.handleSearch({
            search: this.state.suburb
        });
    };

    handleGeolocate = ({ coords }) => {
        this.props.handleSearch({
            search: coords
        });
    };

    handleToggleNoStock = (e) => {
        const hideNoStock = e.target.checked;

        this.setState({
            ...this.state,
            hideNoStock,
            selectedStoreId: -1,
            featuredStores: FindInStore.ParseStores(this.props.stockists, true, hideNoStock),
            stores: FindInStore.ParseStores(this.props.stockists, false, hideNoStock)
        });
    };

    renderStores(stores) {
        if (stores.length === 0) {
            return null;
        }

        return (
            <section className="find-in-store__stores">
                {stores.map((store, index) => {
                    return (
                        <StoreDetailsContainer
                            {...store}
                            key={index}
                            distance={store.distance}
                            onChange={this.handleStoreSelected}
                            isSelected={this.state.selectedStoreId === store.id.toString()}
                            errorMessage={this.props.errorMessage}
                        />
                    );
                })}
            </section>
        );
    }

    render() {
        return (
            <div className="find-in-store">
                <p className="find-in-store__instruction">{this.props.searchInstruction}</p>
                <form onSubmit={this.handleSearchSuburb} className="find-in-store__form">
                    <InputContainer
                        id="find-in-store-search-suburb"
                        label={this.props.searchLabel}
                        value={this.state.suburb}
                        placeholder={this.props.searchPlaceholder}
                        onChange={this.handleInputChange}
                        isValid={true}
                    />
                    <div className="find-in-store__actions">
                        <button type="submit" className="find-in-store__search-btn">Search</button>
                        <GeolocateButton handleGeolocation={this.handleGeolocate}/>
                    </div>
                    <div className="hide-no-stock-container">
                        <input type="checkbox" id="hide-no-stock" onChange={this.handleToggleNoStock} className="checkbox"/>
                        <label htmlFor="hide-no-stock">Hide stores with no stock</label>
                    </div>
                </form>
                {this.renderStores(this.state.featuredStores)}
                {this.renderStores(this.state.stores)}
            </div>
        );
    }

}

FindInStore.propTypes = {
    stockists: PropTypes.array.isRequired,
    handleSearch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onSelectStore: PropTypes.func,
    searchInstruction: PropTypes.string,
    searchLabel: PropTypes.string,
    searchPlaceholder: PropTypes.string
};

FindInStore.defaultProps = {
    searchInstruction: 'Find your nearest store',
    searchLabel: 'Suburb',
    searchPlaceholder: 'Enter Suburb...'
};

export default FindInStore;
