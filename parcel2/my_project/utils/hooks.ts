import { useEffect, useMemo } from "react";
import { PROJECT_NAME } from "../settings";

export function useDocumentTitle(title: string) {
    const documentTitle = useMemo(() => title ? title : PROJECT_NAME, [title]);

    useEffect(() => {
        document.title = documentTitle;
    }, []);
}
