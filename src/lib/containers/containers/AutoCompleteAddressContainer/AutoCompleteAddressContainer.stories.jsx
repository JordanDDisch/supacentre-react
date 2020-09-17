import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import AutoCompleteAddressContainer from './AutoCompleteAddressContainer';


storiesOf('Containers|AutoCompleteAddress', module)
    .add('default', () => (
        <AutoCompleteAddressContainer
            label={text('label', AutoCompleteAddressContainer.defaultProps.label)}
            handleChange={action('changed')}
        />
    ));
