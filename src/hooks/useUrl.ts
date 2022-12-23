export const useURLSearchParamSingleValue = (key: string): string | null => {
	const searchParams = new URLSearchParams(window.location.search);
	return searchParams.get(key) ?? null;
};

export const useURLSearchParamsList = (key: string): string[] | null => {
	const searchParam = useURLSearchParamSingleValue(key);
	return searchParam?.split(",") ?? null;
};

export const useURLSearchParam = (key: string): string | undefined => {
	const searchParams = useURLSearchParamsList(key);
	return searchParams?.[0];
};
