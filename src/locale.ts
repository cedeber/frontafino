const locale = (locales: string[] = ["en"]): string => {
    const locale =
        navigator.language.indexOf("-") === -1
            ? navigator.language
            : navigator.language.split("-")[0];

    return locales.indexOf(locale) === -1 ? locales[0] : locale;
};

export { locale };
