import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        // eslint-disable-next-line no-console
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.errorMessage;
        }

        return this.props.children;
    }

}

ErrorBoundary.defaultProps = {
    errorMessage: <h1 className="catch-error-title">Something went wrong.</h1>
};

ErrorBoundary.propTypes = {
    children: PropTypes.any,
    errorMessage: PropTypes.any
};

export default ErrorBoundary;
