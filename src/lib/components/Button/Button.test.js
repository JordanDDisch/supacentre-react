import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';
import {
    STATE__COMPLETE, STATE__ERROR, STATE__IDLE, STATE__LOADING
} from './../../utils/helper-states';

Enzyme.configure({ adapter: new Adapter() });

describe('<Button />', () => {
    const errorText = 'Error';
    const completeText = 'Complete!';
    const loadingText = 'Loading...';

    it('renders without error', () => {
        const buttonWrapper = mount((
            <Button>
                Click Me!
            </Button>
        ));

        expect(buttonWrapper.find('.button').exists()).toEqual(true);
    });

    it('renders loading state', () => {
        const buttonWrapper = mount((
            <Button
                buttonState={STATE__LOADING}
                loadingText={loadingText}
            >
                Click Me!
            </Button>
        ));

        const buttonElement = buttonWrapper.find('.button');

        expect(buttonWrapper.find('.button-component--is-loading').exists()).toEqual(true);
        expect(buttonElement.text()).toEqual(loadingText);
    });

    it('renders complete state', () => {
        const buttonWrapper = mount((
            <Button
                buttonState={STATE__COMPLETE}
                loadingText={loadingText}
                completeText={completeText}
            >
                Click Me!
            </Button>
        ));

        const buttonElement = buttonWrapper.find('.button');

        expect(buttonWrapper.find('.button-component--is-complete').exists()).toEqual(true);
        expect(buttonElement.text()).toEqual(completeText);
    });

    it('renders error state', () => {
        const buttonWrapper = mount((
            <Button
                buttonState={STATE__ERROR}
                errorText={errorText}
                loadingText={loadingText}
                completeText={completeText}
            >
                Click Me!
            </Button>
        ));

        const buttonElement = buttonWrapper.find('.button');

        expect(buttonWrapper.find('.button-component--has-error').exists()).toEqual(true);
        expect(buttonElement.text()).toEqual(errorText);
    });

    it('renders children', () => {
        const buttonWrapper = mount((
            <Button>
                <span>Two </span>
                <span>children</span>
            </Button>
        ));

        const buttonElement = buttonWrapper.find('.button');

        expect(buttonElement.text()).toEqual('Two children');
    });
});
