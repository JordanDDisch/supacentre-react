import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListContainer from './../ListContainer/ListContainer';
import { collateModifierClasses } from './../../utils/helpers';

require('intersection-observer'); // Polyfill

/**
 * ListLoaderContainer React Component
 */
class ListLoaderContainer extends Component {

    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    componentDidMount() {
        const {
            page,
            name,
            mode,
            isLoading,
            fetchItems
        } = this.props;

        // On mount, fetch first page of items
        fetchItems(name, page, mode);

        this.infiniteScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!isLoading && entry.isIntersecting) {
                    fetchItems(name, this.props.page + 1, mode);
                }
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        return (
            nextProps.page !== this.props.page
            || nextProps.itemsPerPage !== this.props.itemsPerPage
            || nextProps.isLoading !== this.props.isLoading
        );
    }

    componentDidUpdate() {
        const {
            page,
            isLoading,
            hasMorePages,
            mode,
            infiniteScrollPageLimit
        } = this.props;

        // TODO: Surely this logic can be simplified?
        //
        // If in infinite loading mode,
        // and not in loading state,
        // perform intersectionObserver binding
        if (
            mode === 'infinite'
            && !isLoading
        ) {
            // If an observer is already watching,
            // and no scroll limit set, or at scroll limit,
            // unobserve outdated last item
            if (
                this.lastItem
                && (!infiniteScrollPageLimit || page === infiniteScrollPageLimit)
            ) {
                this.infiniteScrollObserver.unobserve(this.lastItem);
            }

            // If list has more pages to load,
            // and no scroll limit set, or not at scroll limit,
            // observe new last item
            if (
                hasMorePages
                && (!infiniteScrollPageLimit || page < infiniteScrollPageLimit)
            ) {
                this.lastItem = this.listRef.current.querySelector('.list').lastElementChild;
                this.infiniteScrollObserver.observe(this.lastItem);
            }
        }
    }

    render() {
        const {
            items,
            page,
            name,
            className,
            fetchItems,
            isLoading,
            numberOfItems,
            hasMorePages,
            endMessage,
            mode,
            loadingIndicator,
            loadMore,
            infiniteScrollPageLimit,
            customControls
        } = this.props;


        const listLoaderModifier = 'list-loader--';

        const listLoaderClass = classNames('list-loader', {
            [`${listLoaderModifier}loading`]: isLoading,
            [`${listLoaderModifier}${mode}`]: mode
        }, collateModifierClasses(className, listLoaderModifier));

        return (
            <div className={listLoaderClass}>
                <div
                    ref={this.listRef}
                    className='list-loader__list'
                >
                    <ListContainer items={items} className={className} />
                </div>

                {
                    hasMorePages && !isLoading && (mode === 'step' || page >= infiniteScrollPageLimit)
                 && (
                    <div className='list-loader__trigger'>
                        <button
                            onClick={() => fetchItems(name, page + 1, mode)}
                            className='list-loader__load-more'
                        >
                            {loadMore}
                        </button>
                    </div>
                )}

                {
                    numberOfItems > 0 && mode === 'custom' && customControls
                 && (
                    <div className='list-loader__custom-controls'>
                        { customControls }
                    </div>
                )}

                {isLoading && (
                    <div className='list-loader__indicator'>
                        {loadingIndicator}
                    </div>
                )}

                {!isLoading && !hasMorePages && endMessage && (
                    <div className='list-loader__end-message'>
                        {endMessage}
                    </div>
                )}
            </div>
        );
    }

}

ListLoaderContainer.defaultProps = {
    mode: 'step',
    loadingIndicator: <p>Loading...</p>,
    loadMore: 'Load more',
    itemsPerPage: 12
};

ListLoaderContainer.propTypes = {
    // List container component data to be loaded
    items: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.element
    ]).isRequired,
    // Current page number
    page: PropTypes.number.isRequired,
    // Unique name of listLoader - passed in fetchItems call
    name: PropTypes.string.isRequired,
    // Custom class names to add to root div
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    // Function call to fetch the next page of list items
    fetchItems: PropTypes.func.isRequired,
    // Loading state set during fetchItems call
    isLoading: PropTypes.bool.isRequired,
    // Total number of items in list
    numberOfItems: PropTypes.number.isRequired,
    // Number of items to display per page
    // Default: 12
    itemsPerPage: PropTypes.number,
    // Boolean representing if list loader has more pages left to display
    hasMorePages: PropTypes.bool,
    // Message displayed when no more results left to display
    endMessage: PropTypes.node,
    // Loading mode
    // Default: step
    mode: PropTypes.oneOf([
        'step',
        'infinite',
        'custom'
    ]),
    // The loading indicator displayed while items are being fetched
    // Default: (<p>Loading...</p>)
    loadingIndicator: PropTypes.node,
    // Load More button button displayed in 'step' mode
    // Default: 'Load more'
    loadMore: PropTypes.node,
    // Pages load limit in 'infinite' scrolling mode before
    // changing to 'step' mode behaviour
    infiniteScrollPageLimit: PropTypes.number,
    // Custom control object
    customControls: PropTypes.node
};

export default ListLoaderContainer;
