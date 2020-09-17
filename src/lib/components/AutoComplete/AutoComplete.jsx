import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends Component {

    handleClick = (index, selectedItem) => {
        this.props.onClick(index, selectedItem);
    };

    /**
     * Render the suggestion as either a link, or a span
     * If rendering as a span, then it's most likely a loading message or error message of some sort
     *
     * @param {object} suggestion The suggestion being rendered
     * @param {int}    index      The index of the suggestion in the array
     * @returns {*}
     */
    renderSuggestion = (suggestion, index) => {
        if (!suggestion.selectable) {
            return (
                <span key={index} data-suggestion-id={index} className="autocomplete-suggestion">
                    {suggestion.value}
                </span>
            );
        }

        return (
            <button
                type="button"
                key={index}
                data-suggestion-id={index}
                onClick={() => { this.handleClick(index, suggestion); }}
                className="autocomplete-suggestion"
            >{suggestion.value}</button>
        );
    };

    render() {
        if (this.props.suggestions) {
            return (
                <div className="autocomplete-suggestions">
                    {this.props.suggestions.map(this.renderSuggestion)}
                </div>
            );
        }
        return null;
    }

}

AutoComplete.propTypes = {
    onClick: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        selectable: PropTypes.bool
    }))
};

export default AutoComplete;
