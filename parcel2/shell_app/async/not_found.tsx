import React from "react";
import { useDocumentTitle } from "../../my_project/utils/hooks";

export default function NotFoundPage() {
    useDocumentTitle("Page not found");

    return <div>Page not found</div>;
}
