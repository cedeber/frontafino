# Frontafino

JavaScript Utilities and Experiments.

## Utilities

| Name                                          | Description                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Dynamic Styles](#dynamics-styles)            | Set CSS styles to multiple elements at once.                                          |
| [Scroll Into Viewport](#scroll-into-viewport) | Scroll to any Element to make it visible into the viewport.                           |
| [Tagged DOM](#tagged-dom)                     | DocumentFragment Tagged templates with Promises and Proxies.                          |
| [Vertical State](#vertical-state)             | Know where any Element is verticaly positionned in the page compared to the viewport. |
| [Async Loader](#async-loader)                 | Load JS and CSS asynchronously.                                                       |
| [Constant Enums](#constant-enums)             | Simulate an Enum data type.                                                           |
| [Event Emitter](#event-emitter)               | A simple event handler & emitter.                                                     |
| Futch Upload                                  | Fetch like function that supports upload progress.                                    |
| Hash Router                                   | Simple router with #.                                                                 |
| [Lorem Ipsum](#lorem-ipsum)                   | Lorem ipsum generator.                                                                |
| [Proxy Storage](#proxy-storage)               | Web Storage with Cookie fallback via a Proxy.                                         |
| [Service Worker](#service-worker)             | A collection of Service Worker strategies.                                            |

## Experiments

| Name                                                      | Description |
| :-------------------------------------------------------- | :---------- |
| [Expandable Lightbox](./experiments/expandable-lightbox/) | ...         |
| [Fluent Proxy](./experiments/fluent-proxy/)               | ...         |
| [Pimiö](./experiments/pimio/)                             | ...         |
| [Minimal PWA](./experiments/pwa-minimal/)                 | ...         |
| [Simple Worker](./experiments/simple-worker/)             | ...         |

## Dynamics Styles

```javascript
const word1 = document.getElementById("word1");
const word2 = document.getElementById("word2");
const wordsStyles = dynamicStyles(word1);

wordsStyles.styles = {
    color: "hotpink",
    fontWeight: "300",
};

wordsStyles.add(word2);

setTimeout(() => {
    wordsStyles.color = "crimson";
}, 1500);

setTimeout(() => {
    wordsStyles.clear();
}, 3000);
```

## Scroll Into Viewport

Scroll to any Element to make it visible into the viewport. The scroll is not
based on time, but on distance. The longer in distance, the longer in time.

```javascript
import scrollIntoViewport from "./scroll-into-viewport.js";

// all options are optionals, these are the defaults
const scrollTo = scrollIntoViewport(
    0, // top margin
    35, // 35 pixels per frame, at 60fps
    (time, duration) => [..] // Easing function. Default is easeOutCubic
);

scrollTo(document.body);

// or with default values and direct call
scrollIntoViewport()(document.body);
```

## Tagged DOM

DocumentFragment Tagged templates with Promises and Proxies.

The `render` function renders the DocumentFragment into the Node and
the resolution of Promises will live replace the tags and so it can create lots
of reflow. The Promise support is only available for Nodes.

The expressions of the tagged template can be:

-   a function that returns anything from this list
-   a Promise that resolves to anything from this list
-   another dom object
-   a DocumentFragment or a Node
-   a string or a number
-   undefined or null

```javascript
import dom from "./tagged-dom.js";

let salutation = "Hello";
let who = [
    new Promise((resolve) => setTimeout(() => resolve("world"), 250)),
    () => new Promise((resolve) => setTimeout(() => resolve("!"), 800)),
];

const partial = dom`<p>${salutation}, ${who}</p>`;
partial.render(document.body); // => <p>Hello, world!</p>
```

In order to update a part of any Fragment you can create a hole by returning
a Promise within a Node and give that Node a `:proxy` attribute.
Use it as a property name of the returned proxy. You have access to
the proxy holes created only on this dom object.

```javascript
const partial = dom`
    <p>
        Woohoo
        <span :proxy="rocks">
            ${Promise.resolve("")} <!-- or ${dom``} -->
        </span>
        !
    </p>
`;

partial.render(document.body).then((proxy) => (proxy.rocks = dom`, <strong>Proxy rocks</strong>`));
```

In case you want to have access to the proxy in an inner part of the rendering tree,
you still need to render the fragment but you can't append it to any element.
Simply call the render function without parameters.

```javascript
fragment.render().then(proxy => [..]);
```

In order to add event listeners or to do whatever you like to the DOM, you will
have access to the created DocumentFragment. As it is live, all modifications done
asynchronously will be available too.

```javascript
const partial = dom`<div role="button" class="button">click here</div>`;

partial.fragment.querySelector(".button").addEventListener("click", event => [..]);
```

## Vertical State

Know where any Element is verticaly positionned in the page compared to the viewport.

```javascript
import verticalState from "./vertical-state.js";

const vState = verticalState();

const {
    topPosition, // distance between the top of the page and the Element
    topProgress,
    bottomProgress,
    ahead, // after the viewport
    entering, // entering the viewport from the bottom
    contained, // entirely visible in the viewport
    exiting, // quitting the page by the top
    behind, // above the viewport
} = vState(document.body.querySelector("main"));
```

## Async Loader

Load JS and CSS asynchronously. A `script` or `link` tag is appended into the
document head. The same url will not be loaded more than once.

```javascript
import { loadJS, loadCSS } from "./async-loader.js";

loadJS("https://www.cedeber.fr/a-javascript-file.js");
loadCSS("https://www.cedeber.fr/a-style-file.css");

// if you need to change the media type, you can add a second parameter
loadCSS("https://www.cedeber.fr/print.css", "print");
```

## Constant Enums

Simulate an Enum data type based on `Proxy` and `Symbol`

```javascript
import Enum, { toSymbol, asList } from "./constant-enums.js";

const EnumSymbol = toSymbol(Enum);
const EnumList = asList(Enum);
const EnumSymbolList = asList(toSymbol(Enum));

const e1 = Enum({ ONE: 1 });
const e2 = Enum({ ONE: 1 });
const e3 = EnumSymbol({ ONE: 1 });
const e4 = EnumSymbol({ ONE: 1 });
const e5 = EnumList("ONE", "TWO");
const e6 = EnumSymbolList("ONE", "TWO");

console.log(e1, e2); // => Proxy {ONE: 1}, Proxy {ONE: 1}
console.log(e1.ONE === e2.ONE); // => true (1 === 1)
console.log(e3, e4); // => Proxy {ONE: Symbol(1)}, Proxy {ONE: Symbol(1)}
console.log(e3.ONE == e4.ONE); // => false (Symbol("1") !== Symbol("1"))
console.log(e5); // => Proxy {ONE: "ONE", TWO: "TWO"}
console.log(e6); // => Proxy {ONE: Symbol(ONE), TWO: Symbol(TWO)}
```

## Event Emitter

A simple event handler & emitter

```javascript
import EventEmitter from "./event-emitter.js";

const events = new EventEmitter();

// Register an event
events.on("myevent", myEventCallback);
events.once("anotherevent", myEventCallback); //=> will run only once

function myEventCallback(p1, p2) {
    console.log(`${p1}, ${p2}!`);
}

// Emit an event
events.emit("myevent", "Hello", "world"); //=> "Hello, world!"
events.emit("myevent", "Hello", "foo"); //=> "Hello, foo!"
events.emit("anotherevent", "Hello", "bar"); //=> "Hello, bar!"
events.emit("anotherevent", "Hello", "doe"); //=> nothing, already called once

// Remove an event
events.remove("myevent", myEventCallback);
events.emit("myevent", "Hello", "world"); //=> doesn't exist anymore
```

## Lorem Ipsum

Generate lorem ipsum.

```javascript
import lipsum, { toSentence } from "./lorem-ipsum.js";

// Return an array containing between 3 to 5 arrays containing each between 10 to 20 words
const lorem = lipsum(3, 5)(10, 20); // => string[][]

// You can also create a sentences function
const sentences = lipsum(3, 5);
sentences(10, 20); // => string[][]

// Or transform the lipsum function to return a string instead of an array.
const paragraph = toSentence(lipsum);
paragraph(3, 5)(10, 20); // => string
```

## Proxy Storage

Web Storage with Cookie fallback via a Proxy.

```javascript
import { storage, session } from "./proxy-storage.js"; // or import storage
// storage => localStorage
// session => sessionStorage

// equivalent to *Storage.setItem("foo", "bar");
storage.foo = "bar";

// equivalent to *Storage.getItem("foo");
storage.foo; // => "bar"

// doesn't have *Storage equivalent
storage.foo ? "yes" : "no"; // => "yes"

// equivalent to *Storage.removeItem("foo");
delete storage.foo;
```

## Service Worker

A collection of Service Worker strategies.

```javascript
importScripts("service-worker.js");

const appCacheName = "cache-v1";

// Clear all unused caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                cacheNames
                    .filter((cacheName) => cacheName !== appCacheName)
                    .map((cacheName) => caches.delete(cacheName)),
            ),
    );
});

// All requests
self.addEventListener("fetch", (event) => {
    const requestUrl = event.request.url;

    // Apply SW strategies here
    if (/cedeber.fr/.test(requestUrl)) {
        event.respondWith(staleWhileRevaliate(appCacheName, event));
    } else {
        event.respondWith(networkOnly(event));
    }
});

/* --- Network first ---
 * Send a Request to the network and if available save it to the cache or take it
 * from the cache if any.
 */
event.respondWith(networkFirst(appCacheName, event));

/* --- Cache first ---
 * Retrieve the Response from the cache if available or do a request to the network
 * and save it.
 */
event.respondWith(cacheFirst(appCacheName, event));

/* --- Stale while revalidate ---
 * Retrieve the Reponse form the cache and send it to the browser if available.
 * Do a request in the background in order to update the cache. Send it back if no
 * cache was available.
 */
event.respondWith(staleWhileRevalidate(appCacheName, event));

/* --- Network only ---
 * Do a request to the network only.
 */
event.respondWith(networkOnly(event));

/* --- Cache only ---
 * Retrive a Response from the cache only.
 */
event.respondWith(cacheOnly(appCacheName, event));
```

## License

Copyright (c) 2015-2021 Cédric Eberhardt - MIT License
