import React from 'react';
import { storiesOf } from '@storybook/react';

import ItemSummaryContainer from './ItemSummaryContainer';
import itemSummary from './testData';

storiesOf('Containers|ItemSummaryContainer', module)
    .add('default', () => {
        return <ItemSummaryContainer
            item={itemSummary}
            updateConfigurable={() => {}}
            blacklistConfigurables={['foo']}
            removeItem={() => {}}
        />;
    });
