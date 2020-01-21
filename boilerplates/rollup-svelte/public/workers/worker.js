importScripts("./comlink.js");

const obj = {
    counter: 0,
    inc() {
        this.counter++;
    }
};

Comlink.expose(obj);
