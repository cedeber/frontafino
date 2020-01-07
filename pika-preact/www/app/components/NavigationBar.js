import { h } from "/modules/preact.js";
import { css, cx } from "/modules/emotion.js";
import ActiveLink from "./ActiveLink.js";
const nav = css `
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  height: 44px;
  padding: 0 3px;
  width: calc(100% - 6px);
  overflow: hidden;
`;
const list = css `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style: none;
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
`;
const link = css `
  text-decoration: none;
  display: inline-block;
  padding: 11px 17px;
  color: white;
  font-size: 14px;
`;
const icon = css `
  padding: 8px 17px 1px;

`;
export default function NavigationBar() {
    return (h("nav", { className: nav },
        h("ul", { className: list },
            h("li", null,
                h(ActiveLink, { href: "/", css: cx(link, icon) },
                    h("img", { src: "/assets/icon.svg", width: "30", height: "30" }))),
            h("li", null,
                h(ActiveLink, { href: "/users/1", css: link }, "Profile 1")),
            h("li", null,
                h(ActiveLink, { href: "/about", css: link }, "About")))));
}
//# sourceMappingURL=NavigationBar.js.map