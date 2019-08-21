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
| 📑 | [Redux](https://redux.js.org/) | `react-redux` with Hooks. The `useReducer` hook is used instead. |

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

# Code organization
I've decided to try to organize source files a bit like Django does it. In a sense that we don't have a `components`, a
`pages`, and probably a `redux` folders flat structure.

## Project folder
So the first idea is to have a **project** folder, where all generic/reusable files are saved. In this boilerplate,
`boilerplate` is the project name, and so the name of the project folder as well.
Here we find assets, global styles (variables, mixins, functions) and some utilities. The organisation of this folder
is a bit up to you as there is no settings files, unlike Django.

## Application(s) folder(s)
### Apps
Django is used to have some "app" folders, like `news`, `blog` or `polls` because they are deeply dependants to the
Database models. This is the idea I like about Django and what I try to do here as well.
Often in React applications we are used to have a central Redux store which is the unique place of truth for the data.
The store pattern is a good idea, but having all the logic of all parts of the application in one place is probably
not the best logic organisation ever made. There is no real separation of contexts.

### Views
I also don't see any reasons to have a separation between `pages` and `components`. A page, is a component, rendering
other components or DOM nodes, like any other components in fact. In addition, `pages` are often just a part of single
page where the Router render them. So they are not even pages themselves.

Let's call them both `views`.

**The entry point is `views.tsx`**.
Up to you to create a `views` folder which contains the files imported by this entry points.

#### Urls
The `url.tsx` file is simply a part of a view where you configure the Router. It makes it easier to find which routes or
sub-routes are configured between the "apps".

**The entry point is `urls.tsx`**.

### Store
The store pattern introduced by Redux is good. Let's keep it like it is, but per "app". Which means you can have an "app"
called `main` or `central`, responsible of managing the whole application, like user preferences, theme or whatever else,
 which can have a store shared between the other "apps".
 
In this boilerplate, the React `useReducer` hook is used in place of Redux. The patterns are nearly the same.
Up to you to choose the tool you prefer.

**The entry point is `stores.tsx`**.
Up to you to create a `stores` folder which contains the actions and the reducers for instance.

### Styles
CSS Modules rocks. Mixed with SASS.

**The entry point is `styles.scss`**.

### Workers, Web assembly, Assets...
Simply create `workers`, `assembly`, `assets`... folders as you need. No limitations.

# Electron
[Electron](https://electronjs.org/) is currently not included in this boilerplate, but it shouldn't be challenging
to migrate to it. Currently Wouter is not able to navigate without the History API. You could use the
`MemoryRouter` from [React Router](https://reacttraining.com/react-router/) so that you don't need a web server
to redirect the route to `index.html`.
