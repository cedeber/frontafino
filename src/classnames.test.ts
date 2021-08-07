import { classNames } from "./classnames";

describe("classNames", () => {
    it("With string", () => {
        expect(classNames("foo")).toBe("foo");
        expect(classNames("foo", "bar")).toBe("foo bar");
    });
    it("With number", () => {
        expect(classNames(12)).toBe("12");
        expect(classNames(12, 34)).toBe("12 34");
    });
    it("With object", () => {
        expect(classNames({ foo: true })).toBe("foo");
        expect(classNames({ bar: false })).toBe("");
        expect(classNames({ foo: true, bar: false })).toBe("foo");
        // Test truthy/falsy values
        expect(classNames({ bar: 0 })).toBe("");
        expect(classNames({ bar: "" })).toBe("");
        expect(classNames({ foo: "bar" })).toBe("foo");
    });
    it("With array", () => {
        expect(classNames(["foo", "bar"], "baz")).toBe("foo bar baz");
        expect(classNames(["foo", "bar"], ["baz"])).toBe("foo bar baz");
    });
    it("With all", () => {
        expect(classNames(["foo", 12], [{ baz: true }, "foobar"])).toBe("foo 12 baz foobar");
    });
});
