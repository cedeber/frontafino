import { createContext, Dispatch } from "react";

/* --- Interfaces --- */
interface StoreState {
    text: string;
}

interface StoreContext {
    state: StoreState;
    dispatch: Dispatch<any>;
}

/* --- Initial State --- */
export const initialState: StoreState = {
    text: "default",
};

/* --- Context --- */
export default createContext<StoreContext>({
    state: initialState,
    dispatch: () => {},
});

/* --- Actions --- */
enum Action {
    Text,
}

export function say(text: string) {
    return {
        type: Action.Text,
        text,
    };
}

/* --- Reducers --- */
export function reducer(_previousState: StoreState, action: { type: Action; [key: string]: any }) {
    if (action.type === Action.Text) {
        return { text: action.text };
    }

    throw new Error();
}
