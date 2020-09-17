import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PaginationControl from './../../components/PaginationControl/PaginationControl';

/**
 * PaginationContainer React Component
 */
class PaginationContainer extends Component {

    constructor(props) {
        super(props);
        this.pageNumbersRef = React.createRef();

        this.state = {
            containerWidth: 0,
            totalPages: 0,
            pagesFrom: 0,
            pagesTo: 0
        };
    }

    // Sets container width of visible pagination controls
    setContainerWidth = () => {
        let containerWidth = 0;

        this.pageNumbersRef.current.childNodes.forEach((pageControl, index) => {
            const pageNumber = index + 1;
            if (
                pageNumber >= this.state.pagesFrom
                && pageNumber <= this.state.pagesTo
            ) {
                containerWidth += pageControl.offsetWidth;
            }
        });

        this.setState({
            ...this.state,
            containerWidth
        });
    }

    static getDerivedStateFromProps(props, state) {
        const {
            page,
            numberOfItems,
            itemsPerPage,
            controlLimit
        } = props;

        // Set page ranges
        const totalPages = Math.ceil(numberOfItems / itemsPerPage);

        const pagesFrom = Math.max(1, Math.min(
            totalPages - controlLimit + 1,
            page - Math.ceil((controlLimit - 1) / 2)
        ));

        const pagesTo = Math.min(totalPages, pagesFrom + controlLimit - 1);

        if (
            totalPages !== state.totalPages
            || pagesFrom !== state.pagesFrom
            || pagesTo !== state.pagesTo
        ) {
            return {
                totalPages,
                pagesFrom,
                pagesTo
            };
        }

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps !== this.props
            || nextState.containerWidth !== this.state.containerWidth
            || nextState.totalPages !== this.state.totalPages
            || nextState.pagesFrom !== this.state.pagesFrom
            || nextState.pagesTo !== this.state.pagesTo
        );
    }

    componentDidMount() {
        this.setContainerWidth();
    }

    render() {
        const {
            page,
            name,
            onClick,
            prevNextControls,
            startEndControls,
            prevControl,
            nextControl,
            startControl,
            endControl,
            isAnimated,
            isDisabled,
            showPageCount
        } = this.props;

        const pages = Array.from(new Array(this.state.totalPages), (val, index) => index + 1);

        const visiblePages = pages.filter((pageNumber) => {
            return (
                pageNumber >= this.state.pagesFrom
                && pageNumber <= this.state.pagesTo
            );
        });

        const transformOffset = isAnimated ? -((this.state.pagesFrom - 1) / this.state.totalPages) * 100 : null;

        const paginationClass = classNames('pagination', {
            'pagination--animated': isAnimated
        });

        return (
            <div
                className={paginationClass}
            >
                <div className='pagination__controls'>

                    {startEndControls && (
                        <PaginationControl
                            title='First page'
                            onClick={() => onClick(name, 1)}
                            className='start'
                            isDisabled={isDisabled || page === 1}
                            isHidden={page === 1}
                        >
                            {startControl}
                        </PaginationControl>
                    )}

                    {prevNextControls && (
                        <PaginationControl
                            title='Previous page'
                            onClick={() => onClick(name, page - 1)}
                            className='previous'
                            isDisabled={isDisabled || page === 1}
                            isHidden={page === 1}
                        >
                            {prevControl}
                        </PaginationControl>
                    )}

                    <div
                        className='pagination__page-numbers'
                        style={
                            {
                                width: `${this.state.containerWidth}px`
                            }
                        }
                    >
                        <div
                            ref={this.pageNumbersRef}
                            className='pagination__page-numbers__list'
                            style={
                                isAnimated
                                && {
                                    transform: `translateX(${transformOffset}%)`
                                }
                            }
                        >
                            {
                                pages.map((pageNumber) => {
                                    const currentPage = pageNumber === page;
                                    const pageHidden = !visiblePages.includes(pageNumber);

                                    return (
                                        <PaginationControl
                                            key={pageNumber}
                                            onClick={() => onClick(name, pageNumber)}
                                            title={`Page ${pageNumber}`}
                                            isSelected={currentPage}
                                            isHidden={pageHidden}
                                            isDisabled={isDisabled}
                                        >
                                            {pageNumber}
                                        </PaginationControl>
                                    );
                                })
                            }
                        </div>
                    </div>

                    {prevNextControls && (
                        <PaginationControl
                            title='Next page'
                            onClick={() => onClick(name, page + 1)}
                            className='next'
                            isDisabled={isDisabled || page === this.state.totalPages}
                            isHidden={page === this.state.totalPages}
                        >
                            {nextControl}
                        </PaginationControl>
                    )}

                    {startEndControls && (
                        <PaginationControl
                            title='Last page'
                            onClick={() => onClick(name, this.state.totalPages)}
                            className='end'
                            isDisabled={isDisabled || page === this.state.totalPages}
                            isHidden={page === this.state.totalPages}
                        >
                            {endControl}
                        </PaginationControl>
                    )}
                </div>

                {showPageCount && (
                    <div className='pagination__page-number'>
                        <p>Page {page} of {this.state.totalPages}</p>
                    </div>
                )}

            </div>
        );
    }

}

PaginationContainer.defaultProps = {
    itemsPerPage: 12,
    controlLimit: 3,
    prevNextControls: true,
    startEndControls: false,
    showPageCount: false,
    prevControl: 'Previous page',
    nextControl: 'Next page',
    startControl: 'First page',
    endControl: 'Last page'
};

PaginationContainer.propTypes = {
    page: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    numberOfItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number,
    controlLimit: PropTypes.number,
    prevNextControls: PropTypes.bool,
    startEndControls: PropTypes.bool,
    prevControl: PropTypes.node,
    nextControl: PropTypes.node,
    startControl: PropTypes.node,
    endControl: PropTypes.node,
    isAnimated: PropTypes.bool,
    isDisabled: PropTypes.bool,
    showPageCount: PropTypes.bool
};

export default PaginationContainer;
