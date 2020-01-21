import * as Comlink from "../web_modules/comlink";

const obj = {
    counter: 0,
    inc() {
        this.counter++;
    }
};

Comlink.expose(obj);
