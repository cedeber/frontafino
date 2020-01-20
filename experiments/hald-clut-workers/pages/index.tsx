import React from "react";
import Head from "next/head";
import { LoadingContext } from "../components/context";
import Editor from "../components/editor";
import LoadingBar from "../components/loading-bar";

export default class Index extends React.Component {
    state = {
        loading: {
            loadingPercent: 0,
            loadingChange: value => this.loadingChange(value),
        },
    };

    loadingChange(value) {
        this.setState({
            loading: Object.assign(this.state.loading, {
                loadingPercent: value,
            }),
        });
    }

    componentDidMount() {
        navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
    }

    render() {
        return <>
            <Head>
                <title>Pimiö · Analog film simulation</title>
                <meta charSet="utf-8"/>
                <meta name="description" content="Simulate good and old analog film with HaldCLUT"/>
                <meta name="author" content="Cédric Eberhardt"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>

                <link rel="preload" href="/static/fonts/3904C6_0_0.woff2" as="font" crossOrigin="true"/>
                <link rel="preload" href="/static/fonts/3904C6_1_0.woff2" as="font" crossOrigin="true"/>

                <meta name="application-name" content="Pimiö"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="theme-color" content="#2D2D2D"/>
                <link rel="icon" sizes="192x192" href="/static/icons/touch-icon.png"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-title" content="Pimiö"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
                <meta name="format-detection" content="telephone=no"/>
                <link rel="apple-touch-icon" href="/static/icons/apple-touch-icon.png"/>
                <link rel="mask-icon" href="/static/icons/website-icon.svg" color="#6699CC"/>
                <link rel="manifest" href="/manifest.webmanifest"/>
            </Head>
            <LoadingContext.Provider value={this.state.loading}>
                <Editor/>
                <LoadingBar/>
            </LoadingContext.Provider>
            <style global jsx>{`
                @font-face {
                    font-family: 'EssentialPragmataPro';
                    src: url('/static/fonts/3904C6_1_0.woff2') format('woff2');
                    font-display: fallback;
                }

                @font-face {
                    font-family: 'EssentialPragmataPro';
                    src: url('/static/fonts/3904C6_0_0.woff2') format('woff2');
                    font-weight: bold;
                    font-display: fallback;
                }


                :root {
                    /* Colors - Base 16 */
                    --base00: #2d2d2d;
                    --base01: #393939;
                    --base02: #515151;
                    --base03: #747369;
                    --base04: #a09f93;
                    --base05: #d3d0c8;
                    --base06: #e8e6df;
                    --base07: #f2f0ec;
                    --red: #f2777a;
                    --orange: #f99157;
                    --yellow: #ffcc66;
                    --green: #99cc99;
                    --cyan: #66cccc;
                    --blue: #6699cc;
                    --violet: #cc99cc;
                    --magenta: #d27b53;
                }

                html {
                    overflow: hidden;
                }

                body {
                    background-color: var(--base00);
                    margin: 0;
                    font-family: EssentialPragmataPro, system-ui, -apple-system, serif;
                    color: var(--base07);
                    font-size: 14px;
                }

                img, canvas {
                    display: block;
                }

                ul {
                    list-style: none;
                }
            `}</style>
        </>;
    }
}
