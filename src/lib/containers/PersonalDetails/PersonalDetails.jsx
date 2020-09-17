/**
 * PersonalDetails React Component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputContainer from './../InputContainer/InputContainer';
import EmailContainer from './../EmailContainer/EmailContainer';

class PersonalDetails extends Component {

    /**
     * Render the email field
     *
     * @returns {null|Element}
     */
    renderEmailField() {
        if (!this.props.displayEmail) {
            return null;
        }

        return (
            <EmailContainer
                id="personal-details__email"
                name="email"
                placeholder="Enter your email address"
                value={this.props.email.value}
                isValid={this.props.email.valid}
                onChange={this.props.onChange}
                isRequired={true}
                onBlur={this.props.onBlurEmail}
            />
        );
    }

    render() {
        return (
            <section className="personal-details-container">
                <InputContainer
                    id="personal-details__firstname"
                    name="firstname"
                    label="First Name"
                    placeholder="Enter your first name"
                    value={this.props.firstname.value}
                    isValid={this.props.firstname.valid}
                    onChange={this.props.onChange}
                    isRequired={true}
                />
                <InputContainer
                    id="personal-details__lastname"
                    name="lastname"
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={this.props.lastname.value}
                    isValid={this.props.lastname.valid}
                    onChange={this.props.onChange}
                    isRequired={true}
                />
                {this.renderEmailField()}
                {this.props.children}
            </section>
        );
    }

}

PersonalDetails.propTypes = {
    firstname: PropTypes.shape({
        value: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired
    }),
    lastname: PropTypes.shape({
        value: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired
    }),
    email: PropTypes.shape({
        value: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired
    }),
    onChange: PropTypes.func.isRequired,
    children: PropTypes.any,
    displayEmail: PropTypes.bool,
    onBlurEmail: PropTypes.func
};

PersonalDetails.defaultProps = {
    displayEmail: true
};

export default PersonalDetails;
