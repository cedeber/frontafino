declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
}

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

// Rust
declare module "*.rs";

// SASS
declare module "*.scss" {
    const styles: {[key: string]: any};
    export default styles;
}

declare module "*.sass" {
    const styles: {[key: string]: any};
    export default styles;
}
