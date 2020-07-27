import React from "react";

type Actions = "increment" | "decrement";
type Action = { type: Actions };
type Dispatch = (action: Action) => void;
type State = { count: number };
type CountProviderProps = React.PropsWithChildren<any>;

const CountStateContext = React.createContext<State | undefined>(undefined);
const CountDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function countReducer(state: State, action: Action) {
    switch (action.type) {
        case "increment": {
            return { count: state.count + 1 };
        }
        case "decrement": {
            return { count: state.count - 1 };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function CountProvider({ children }: CountProviderProps) {
    const [state, dispatch] = React.useReducer(countReducer, { count: 0 });

    return (
        <CountStateContext.Provider value={state}>
            <CountDispatchContext.Provider value={dispatch}>
                {children}
            </CountDispatchContext.Provider>
        </CountStateContext.Provider>
    );
}

function useCountState() {
    const context = React.useContext(CountStateContext);
    if (context === undefined) {
        throw new Error("useCountState must be used within a CountProvider");
    }
    return context;
}

function useCountDispatch() {
    const context = React.useContext(CountDispatchContext);
    if (context === undefined) {
        throw new Error("useCountDispatch must be used within a CountProvider");
    }
    return context;
}

function useCount(): [State, Dispatch] {
    return [useCountState(), useCountDispatch()];
}

export { CountProvider, useCount };
