import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, EmailContainer, PasswordContainer } from './../../index';

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            telephone: '',
            password: '',
            passwordConfirm: '',
            isValid: true,
            validationMessage: '',
            signUpNewsletter: false
        };
    }

    handleChange = ({ target }) => {
        this.setState({
            ...this.state,
            [target.name]: target.value
        });
    };

    handleSignUpCheckbox = ({ target }) => {
        this.setState({
            ...this.state,
            signUpNewsletter: target.checked
        });
    };

    createAccount = (e) => {
        e.preventDefault();

        // Reset the isValid flag in case the user has just fixed validation issues
        this.setState({
            ...this.state,
            isValid: true
        });

        // Fetch request
        if (!this.validate()) {
            return;
        }

        // Grab all state except for the isValid, showPassword, passwordConfirm and validationMessage properties, and pass them to the handleContinue prop
        const {
            isValid, showPassword, passwordConfirm, validationMessage, ...personalDetails
        } = this.state;

        this.props.handleContinue(personalDetails);
    };

    guestCheckout = () => {
        // Necessary actions to hide login forms and display shipping details
        this.props.handleContinue();
    };

    /**
     * Simple validation that only checks if fields are set
     *
     * @returns {boolean}
     */
    validate = () => {
        if (!this.validateValuesExist()) {
            this.setState({
                ...this.state,
                isValid: false,
                validationMessage: 'Please fill in all fields'
            });

            return false;
        }

        if (!this.validatePasswordsMatch()) {
            this.setState({
                ...this.state,
                isValid: false,
                validationMessage: 'Please make sure passwords match'
            });

            return false;
        }

        return true;
    };

    /**
     * Validate that each of the required fields contain a value
     *
     * @returns {boolean}
     */
    validateValuesExist = () => {
        const {
            firstname,
            lastname,
            email,
            password
        } = this.state;

        return firstname !== ''
            && lastname !== ''
            && email !== ''
            && password !== '';
    };

    /**
     * Validate that the password and password confirmation values are the same
     *
     * @returns {boolean}
     */
    validatePasswordsMatch = () => {
        const {
            password,
            passwordConfirm
        } = this.state;

        return password === passwordConfirm;
    };

    /**
     * If any of the form fields aren't filled in when the validate function is run, display an error message to the
     * user
     *
     * @returns {null}
     */
    renderError = () => {
        return !this.state.isValid ? (
            <div className="sign-up-form__message validation-error">{this.state.validationMessage}</div>
        ) : null;
    };

    /**
     * Set the validation message
     *
     * This function is intended to be used "from the outside" of the component, through a ref
     *
     E.g.
     *   // In the constructor
     *   this.signUpFormRef = React.createRef();
     *   // ...
     *   // In some function/event handler
     *   signUpFormRef.setValidationmessage('Data is wrong');
     *   // ...
     *   // In the render function
     *   <SignUpForm ref={this.signUpFormRef} />
     *
     * @param validationMessage
     */
    setValidationMessage = (validationMessage) => {
        this.setState({
            ...this.state,
            isValid: false,
            validationMessage
        });
    };

    renderPasswordField() {
        return (
            <div className="passwords-container">
                <PasswordContainer
                    id="signup-password"
                    name="password"
                    label="Password..."
                    value={this.state.password}
                    isValid={this.state.isValid || this.state.password !== ''}
                    onChange={this.handleChange}
                />
                <PasswordContainer
                    id="signup-password-confirmation"
                    name="passwordConfirm"
                    label="Confirm password..."
                    placeholder="Confirm password..."
                    value={this.state.passwordConfirm}
                    isValid={this.state.isValid || this.state.passwordConfirm !== ''}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    renderCheckoutAsGuestButton() {
        // Explicitly check for false, meaning it will default to true
        return this.props.canCheckoutAsGuest !== false
            ? <button type="button" className="sign-up-form__button--guest" onClick={this.props.handleGuest}>Checkout as Guest</button>
            : null;
    }

    render() {
        /**
         * onBlur will call the validate function passed in as a prop, if included, otherwise it will call the default
         * validation function within this container
         */
        return (
            <form onSubmit={this.createAccount} className="sign-up-form">
                {this.props.slotOne}

                {this.renderError()}

                <InputContainer
                    id="signup-firstname"
                    name="firstname"
                    label="First name..."
                    onChange={this.handleChange}
                    value={this.state.firstname}
                    isValid={this.state.isValid || this.state.firstname !== ''}
                />
                <InputContainer
                    id="signup-lastname"
                    name="lastname"
                    label="Last name..."
                    onChange={this.handleChange}
                    value={this.state.lastname}
                    isValid={this.state.isValid || this.state.lastname !== ''}
                />
                <EmailContainer
                    id="signup-email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onBlur={this.props.onBlurEmail}
                    isValid={this.state.isValid || this.state.email !== ''}
                />

                <InputContainer
                    id="signup-telephone"
                    name="telephone"
                    label="Phone number..."
                    onChange={this.handleChange}
                    value={this.state.telephone}
                    isValid={this.state.isValid || this.state.telephone !== ''}
                />

                {this.props.extraSignupFields}

                {this.renderPasswordField()}

                <div className="newsletter-signup-container">
                    <input
                        id="sign-up-newsletter"
                        type="checkbox"
                        onChange={this.handleSignUpCheckbox}
                        checked={this.state.signUpNewsletter}
                        className="checkbox"
                    />
                    <label htmlFor="sign-up-newsletter">Sign up to our newsletter</label>
                </div>

                {this.props.slotTwo}

                <div className="sign-up-form__actions">
                    <button type="submit" className="sign-up-form__button--continue">Continue</button>

                    {this.renderCheckoutAsGuestButton()}
                </div>
            </form>
        );
    }

}

SignUpForm.propTypes = {
    handleContinue: PropTypes.func.isRequired,
    canCheckoutAsGuest: PropTypes.bool,
    handleGuest: PropTypes.func,
    onBlurEmail: PropTypes.func,
    slotOne: PropTypes.element,
    slotTwo: PropTypes.element,
    extraSignupFields: PropTypes.element
};

SignUpForm.defaultProps = {
    slotOne: null,
    slotTwo: null,
    extraSignupFields: null
};

export default SignUpForm;
