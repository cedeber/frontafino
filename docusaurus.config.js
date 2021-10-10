/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Frontafino",
    organizationName: "cedeber",
    projectName: "frontafino",
    url: "https://cedeber.github.io",
    baseUrl: "/frontafino/",
    trailingSlash: false,
    tagline: "JavaScript Utilities and React Hooks.",
    plugins: [["@docusaurus/plugin-content-docs", { routeBasePath: "/" }]],
    themes: ["@docusaurus/theme-classic"],
    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: "Frontafino",
            items: [
                {
                    href: "https://github.com/cedeber/frontafino",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
    },
};
