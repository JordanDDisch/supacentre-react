import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import './config__addon--options';
import './config__addon--knobs';

const importAll = (context) => context.keys().forEach(context)
configure(() => {
    window.regeneratorRuntime = require('babel-runtime/regenerator');
    importAll(require.context(
        `../src/lib/`,
        true,
        /stor(ies|y)\.jsx?$/));
}, module);