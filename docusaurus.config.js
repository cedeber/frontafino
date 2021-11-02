/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Frontafino",
    organizationName: "cedeber",
    projectName: "frontafino",
    url: "https://cedeber.github.io",
    baseUrl: "/frontafino/",
    trailingSlash: false,
    tagline: "JavaScript Utilities and React Hooks.",
    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            { path: "docs", sidebarPath: "./sidebars.js", routeBasePath: "/" },
        ],
        ["@docusaurus/plugin-content-pages", { path: "docs/pages" }],
    ],
    themes: ["@docusaurus/theme-classic"],
    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: "Frontafino",
            items: [
                {
                    href: "https://www.npmjs.com/package/@cedeber/frontafino",
                    label: "npm",
                    position: "right",
                },
                {
                    href: "https://github.com/cedeber/frontafino",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            copyright: `Copyright © 2015-${new Date().getFullYear()} Cédric Eberhardt - MIT License.`,
        },
    },
};
