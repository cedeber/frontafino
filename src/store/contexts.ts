import { createContext, Dispatch } from "react";
import { initialState, Store } from "./reducers";

interface StoreContext {
    state: Store;
    dispatch: Dispatch<any>;
}

export const StoreContext = createContext({
    state: initialState,
    dispatch: (_: any) => {},
});
