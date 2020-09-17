import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InputContainer from './../InputContainer/InputContainer';
import RadioContainer from './../RadioContainer/RadioContainer';


class PaymentModifierContainer extends Component {

    static get CONST__PROMO_APPLY() { return 'apply'; }

    static get CONST__PROMO_REMOVE() { return 'remove'; }

    static getDerivedStateFromProps(props, state) {
        // If the instance is a singleton, then that means only 1 code can be used at any one time
        const actionToPerform = props.isSingleton && props.appliedDiscounts.length !== 0
            ? PaymentModifierContainer.CONST__PROMO_REMOVE
            : PaymentModifierContainer.CONST__PROMO_APPLY;

        const modifiercode = props.isSingleton && props.appliedDiscounts.length !== 0
            ? props.appliedDiscounts[0]
            : state.modifiercode;

        const submitResponse = state.submitResponse || props.submitResponse || null;

        // Populate code so the coupon displays in the input field
        // Set the action that will be performed when the action button is pressed to be "remove"
        return {
            ...state,
            modifiercode,
            action: actionToPerform,
            submitResponse
        };
    }

    constructor(props) {
        super(props);

        this.id = 'payment-modifier';

        this.state = {
            modifiercode: '',
            submitResponse: '',
            selection: this.props.modifiers[0].id,
            action: PaymentModifierContainer.CONST__PROMO_APPLY,
            balance: false
        };
    }

    /**
     * Set the modifier code from outside of this component
     * Will need to be done using a ref
     *
     * @param {string} modifiercode The code to set for this payment modifier
     *
     * @returns {null}
     */
    setModifierCode = (modifiercode) => {
        return new Promise((res) => {
            this.setState({
                modifiercode
            }, () => {
                res();
            });
        });
    };

    handleRadioChange = ({ target }) => {
        this.setState({
            ...this.state,
            selection: target.value
        });
    };

    handleInputChange = ({ target }) => {
        this.setState({
            ...this.state,
            modifiercode: target.value
        }, () => {
            if (this.props.handleReportModifierCode) {
                this.props.handleReportModifierCode(this.state.modifiercode);
            }
        });
    };

    /**
     * Reset the UI of the compoment, hiding any error messages and clearing the balance
     *
     * @returns {null}
     */
    clearUi() {
        this.setState({
            ...this.state,
            balance: false,
            submitResponse: ''
        });
    }

    getModifier({ id, label }, index) {
        const inputId = `${this.id}-${id}-radio`;
        const className = classnames('modifier', `modifier--${id}`);

        return (
            <div key={index} className={className}>
                <RadioContainer
                    id={inputId}
                    value={id}
                    isSelected={this.state.selection === id}
                    onChange={this.handleRadioChange}
                />
                <label htmlFor={inputId}>
                    {label}
                </label>
            </div>
        );
    }

    getModifiers() {
        return this.props.modifiers.map((modifier, index) => this.getModifier(modifier, index));
    }

    getAppliedDiscounts() {
        if (this.props.appliedDiscounts.length === 0 || this.props.isSingleton) return null;

        return (
            <ul className={`${this.id}__applied-discounts`}>
                {this.props.appliedDiscounts.map((discountCode, index) => {
                    const removeBtn = this.props.isSingleton
                        ? null
                        : <button type="button" className="payment-modifier__remove" onClick={() => { this.handleRemove(discountCode); } } >Remove</button>;

                    return (
                        <li className={`${this.id}__applied-discount`} key={index}>{discountCode}{removeBtn}</li>
                    );
                })}
            </ul>
        );
    }

    getResponse() {
        if (this.state.submitResponse === '') return null;

        return (
            <div className={`${this.id}__current-message`}>
                <p>{this.state.submitResponse}</p>
            </div>
        );
    }

    getMessages() {
        if (this.props.appliedDiscounts.length === 0 && this.state.submitResponse === '') return null;

        return (
            <footer className={`${this.id}__messages`}>
                {this.getAppliedDiscounts()}
                {this.getResponse()}
            </footer>
        );
    }

