import { normalize } from "../src/normalize";

it("normalize", () => {
    expect(normalize(0.5, -1, 1, 10, 20)).toBe(17.5);
});
