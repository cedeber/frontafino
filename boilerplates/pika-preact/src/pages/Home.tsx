import { h } from "/modules/preact.js";
import { useEffect, useState, useRef } from "/modules/preact/hooks.js";
import { css } from "/modules/emotion.js";

import { uid } from "../utils/string.js";

const textColor = css`
  color: crimson;
`;

export default function Home() {
  const [name, setName] = useState("world");
  const worker = useRef(new Worker("/app/workers/ping.js"));

  useEffect(() => {
    document.title = "Home Page";

    worker.current.onmessage = event => {
      const { message } = event.data;

      setName(message);
    };

    worker.current.postMessage({ message: uid(), time: 2000 });

    return function cleanup() {
      worker.current.terminate();
    };
  }, []);

  return <div class={textColor}>Hello, {name}!</div>;
}
