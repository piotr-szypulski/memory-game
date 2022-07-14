# **React Minimal Template**

[![CI](https://github.com/piotr-szypulski/react-minimal/actions/workflows/ci.yml/badge.svg)](https://github.com/piotr-szypulski/react-minimal/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Smallest setup required to get React up and running. No CSS preprocessors or testing libraries included, only tools that usually don't change between projects.

## Tools used

- **React 17** with [Fast Refresh](https://github.com/facebook/react/issues/16604)
- **Webpack 5**
- **Babel 7**
- **Eslint 8** with [Airbnb](https://github.com/airbnb/javascript) configuration
- **TailwindCSS** (optional)

## Features

- Linter configured to check [hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks), [accessibility](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) and [recognize webpack aliases](https://github.com/import-js/eslint-plugin-import/tree/main/resolvers/webpack)
- [dotenv](https://github.com/motdotla/dotenv) installed to use environment variables in webpack configuration
- [Fast Refresh](https://github.com/facebook/react/issues/16604) configured to quickly update components without refreshing the page and losing state (successor to [React Hot Loader](https://github.com/gaearon/react-hot-loader))
- Separate branch with [TailwindCSS](https://tailwindcss.com) integrated into the project

## Usage

Installation

Checkout develop branch to work on default project, or Tailwind branch to work with TailwindCSS.

```
yarn install
```

Development

```
yarn run dev
```

Production

```
yarn run prod
```