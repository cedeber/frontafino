Ευκολία (Eukolía)
=================

The best the Web has to offer, probably.

0. Some concerns
----------------

- The less code you write/import, the less bugs you may have.
- Bundlers configuration is boring and mostly unnecessary.
- Classes for UI Components is not the best paradigm.
- CSS in JS is a bad idea. Use `CSS Modules`_, dammit!
- Svelte and Vue have Single File Components if you want to have HTML, CSS and JS in one file.
- I mostly use TypeScript but JavaScript is good enough.
- Avoid VirtualDOM-based libraries, it's slow.

1. React hooks
--------------

Yes, hooks only.

- Parcel
- React
- Redux
- Apollo
- Wouter (or React Router soon)

2. Next.js (React SSR)
----------------------

More to come...

3. Preact (ES2017+)
-------------------

This one is the React hooks alternative that focuses on lightness.
If you don't need SSR, like with `Next.js`_, prefer this one.

- Pika (Snowflake)
- Preact
- Context (or Redux)
- Apollo
- Wouter

4. Sapper / Svelte
------------------

- Sapper works with Rollup
- Svelte
- try `IBM UI`_ ?

5. Rust and WebAssembly
-----------------------

Web Assembly is not necessarily more efficient than a JS library.

- Actix_ Web Framework.
- Yew_ VirtualDOM library.
- Web-sys (and JS-sys) provides access to the DOM API.

X. Others
---------

Some other libraries could also have had the focus here, but I prefer some patterns for the ones I've chosen bellow.

- Vue_ (still use VirtualDOM and I like React hooks more. I used Vue before React hooks, it's great)
- LitHtml_ or LitElement_ (No VirtualDOM and light)
- LighterHTML_ (The big brother of lit-html, probably lighter and more performant than Lit)
- htm_ (string literals JSX alternative, very light)


.. _Vue: https://vuejs.org
.. _LitHtml: https://lit-html.polymer-project.org
.. _LitElement: https://lit-element.polymer-project.org
.. _LighterHTML: https://github.com/WebReflection/lighterhtml
.. _htm: https://github.com/developit/htm
.. _Next.js: https://nextjs.org
.. _Svelte: https://svelte.dev/
.. _CSS Modules: https://github.com/css-modules/css-modules
.. _IBM UI: https://ibm.github.io/carbon-components-svelte/
.. _Actix: https://actix.rs/
.. _Yew: https://yew.rs/docs/