    handlerSubmitForm = (e) => {
        e.preventDefault();

        this.submit();
    };

    submit = async () => {
        if (this.state.modifiercode === '' && this.state.action === PaymentModifierContainer.CONST__PROMO_APPLY) {
            this.setState({
                submitResponse: 'Please enter a code'
            });
            return;
        }

        // Reset any error messages
        this.clearUi();

        const { success, message } = await this.props.submit(this.state);

        if (success) {
            // Clear code that is currently displaying
            this.setState({
                ...this.state,
                modifiercode: ''
            });
        } else {
            this.setState({
                ...this.state,
                submitResponse: message
            });
        }
    };

    handleRemove = (discountCode) => {
        this.clearUi();
        this.props.handleRemove(discountCode);

        this.setState({
            ...this.state,
            modifiercode: ''
        });
    };

    /**
     * Handle the event fired when clicking the see balance button
     *
     * @returns {null}
     */
    handleCheckBalance = async () => {
        if (this.state.modifiercode === '') {
            this.setState({
                ...this.state,
                submitResponse: 'Please enter card ID'
            });
        }

        this.clearUi();

        try {
            const balance = await this.props.handleCheckBalance(this.state.modifiercode);

            this.setState({
                ...this.state,
                balance
            });
        } catch ({ response }) {
            this.setState({
                ...this.state,
                submitResponse: response.data.message
            });
        }
        return false;
    };

    /**
     * Render the balance of a users gift card
     *
     * @returns {object|null}
     */
    renderBalance = () => {
        // If the balance is false, then the user likely hasn't tried to check their balance yet
        if (this.state.balance === false) {
            return null;
        }

        return (
            <div className="payment-modifier__card-balance">Balance: {this.state.balance}</div>
        );
    };

    /**
     * Conditionally render the See Balance button
     *
     * @returns {object|null}
     */
    renderBalanceSection() {
        // If the user can't check balance, then this section shouldn't render anything
        if (!this.props.canCheckBalance) {
            return null;
        }

        return (
            <section className="payment-modifier__card-balance-container">
                {this.renderBalance()}
                <button type="button" className="payment-modifier__balance-btn" onClick={this.handleCheckBalance}>See balance</button>
            </section>
        );
    }

    render() {
        const { className, buttonLabel } = this.props;
        const classNames = classnames(this.id, className);

        return (
            <form className={classNames} onSubmit={this.handlerSubmitForm}>
                <header className={`${this.id}__options`}>
                    {this.getModifiers()}
                </header>
                <div className={`${this.id}__form`}>
                    <InputContainer
                        {...this.extractPropsForInput()}
                        id={`${this.id}-${this.props.id}-input`}
                        value={this.state.modifiercode}
                        name="modifiercode"
                        onChange={this.handleInputChange}
                        isValid={true}
                    />
                    <button type="submit" className="payment-modifier__apply-button">
                        {buttonLabel}
                    </button>
                    {this.renderBalanceSection()}
                </div>

                {this.props.slots.afterFormContent && (
                    <div className="payment-modifier__slot--after-form-content">
                        {this.props.slots.afterFormContent}
                    </div>
                )}

                {this.getMessages()}
            </form>
        );
    }

    /**
     * remove undesired props for the input element
     *
     * @returns {object}
     */
    extractPropsForInput() {
        const {
            className,
            buttonLabel,
            appliedDiscounts,
            submit,
            ...remainingProps
        } = this.props;

        return remainingProps;
    }

}

PaymentModifierContainer.propTypes = {
    id: PropTypes.string.isRequired,
    modifiers: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    appliedDiscounts: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
    className: PropTypes.string,
    submitResponse: PropTypes.string,
    isSingleton: PropTypes.bool,
    handleRemove: PropTypes.func,
    canCheckBalance: PropTypes.bool,
    handleCheckBalance: PropTypes.func,
    handleReportModifierCode: PropTypes.func,
    slots: PropTypes.shape({
        afterFormContent: PropTypes.element
    })
};

PaymentModifierContainer.defaultProps = {
    slots: {}
};

export default PaymentModifierContainer;
