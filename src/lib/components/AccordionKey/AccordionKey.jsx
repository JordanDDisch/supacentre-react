import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * AccordionKey Component
 */
class AccordionKey extends Component {

    constructor(props) {
        super(props);
        this.refContent = React.createRef();
        this.showTimer = 0;
    }

    /**
     * showKey() applies height style attributes to keys to show them
     *
     * @param {object} elem - The accordion key to be shown (required)
     */
    showKey = (elem) => {
        const accordionKey = elem;
        accordionKey.style.height = `${accordionKey.scrollHeight}px`; // Gives element a height to change to

        // On transition complete, remove inline height so content naturally scales
        this.showTimer = window.setTimeout(() => {
            accordionKey.style.height = '';
        }, this.props.transitionSpeed);
    }

    /**
     * hideKey() applies height style attributes to keys to hide them,
     * optionally with or without animation
     *
     * @param {object} elem - The accordion key to be hidden (required)
     * @param {Boolen} animate - Enable animation transition (default: true)
     */
    hideKey = (elem, animate = true) => {
        const accordionKey = elem;
        // If key is currently transitioning open, cancel timeout
        if (this.showTimer > 0) {
            clearInterval(this.showTimer);
        }

        if (animate) {
            accordionKey.style.height = `${accordionKey.scrollHeight}px`; // Gives element a height to change from

            // Reset height to 0 for transition
            window.setTimeout(() => {
                accordionKey.style.height = 0;
            }, 1);
        } else {
            accordionKey.style.height = 0; // Skip animation, just hide
        }
    }

    // On update of isOpen prop, fire appropriate function to hide/show keys
    componentDidUpdate(prevProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            if (prevProps.isOpen) {
                this.hideKey(this.refContent.current);
            } else {
                this.showKey(this.refContent.current);
            }
        }
    }

    // On mount, hide accordion key if not set to open
    componentDidMount() {
        if (!this.props.isOpen) {
            this.hideKey(this.refContent.current, false);
        }
    }

    render() {
        const {
            label,
            name,
            id,
            children,
            isOpen,
            isDisabled,
            onClick,
            openLimit
        } = this.props;

        const accordionKeyClass = classNames('accordion-key', {
            'accordion-key--open': isOpen,
            'accordion-key--closed': !isOpen,
            'accordion-key--disabled': isDisabled
        });

        return (
            <div
                className={accordionKeyClass}
                name={name}
                id={id}
                ref={this.refKey}
            >
                <div className='accordion-key__header'>
                    <button
                        className='accordion-key__trigger'
                        type='button'
                        onClick={() => onClick(name, id, openLimit)}
                        disabled={isDisabled}
                    >
                        {label}
                    </button>
                </div>
                <div
                    className="accordion-key__content"
                    ref={this.refContent}
                >
                    <div className="accordion-key__content__inner">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

}

AccordionKey.defaultProps = {
    transitionSpeed: 350
};

AccordionKey.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    transitionSpeed: PropTypes.number,
    isOpen: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    openLimit: PropTypes.bool
};

export default AccordionKey;
