import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectContainer, TextAreaContainer } from './../../index';

class AuthorityToLeave extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: this.props.selectedOption
        };
    }

    handleChange = (selectedOption) => {
        this.setState({
            ...this.state,
            selectedOption: selectedOption.target.value
        });

        this.props.onChange(selectedOption.target.value);
    };

    /**
     * Show text area or not
     *
     * @returns {boolean}
     */
    showTextarea() {
        const currentSelection = this.props.options.find((option) => option.value === this.state.selectedOption);
        return currentSelection && currentSelection.showTextarea;
    }

    /**
     * Get the text area if the 'other' option is selected
     *
     * @returns {*}
     */
    getNotesTextarea() {
        if (!this.showTextarea()) {
            return null;
        }

        const disclaimer = this.props.disclaimer && <p className="authority-to-leave__disclaimer">{this.props.disclaimer}</p>;

        return (
            <section className="authority-to-leave-notes__section">
                <TextAreaContainer
                    id="authority-to-leave-notes"
                    label={this.props.notesLabel}
                    value={this.props.notes}
                    onChange={this.props.handleNotesChange}
                    isValid={this.props.isValid}
                />
                {disclaimer}
            </section>
        );
    }

    render() {
        return (
            <div className="authority-to-leave">
                <SelectContainer
                    id="authority-to-leave__select"
                    name="authority-to-leave"
                    label="If no one is available to sign for your order"
                    value={this.state.selectedOption}
                    options={this.props.options}
                    handleChange={this.handleChange}
                    isValid={true}
                />
                {this.getNotesTextarea()}
            </div>
        );
    }

}

AuthorityToLeave.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        showTextarea: PropTypes.bool
    })),
    onChange: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
    notes: PropTypes.string,
    notesLabel: PropTypes.string,
    disclaimer: PropTypes.string,
    handleNotesChange: PropTypes.func,
    isValid: PropTypes.bool
};

AuthorityToLeave.defaultProps = {
    isValid: true
};

export default AuthorityToLeave;
