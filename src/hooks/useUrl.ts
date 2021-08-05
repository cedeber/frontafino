const useURLSearchParamsList = (key: string): string[] | null => {
    const { search } = document.location;
    const searchParams = new URLSearchParams(search);
    return searchParams.get(key)?.split(",") ?? null;
};

export { useURLSearchParamsList };
