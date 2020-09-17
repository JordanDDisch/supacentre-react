import React from 'react';
import { spy } from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorBoundary from './ErrorBoundary';

Enzyme.configure({ adapter: new Adapter() });

const Something = () => null;

describe('The Error component', () => {
    it('catches an error', () => {
        const wrapper = mount(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        );

        wrapper.setState({ hasError: true });

        expect(wrapper.find('.catch-error-title').exists()).toEqual(true);
    });

    it('catches an error with custom error display', () => {
        const wrapper = mount(
            <ErrorBoundary
                errorMessage={
                    <div className="errorMessage">
                        <p>Error happened.</p>
                    </div>
                }
            >
                <Something />
            </ErrorBoundary>
        );

        wrapper.setState({ hasError: true });

        expect(wrapper.find('.errorMessage p').text()).toEqual('Error happened.');
    });

    it('catches an error in one of its children', () => {
        const spying = spy(ErrorBoundary.prototype, 'componentDidCatch');

        const wrapper = mount(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        );

        const error = new Error('hi');
        wrapper.find(Something).simulateError(error);
        expect(wrapper.state()).toEqual({ hasError: true });
        expect(ErrorBoundary.prototype.componentDidCatch).toHaveProperty('callCount', 1);
        expect(wrapper.find('.catch-error-title').exists()).toEqual(true);
    });
});
