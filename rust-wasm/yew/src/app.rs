use yew::{html, Component, ComponentLink, Html, ShouldRender};

pub struct App {
    // also called Model for Component
    clicked: bool,
    value: i64,
}

pub enum Msg {
    Click,
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(_: Self::Properties, _: ComponentLink<Self>) -> Self {
        App {
            clicked: false,
            value: 0,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Click => {
                self.clicked = !self.clicked;
                self.value = self.value + 1;
                true // Indicate that the Component should re-render
            }
        }
    }

    fn view(&self) -> Html<Self> {
        let button_text = if self.clicked {
            "Clicked!"
        } else {
            "Click me!"
        };

        html! {
            <>
                <button onclick=|_| Msg::Click>{ button_text }</button>
                <p>{ self.value }</p>
            </>
        }
    }
}
