import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SocialLogin extends PureComponent {

    render() {
        const { networks, children, label } = this.props;

        const getLabel = () => {
            return label ? <header className="social-login__header">{label}</header> : null;
        };

        const getSocialNetworks = () => {
            if (children) {
                return <div className="children">{children}</div>;
            }

            const networksJSX = networks.map((network, index) => {
                const classNames = classnames(
                    'social-login__btn',
                    `social-login--${network.name.toLowerCase()}`
                );
                return (
                    <li className="social-login__network" key={index}>
                        <a href={network.url} className={classNames}>{network.name}</a>
                    </li>
                );
            });

            return (
                <ul className="social-login__networks">
                    {networksJSX}
                </ul>
            );
        };

        return (
            <section className="social-login-container">
                {getLabel()}
                {getSocialNetworks()}
            </section>
        );
    }

}

SocialLogin.propTypes = {
    // Special validator function that will check one of either `networks` or `children` is set
    _: (props, propName, componentName) => {
        if (!props.networks && !props.children) {
            return new Error(`One of props 'networks' or 'children' was not specified in '${componentName}'.`);
        }
    },
    label: PropTypes.string,
    networks: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })),
    children: PropTypes.node
};
