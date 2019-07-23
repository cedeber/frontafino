// Images
declare module "*.svg" {
  const svg: any;
  export default svg;
}

declare module "*.png" {
  const png: any;
  export default png;
}

declare module "*.jpg" {
  const jpg: any;
  export default jpg;
}

// Web fonts && Font Loading API
declare module "*.ttf" {
  const font: any;
  export default font;
}

// JSON
declare module "*.json" {
  const json: object | any[];
  export default json;
}

// WASM
declare module "*.wasm" {
  const wasm: object | any[];
  export default wasm;
}

declare interface Window {
  $: any;
  jQuery: any;
}

