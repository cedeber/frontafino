import { createStore } from "redux";
import app from "./reducers";

export default createStore(
    app,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
);
