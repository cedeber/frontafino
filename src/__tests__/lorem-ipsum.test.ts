import { lipsum, toText } from "../lorem-ipsum";

describe("Lorem Ipsum", () => {
    it("as array", () => {
        const value = lipsum(2, 2, 5, 5);
        expect(value).toHaveLength(2);
        expect(value[0]).toHaveLength(5);
    });

    it("as string", () => {
        const value = toText(lipsum(1, 1, 2, 2));
        expect(value.split(" ")).toHaveLength(2);
    });
});
