import { h } from "/modules/preact.js";
import { useRoute, Link } from "/modules/wouter/preact/index.js";
import { css, cx } from "/modules/emotion.js";

interface ActiveLinkProps {
  href: string;
  css?: string;
  children: any;
}

const inactive = css`
  opacity: 1;
`;

const active = css`
  opacity: 0.65;
`;

const hover = css`
  :hover {
    transition: opacity 200ms;
    opacity: 0.65;
  }
`;

export default function ActiveLink(props: ActiveLinkProps) {
  const [isActive] = useRoute(props.href);

  const style = cx(props.css, isActive ? active : cx(inactive, hover));

  return (
    <Link {...props}>
      <a class={style}>{props.children}</a>
    </Link>
  );
}
