onmessage = event => {
    const { message } = event.data;

    postMessage({ message });
};
