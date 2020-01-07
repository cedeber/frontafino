import { h, render, Fragment } from "/modules/preact.js";
import { Suspense, lazy } from "/modules/preact/compat.js";
import {
  Switch,
  Route,
  useLocation
} from "/modules/wouter-preact.js";

import Home from "./pages/Home.js";
const Users = lazy(() => import("./pages/Users.js"));
const About = lazy(() => import("./pages/About.js"));

import Loading from "./components/Loading.js";
import NavigationBar from "./components/NavigationBar.js";

function App() {
  const [location] = useLocation();

  return (
    <Fragment>
      <NavigationBar />
      <main className={main}>
        <p>Current location: {location}</p>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/users/:name" component={Users} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
            <Route path="/:rest*">404, not found!</Route>
          </Switch>
        </Suspense>
      </main>
    </Fragment>
  );
}

injectGlobal`
  body {
    margin: 0;
    font-family: -apple-system, system-ui, sans-serif;
    color: #444;
    line-height: 1.5;
  }
`;

const main = css`
  margin-top: 44px;
`;

render(<App />, document.getElementById("__root__")!);
