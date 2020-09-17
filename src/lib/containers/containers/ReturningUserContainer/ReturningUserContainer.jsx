import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'react-html-id';
import { EmailContainer, PasswordContainer } from './../../index';

class ReturningUserContainer extends Component {

    constructor(props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            forgotPassword: false,
            rememberMe: false
        };
    }

    handleCheckbox = ({ target }) => {
        this.setState({
            ...this.state,
            [target.name]: target.checked
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin();
    };

    renderHelperText() {
        return !this.state.forgotPassword
            ? <p className="helper-text">{this.props.existingAccountText}</p>
            : <p className="helper-text">{this.props.passwordResetText}</p>;
    }

    /**
     * Render login feedback, like incorrect password, or account not existing
     *
     * @returns {*}
     */
    renderLoginFeedback() {
        if (this.props.loginFeedback === '') {
            return false;
        }

        return (
            <div className="returning-user__messages">
                {this.props.loginFeedback}
            </div>
        );
    }

    renderPassword() {
        return this.state.forgotPassword
            ? null
            : <PasswordContainer
                id={this.nextUniqueId()}
                value={this.props.password.value}
                isValid={this.props.password.valid}
                onChange={this.props.handleChange}
            />;
    }

    renderRememberMeCheckbox() {
        return this.state.forgotPassword
            ? null
            : (
                <div className="remember-me-container">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        id={this.nextUniqueId()}
                        onChange={this.handleCheckbox}
                        checked={this.state.rememberMe}
                        className="checkbox"
                    />
                    <label htmlFor={this.lastUniqueId()}>Remember Me</label>
                </div>
            );
    }

    renderActionButton() {
        return this.state.forgotPassword
            ? <button type="button" className="returning-user__reset-password-button" onClick={this.props.handleReset}>Reset Password</button>
            : <button className="returning-user__log-in-button" type="submit">Log In</button>;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="returning-user-container">
                {this.props.slotOne}

                {this.renderHelperText()}

                {this.renderLoginFeedback()}

                <EmailContainer
                    id={this.nextUniqueId()}
                    value={this.props.email.value}
                    onChange={this.props.handleChange}
                    isValid={this.props.email.valid}
                />

                {this.renderPassword()}

                <div className="form-controls">
                    {this.renderRememberMeCheckbox()}

                    <div className="forgot-password-container">
                        <input
                            type="checkbox"
                            name="forgotPassword"
                            id={this.nextUniqueId()}
                            onChange={this.handleCheckbox}
                            checked={this.state.forgotPassword}
                            className="checkbox"
                        />
                        <label htmlFor={this.lastUniqueId()}>Forgot Password?</label>
                    </div>
                </div>

                {this.props.slotTwo}

                {this.renderActionButton()}
            </form>
        );
    }

}

ReturningUserContainer.propTypes = {
    email: PropTypes.shape({
        value: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired
    }),
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired
    }),
    handleChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    slotOne: PropTypes.element,
    slotTwo: PropTypes.element,
    loginFeedback: PropTypes.string,
    existingAccountText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    passwordResetText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
};

ReturningUserContainer.defaultProps = {
    slotOne: null,
    slotTwo: null,
    existingAccountText: 'If you already have an account, please enter your email and password',
    passwordResetText: 'Enter your email and we\'ll send you a reset link'
};

export default ReturningUserContainer;
