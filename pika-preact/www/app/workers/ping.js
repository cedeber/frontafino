const ctx = self;
ctx.onmessage = event => {
    const { message, time = 0 } = event.data;
    setTimeout(() => ctx.postMessage({ message }), time);
};
//# sourceMappingURL=ping.js.map