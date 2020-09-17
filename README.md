# SupaCentre React

A set of React components that can be used to create an E-commerce website.

## Getting Started

### Usage

```bash
npm install --save git+ssh//git@bitbucket.org:expgroup/supacentre-react.git
```

Import components into your local React app/components as required using descructuring

For example
```javascript
import { InputContainer } from 'supacentre-react';
```

#### Translator

To use the Magento Translator, in your root javascript file:
```javascript
import { MagentoTranslator } from 'supacentre-react'

//...

MagentoTranslator.init(translationPath).then(() => {
  // Do things after the translator is initialised
});

```
`translationPath` is the path to the Magento translation file, usually: `${staticBaseUrl}/js-translation.json`.

You can now use translations like so:
```javascript
import { __ } from 'supacentre-react';

__('Term to translate');
```

## Deployment

Steps to follow to deploy a new version:

1. Update package.json with version.
1. Update Changelog.md with changes
2. Merge `develop` into master (will hopefully just be a fast-forward)
3. Push to `master`
4. Create git tag with match version.
5. Push `master` to `develop`

## Development

Clone repository
```bash
git clone git@bitbucket.org:expgroup/supacentre-react.git supacentre-react
```

Install dependencies
```bash
npm install
```

Run local development server
```bash
npm run dev
```

Follow these steps to being developing a new component

1. Create a new branch at the same location as `master`
2. Create new component file: `src/lib/components/[ComponentName]/[ComponentName].jsx`
3. Create export file: `src/lib/components/[ComponentName]/index.js` (this makes it easier to import into other files)
```javascript
// src/lib/components/[ComponentName]/index.js

import [ComponentName] from './[ComponentName]';

export [ComponentName];
```
4. Import and export the new component in `src/lib/index.js` (follow format of existing components - try to keep the list in alphabetical order)
5. Open `src/docs/App.jsx`, import the new component, and place it inside `<React.Fragment>` so that it will be rendered
6. Create associated test file: `src/lib/components/[ComponentName]/[ComponentName].test.js`
7. Start developing!

### Component vs Container

Every `component` should have an associated `container`. The `container` is what will be imported into various projects, and will contain any logic required to determine the values that the `component` should display.

### Stateless Functional Components / Pure Components

Each `component` should be written as a Stateless Functional Component (SFC), also known as a pure component. A pure component is such that with the same input, the output will always be the same. Both in presentation, and in app state.

*The following example is very simplistic, and not really representative of a real world situation, but it does show  how to re-write component as an SFC/Pure Component*

**Before**

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired
}

export default HelloWorld;
```

**After**
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HelloWorld = ({ name }) => {
  return (
    <div>Hello {name}</div>
  );
}

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired
}

export default HelloWorld;
```

### Testing

Each component should have an accompanying test file. This file will be place in the same directory, with a name that is very similar to the component. For example, `MyComponent.jsx` will have a test file `MyComponent.test.js`.

To run the tests, simply call `npm test`

The testing framework is Jest, which means there is little to no config set up required. Simply putting `.test` in the filename will ensure the file will be tested.

**At the very minimum, a test must be included that ensures the component can render without any errors**

### Using development JSON API

The package [JSON Server](https://github.com/typicode/json-server) has been configured in the project to allow for API requests to be made to a location that can easily have some test data set up. In order to use the json server:

1. Update `db.json` with a new root parameter. The root parameter will line up with the first parameter in the URL query string.
Refer to existing "stores" data property

2. Run the API server

```bash
npm run fakeapi
```

3. Make calls to the server:

```javascript
fetch('http://localhost:3000/{root_parameter}')
    .then(response => response.json())
    .then((data) => {
         console.log(data)
    });
```

Ideally, that data would be set into state, so your component will automatically re-render with the data

### Creating a Pull Request

1. Make sure code is linted
2. Make sure tests pass
3. Create PR on Bitbucket into the `develop` branch, and assign to 2 devs
4. Once approved by both devs, PR can be merged

### Time Tracking

Use the code `ALG-119` and project `SupaCentre` in Toggl when working on this repository.
Ensure the name of this repo, as well as an adequate description of work being undertaken is also included

Examples

`ALG-119: SupaceCentretReact - Updating package.json dependencies`

`ALG-119: SupaCentreReact - Issue #2 Fixing eslint rules`

*The "Issue #2" part of the time entry above refers to [Issues](https://bitbucket.org/expgroup/supacentre-react/issues?status=new&status=open) in this repository*

Examples of what we **don't** want to see in toggle

`ALG-119: SupaCentreReact`

`ALG-119`