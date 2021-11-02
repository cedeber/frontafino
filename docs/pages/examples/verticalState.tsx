import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import style from "./verticalState.module.css";
import { verticalState } from "../../../src";
import { VerticalState } from "../../../src/vertical-state";

export default () => {
    const ref = useRef<HTMLDivElement>(null);
    const [vState, setVState] = useState<VerticalState | null>(null);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (ref.current) setVState(verticalState(ref.current));
        });
    }, []);

    return (
        <Layout title="Hello">
            <div className={style.data}>
                <span>topPosition: {vState?.topPosition}px</span>
                <span>topProgress: {vState?.topProgress}</span>
                <span>bottomProgress: {vState?.bottomProgress}</span>
                <span>ahead: {String(vState?.ahead)}</span>
                <span>entering: {String(vState?.entering)}</span>
                <span>inside: {String(vState?.inside)}</span>
                <span>contained: {String(vState?.contained)}</span>
                <span>exiting: {String(vState?.exiting)}</span>
                <span>behind: {String(vState?.behind)}</span>
            </div>
            <div className={style.test}>
                <div ref={ref} className={style.box} />
            </div>
        </Layout>
    );
};
