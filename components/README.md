# Eukolía Components
| Name | Description |
| ---  | --- |
| [Page Snap](#page-snap) | A scroll Snap that doesn't control you. |
| [Sticky Slot](#sticky-slot) | Keep any Element sticky on the top of the page. |

## Page Snap
A scroll Snap that doesn't control you.
It means the user's scroll is controlling the snap and not the contrary.
Only when the scroll ends the snap centers itself in the middle of the viewport.

```html
<page-snap>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>...</div>
</page-snap>
```

```javascript
import PageSnap from "./page-snap.js";

customElements.define("page-snap", PageSnap);
```

## Sticky Slot
Keep any Element sticky on the top of the page.

```html
<sticky-slot data-margin-top="50">
    <p>Hello, World!</p>
</sticky-slot>
```
The `data-margin-top` configuration is optional.

```javascript
import Sticky from "./sticky.js";

customElements.define("sticky-slot", Sticky);
```
