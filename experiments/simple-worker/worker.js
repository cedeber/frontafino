let ctx = self;

self.addEventListener("message", event => {
    let {a, b} = event.data;
    let sum = a + b;

    ctx.postMessage(sum);
});
