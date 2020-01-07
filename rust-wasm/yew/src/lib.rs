extern crate wasm_bindgen;

// #[macro_use]
extern crate stdweb;

mod app;

use stdweb::web::{document, IParentNode};
use wasm_bindgen::prelude::*;
use yew::App;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // yew::start_app::<app::App>(); // mount on body
    yew::initialize();
    App::<app::App>::new().mount(document().query_selector("#app").unwrap().unwrap());
    yew::run_loop();

    Ok(())
}
