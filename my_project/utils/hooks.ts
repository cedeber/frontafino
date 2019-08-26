import { useEffect, useMemo } from "react";
import { PROJECT_NAME } from "../settings";

export function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = useMemo(() => title ? title : PROJECT_NAME, [title]);
    }, []);
}
