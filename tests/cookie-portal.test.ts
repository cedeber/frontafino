import "expect-puppeteer";
import path from "path";

describe("Google", () => {
    beforeAll(async () => {
        await page.goto(`file:${path.join(__dirname, "cookie-portal.html")}`);
    });

    it('should display "google" text on page', async () => {
        await expect(page).toMatch("cookie");
    });
});
