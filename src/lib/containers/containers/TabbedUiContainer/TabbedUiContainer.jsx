/**
 * TabbedUi React Component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabbedUiContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleTab: props.visibleTab
        };

        this.tabs = React.createRef();

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    /**
     * Set the visible tab of the component
     *
     * This function is intended to be used outside of TabbedUiContainer, through a ref.
     *
     * E.g.
     *   // In the constructor
     *   this.tabbedUiRef = React.createRef();
     *   // ...
     *   // In some function/event handler
     *   tabbedUiRef.goToTab(1);
     *   // ...
     *   // In the render function
     *   <TabbedUiContainer ref={this.tabbedUiRef} />
     *
     * @param tabId
     */
    goToTab = (tabId) => {
        this.setState({
            ...this.state,
            visibleTab: tabId
        });
    };

    /**
     * Synchrounous function that will be called before the tab is changed
     *
     * @param {int} nextTab The tab being changed to
     * @param {int} prevTab The tab being changed from
     */
    beforeActivate = (nextTab, prevTab) => {
        this.props.beforeActivate(nextTab, prevTab);
    };

    /**
     * Asynchrounous function that will be called before the tab is changed
     *
     * @param {int} nextTab The tab being changed to
     * @param {int} prevTab The tab being changed from
     *
     * @returns {Promise}
     */
    beforeActivateAsync = (nextTab, prevTab) => {
        return this.props.beforeActivateAsync(nextTab, prevTab);
    };

    /**
     * Synchrounous function that will be called after the tab is changed
     *
     * @param newTab
     *
     * @returns {null}
     */
    afterActivate = (newTab) => {
        this.props.afterActivate(newTab);
    };

    /**
     * Asynchrounous function that will be called before the tab is changed
     *
     * @param newTab
     *
     * @returns {Promise}
     */
    afterActivateAsync = (newTab) => {
        return this.props.afterActivateAsync(newTab);
    };

    getNextLeftTab = (index, max) => {
        const value = index - 1;
        if (value < 0) {
            return max - 1;
        }
        return value;
    }

    getNextRightTab = (index, max) => {
        const value = index + 1;
        if (value >= max) {
            return 0;
        }
        return value;
    }

    /**
     * Checks the keydown event for arrows pressed and return adjusted tab index;
     *
     * Right/Left arrow used to access tabs via keyboard.
     * Tabbing through the tabs should tab from the tab to the content not through the tabs.
     * See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
     *
     * @param {object} e the event Object
     * @param {number} index index of tab
     * @param {number} max length of tabs
     */
    getAdjustedTabIndex(e, index, max) {
        const leftArrow = e.type === 'keydown' && e.key === 'ArrowLeft';
        const rightArrow = e.type === 'keydown' && e.key === 'ArrowRight';

        // If left arrow move tabIndex back, checking to see if last item
        if (leftArrow) {
            return this.getNextLeftTab(index, max);
        }

        // If right arrow move tabIndex forward or back to start
        if (rightArrow) {
            return this.getNextRightTab(index, max);
        }
        // else return unModified index
        return index;
    }

    /**
     * Handle the event fired when a tab is clicked
     *
     * @param {object} e The event object
     *
     * @returns {null}
     */
    handleTabChange = async (e) => {
        const { tabs } = this.props;
        const initialIndex = parseInt(e.currentTarget.dataset.key, 10);

        const tabIndex = this.getAdjustedTabIndex(e, initialIndex, tabs.length);

        if (this.props.beforeActivate) {
            this.beforeActivate(tabIndex, this.state.visibleTab);
        }

        if (this.props.beforeActivateAsync) {
            await this.beforeActivateAsync(tabIndex, this.state.visibleTab);
        }

        this.setState(
            {
                ...this.state,
                visibleTab: tabIndex
            },
            async () => {
                // move focus to new child
                this.tabs.current.children[tabIndex].focus();

                if (this.props.afterActivate) {
                    this.afterActivate(tabIndex);
                }

                if (this.props.afterActivateAsync) {
                    await this.afterActivateAsync(tabIndex);
                }
            }
        );
    };

    /**
     * Get the tabs passed into the component
     *
     * @returns {node}
     */
    getTabs() {
        return (
            <ul className="tabbed-ui__tabs" role="tablist" aria-label="Tabs" ref={this.tabs}>
                {this.props.tabs.length > 0
                    ? this.props.tabs.map((tab, index) => this.getTab(tab, index))
                    : this.getTab({ label: this.props.noTabsMessage || '', code: 'notab' }, 0)}{' '}
                {/* Prevents component breaking when tabs array is empty */}
            </ul>
        );
    }

    /**
     * Build tab list item
     *
     * @param {{
     *   iconUrl: string,
     *   label: string
     * }}           tabData The tab data being parsed into list item
     * @param {int} index   Array index for the tab data
     *
     * @returns {*}
     */
    getTab({ code, iconUrl, label }, index) {
        const tabContent = iconUrl ? <img src={iconUrl} alt={label} /> : label;
        const active = this.state.visibleTab === index;
        const labelBy = label.toLowerCase().replace(' ', '-');
        const classNames = classnames('tabbed-ui__tab', `tabbed-ui__tab--${code}`, { active, 'tabbed-ui__tab--active': active });

        return (
            <li
                key={index}
                role="tab"
                id={labelBy}
                data-key={index}
                onClick={this.handleTabChange}
                onKeyDown={this.handleTabChange}
                className={classNames}
                aria-controls={code}
                aria-selected={active}
                tabIndex={active ? '0' : '-1'}
            >
                {tabContent}
            </li>
        );
    }

    /**
     * Get the tab data for the currently active tab
     *
     * @returns {{ content: node, buttonLabel: string|boolean }}
     */
    getActiveTabData() {
        const tab = this.props.tabs.find((_, index) => this.state.visibleTab === index);

        return (
            tab || {
                content: '',
                buttonLabel: false
            }
        );
    }

    /**
     * Get the content for the currently active tab
     *
     * @returns {node}
     */
    getTabContent() {
        return this.props.tabs.map((tab, index) => {
            const { content, code, label } = tab;
            const labelBy = label.toLowerCase().replace(' ', '-');
            const active = this.state.visibleTab === index;
            const classNames = classnames('tabbed-ui__content', `tabbed-ui__content--${code}`, { 'tabbed-ui__content--active': active, active });

            return (
                <section className={classNames} key={code} id={code} title={label} role="tabpanel" aria-labelledby={labelBy} hidden={!active}>
                    {content}
                </section>
            );
        });
    }

    /**
     * Get the action button for the active tab
     *
     * @returns {node|null}
     */
    getActiveTabAction() {
        const { buttonLabel, button: customButton } = this.getActiveTabData();

        const button = buttonLabel ? (
            <button type="button" className="tabbed-ui__action-button" onClick={this.props.handleAction}>
                {buttonLabel}
            </button>
        )
            : customButton
        ; // The button passed in as a prop will need to have its own onClick and classname etc.

        return buttonLabel || customButton ? <footer className="tabbed-ui__actions">{button}</footer> : null;
    }

    render() {
        return (
            <section className="tabbed-ui">
                <header className="tabbed-ui__tabs-header">{this.getTabs()}</header>
                {this.props.beforeTabContent}
                <div className="tabbed-ui__content">
                    {this.props.tabs.length > 0 && this.getTabContent()}
                    {this.props.children}
                </div>
                {this.props.afterTabContent}
                {this.getActiveTabAction()}
            </section>
        );
    }

}

TabbedUiContainer.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
            content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
            buttonLabel: PropTypes.string,
            code: PropTypes.string.isRequired,
            button: PropTypes.element
        })
    ),
    afterTabContent: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    beforeTabContent: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    handleAction: PropTypes.func,
    noTabsMessage: PropTypes.string,
    children: PropTypes.element,
    beforeActivate: PropTypes.func,
    afterActivate: PropTypes.func,
    beforeActivateAsync: PropTypes.func,
    afterActivateAsync: PropTypes.func,
    visibleTab: PropTypes.number
};

TabbedUiContainer.defaultProps = {
    visibleTab: 0
};

export default TabbedUiContainer;
