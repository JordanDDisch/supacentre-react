import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs/react';

import EmailContainer from './EmailContainer';

storiesOf('Containers|EmailContainer', module)
    .add('default', () => {
        return <EmailContainer
            id="email"
            value={text('value', 'my@email.com')}
            onChange={action('onChange')}
            validate={action('validate')}
        />;
    });
