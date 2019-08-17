import { createContext, Dispatch } from "react";
import { add } from "./assembly/math.rs";

/* --- Interfaces --- */
interface StoreState {
    value: number;
}

interface StoreContext {
    state: StoreState;
    dispatch: Dispatch<any>;
}

/* --- Initial State --- */
export const initialState: StoreState = {
    value: 0,
};

/* --- Context --- */
export default createContext<StoreContext>({
    state: initialState,
    dispatch: () => {},
});

/* --- Actions --- */
enum Action {
    Increment,
    Decrement,
}

export function increment(qqty = 1) {
    return {
        type: Action.Increment,
        qqty,
    };
}

export function decrement(qqty = 1) {
    return {
        type: Action.Decrement,
        qqty,
    };
}

/* --- Reducers --- */
export function reducer(previousState: StoreState, action: { type: Action; [key: string]: any }) {
    if (action.type === Action.Increment) {
        return { value: add(previousState.value, action.qqty) };
    }

    if (action.type === Action.Decrement) {
        return { value: add(previousState.value, action.qqty * -1) };
    }

    throw new Error();
}
