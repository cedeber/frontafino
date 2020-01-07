const ctx = (self as unknown) as Worker;

ctx.onmessage = event => {
  const { message, time = 0 } = event.data;

  setTimeout(() => ctx.postMessage({ message }), time);
};
