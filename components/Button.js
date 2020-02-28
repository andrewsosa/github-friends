import * as React from "react";

type ButtonProps = {
  children: React.Node,
  onClick: () => any,
  primary: ?boolean,
  small: ?boolean,
  block: ?boolean,
  disabled: ?boolean,
  className: ?string,
};

const Button = ({
  children,
  onClick,
  primary,
  small,
  block,
  className,
  disabled,
  ...rest
}: ButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-disabled={disabled}
    className={`btn ${className} ${primary && "btn-primary"} ${small &&
      "btn-sm"} ${block && "btn-block"}`.trim()}
    {...rest}
  >
    {children}
  </button>
);

export default Button;

// // // // // // // // // // // // // // // // // // // // // // // // // //

interface LinkButtonProps {
  children: React.Node;
  href: string;
  primary: ?boolean;
  small: ?boolean;
  block: ?boolean;
  className: ?string;
}

export const LinkButton = ({
  children,
  href,
  primary,
  small,
  className,
  block,
  ...rest
}: LinkButtonProps) => (
  <a
    role="button"
    href={href}
    className={`btn ${className} ${primary && "btn-primary"} ${small &&
      "btn-sm"} ${block && "btn-block"}`.trim()}
    {...rest}
  >
    {children}
  </a>
);
