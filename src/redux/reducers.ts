import { INCREMENT, DECREMENT } from "./actions";

export interface Store {
    value: number;
}

const initialState: Store = {
    value: 0,
};

export default function appReducer(previousState = initialState, action: any) {
    if (action.type === INCREMENT) {
        return {value: previousState.value + 1};
    }

    if (action.type === DECREMENT) {
        return {value: previousState.value - 1};
    }

    return previousState;
}
