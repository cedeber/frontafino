const ctx: Worker = self as any;

ctx.onmessage = event => {
    const { message } = event.data;

    ctx.postMessage({ message });
};
