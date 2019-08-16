import { INCREMENT, DECREMENT } from "./actions";

export interface Store {
    value: number;
}

export const initialState: Store = {
    value: 0,
};

export function reducer(previousState: Store, action: any) {
    if (action.type === INCREMENT) {
        return {value: previousState.value + 1};
    }

    if (action.type === DECREMENT) {
        return {value: previousState.value - 1};
    }

    throw new Error();
}
