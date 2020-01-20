import React from "react";

export interface ILoadingContext {
    loadingPercent: number;
    loadingChange: (value: number) => void;
}

export const LoadingContext: React.Context<ILoadingContext> =
    React.createContext({
        loadingPercent: 0,
        loadingChange() {},
    });
