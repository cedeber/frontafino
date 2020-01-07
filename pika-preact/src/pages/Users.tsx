import { h } from "/modules/preact.js";
import { useEffect } from "/modules/preact/hooks.js";

interface UsersProps {
  params: {
    name?: string;
  }
}

export default function Users(props: UsersProps) {
  useEffect(() => {
    document.title = `User ${props.params.name} profile`;
  }, []);

  return <div>User {props.params.name}</div>;
}
