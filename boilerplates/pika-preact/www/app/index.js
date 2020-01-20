import { h, render, Fragment } from "/modules/preact.js";
import { Suspense, lazy } from "/modules/preact/compat.js";
import { Switch, Route, useLocation } from "/modules/wouter/preact/index.js";
import { css, injectGlobal } from "/modules/emotion.js";
import Home from "./pages/Home.js";
const Users = lazy(() => import("./pages/Users.js"));
const About = lazy(() => import("./pages/About.js"));
import Loading from "./components/Loading.js";
import NavigationBar from "./components/NavigationBar.js";
function App() {
    const [location] = useLocation();
    return (h(Fragment, null,
        h(NavigationBar, null),
        h("main", { className: main },
            h("p", null,
                "Current location: ",
                location),
            h(Suspense, { fallback: h(Loading, null) },
                h(Switch, null,
                    h(Route, { path: "/users/:name", component: Users }),
                    h(Route, { path: "/about", component: About }),
                    h(Route, { path: "/", component: Home }),
                    h(Route, { path: "/:rest*" }, "404, not found!"))))));
}
injectGlobal `
  body {
    margin: 0;
    font-family: -apple-system, system-ui, sans-serif;
    color: #444;
    line-height: 1.5;
  }
`;
const main = css `
  margin-top: 44px;
`;
render(h(App, null), document.getElementById("__root__"));
//# sourceMappingURL=index.js.map