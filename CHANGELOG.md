# Supacentre React Changelog

## 3.0.20

- Update Button component to have a default onClick prop

## 3.0.19

- Update Bitbucket Pipelines so that they only run on pull requests

## 3.0.18

- Update all dependencies to latest versions
- `npm audit fix`
- Update React peer dependencies

## 3.0.17

- Add the `<Button />` component

## 3.0.16

- Installed missing dependencies for Storybook
- Fixed broken `AutoCompleteAddressContainer` story

## 3.0.15

- Changes `../` import statements to `./../`. This will set them up to work better with aliasing if we introduce it.
- Imports `index.js` files explicitly. i.e. Changes `./../..` import statements to `./../../index`. We were getting
  problems with jest because the explicit import path wasn't being used.

## 3.0.14

- Expand PriceDisplay component label propType to support elements
- Fix react warning on passing unsupported props to html elements

## 3.0.13

- Move React-y packages to Peer Dependencies

  This allows Supacentre React to be more easily plugged into other projects that already have React added as a dependency,
  without then making NPM download the exact version specified in Supacentre React. Peer Dependencies allow us to indicate
  that Supacentre React will work with React provided it matches the version select pattern.
  When installing it into a project that doesn't already have React, NPM will automatically install it,
  or if it is a React version that doesn't match the version select pattern, NPM will throw an error

## 3.0.12

- Fix input blurring

## 3.0.11

- Fix typing error in "country"

## 3.0.9

- Move wrapper from `<InputContainer/>` to `<Input/>`
- Match `<CheckboxRadio/>` to similar structure to `<Input/>`

## 3.0.8

- Update `<Input/>` to allow for blank placeholder

## 3.0.7

- Update `<InputContainer/>` and Input to allow applications to set the focus on the rendered `<input>`

## 3.0.6

- Update `<InputContainer/>` to allow any HTML attributes to be passed through to the `<input>` element

## 3.0.5

- Add `<ErrorBoundary/>` Component to catch errors inside components

## 3.0.4

- Fix 🐛 Select Container not passing name correctly
- Add `requiredIndicator` to show on required inputs, selects

## 3.0.3

- Add sideEffects flag to allow tree shaking to work

## 3.0.2

- Updated `<Select/>` component to differ onBlur from onSelect
- Added MagentoTranslator

## 3.0.1

- Updated DeliveryForm to include handler for selecting new address

## 3.0.0

- All tests working
- remove un-used frontend-toolkit
- remove eslint-config-supacentre dep - use directly
- Use React.PureComponent instead of functional components for perf. improvements
- Remove validate.js requirements
- Simplify input validation
- Breaking changes to validation for `<InputContainer/>`, `<EmailContainer/>`, `<PostalCodeInputContainer/>`
- Changed AutoComplete element from `<a>` to `<button>`

## 2.0.0

- remove yarn lock
- update to @babel 7
- auto fix eslint issues
- update linting and babel configs
- update gulp 4 setup
- using more modern terser plugin as ugilfyjs not longer maintained
- update packages
- move to correct dep postions
- remove old polyfill @babel/preset-env, {"useBuiltIns": "usage"} will do this for us!
- fix prop definitions
- fix import export definitions
- fix test
- fix linting issues, a11y issues
- remove setup tests for jest - no longer needed.
- fix a11y issue
- add message to validation
- fix return issue
- fix message issue
- fix a11y issue - non link item should be button

## 1.0.0 Initial Release
