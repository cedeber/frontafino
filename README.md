# React-like Web Application boilerplate

| | Technologies |
| --- | --- |
| 📱 | Progressive Web Application |
| ⚙️ | Web Workers and Service Worker |
| 🧬 | Web Assembly |

Currently it doesn't support Server Side Rendering.

## Bundler
| | Name | Description |
| :---: | --- | --- |
| 📦 | [Parcel](https://parceljs.org/) | Zero configuration |

## Libraries and Tools
| | Name | Description |
| :---: | --- | --- |
| 📺 | [Preact X](https://preactjs.com/) | lighter than React + Hooks |
| 🛤 | [Wouter](https://github.com/molefrog/wouter) | router with Hooks |
| 🎊 | [CSS Modules](https://github.com/css-modules/css-modules) | better than CSS-in-JS |

### Optional
| | Name | Description |
| :---: | --- | --- |
| 📑 | [Redux](https://redux.js.org/) | `react-redux` with Hooks |

## Languages
| | Name | Description |
| :---: | --- | --- |
| 📜 | [TypeScript](https://www.typescriptlang.org/) | |
| 💎 | [SCSS](https://sass-lang.com/) | |
| 🧬 | [Rust](https://www.rust-lang.org/) | |

## Linters
| | Name | Description |
| :---: | --- | --- |
| 🧽 | [ESLint](https://eslint.org/) | with TypeScript, React, Hooks, A11y, Compat, GraphQL, Prettier |
| 🧽 | [Stylelint](https://stylelint.io/) | with recommended rules for SCSS, Prettier |

# Electron
[Electron](https://electronjs.org/) is currently not included in this boilerplate, but it shouldn't be challenging
to migrate to it. Currently Wouter is not able to navigate without the History API. You could use the
`MemoryRouter` from [React Router](https://reacttraining.com/react-router/) so that you don't need a web server
to redirect the route to `index.html`.
