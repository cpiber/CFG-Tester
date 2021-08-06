[![Build](https://github.com/cpiber/CFG-Tester/actions/workflows/node.js.yml/badge.svg)](https://github.com/cpiber/CFG-Tester/actions/workflows/node.js.yml)
[![Dependencies](https://status.david-dm.org/gh/cpiber/CFG-Tester.svg)](https://david-dm.org/cpiber/CFG-Tester)
[![DevDependencies](https://status.david-dm.org/gh/cpiber/CFG-Tester.svg?type=dev)](https://david-dm.org/cpiber/CFG-Tester?type=dev)
[![codecov](https://codecov.io/gh/cpiber/CFG-Tester/branch/master/graph/badge.svg?token=k09ukOWzD4)](https://codecov.io/gh/cpiber/CFG-Tester)

# CFG-Tester

CFGs (short for Context-Free Grammars) are an essential part of CS. This project aims to make them more accessible by providing a playground.

In the app, a grammar can be entered (see below) and its expansion observed. There is also a box for checking if the grammar accepts a given input or not.

The app is available [here](https://cpiber.github.io/CFG-Tester).


## UI

When opening the web app, on the left side (top on mobile), a grammar can be entered. Currently, two syntaxes are supported, see below. The text entered here will be parsed into a workable grammar while typing. Errors are displayed at the bottom, with a red outline. If the grammar is valid, a green outline is displayed.

On the right top (middle on mobile), a string to test against the grammar can be entered. The app will check if any expansion of the grammar would allow this string, i.e. check if the entered string is part of the language. Matching is performed while typing, and the status will be displayed below and via outline.

The right bottom (bottom on mobile) can be used to generate a list of unique strings from the grammar. For this the app will try to expand non-terminals to all possible branches. To control recursions and deep expansions, there are variables to limit this generation.

In the header, on the right, a settings symbol can be clicked to open a modal. Here, one of two syntaxes can be selected (see below), and the mentioned variables can be controlled under advanced.


## Syntax

Currently, two syntaxes are supported:

- FCS, a common syntax I could not find a name for, so I used the abbreviation of the course where I learned about it. Non-terminals are uppercase letters, terminals lowercase (expect when a non-terminal can't be found). Valid symbols for the empty string are ` `, `^` and `ε`.
- BNF, [Backus-Naur form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form). Non-terminals are surrounded by `<>`, terminals by `""` or `''`. A branch can't be left empty, at least the empty string has to be given.

Examples for both are available in the app.


&nbsp;

&nbsp;

&nbsp;


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
