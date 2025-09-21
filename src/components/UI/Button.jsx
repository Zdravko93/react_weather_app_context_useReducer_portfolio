function Button({
  ariaLabel,
  ariaExpanded,
  ariaDescribedBy,
  ariaPressed,
  title = "",
  callback,
  className,
  children,
  type = "button",
}) {
  const ariaProps = {};
  // only apply aria-* attributes when they are passed down to <Button> component
  if (ariaLabel) {
    ariaProps["aria-label"] = ariaLabel;
  }

  if (ariaExpanded !== undefined) {
    ariaProps["aria-expanded"] = ariaExpanded;
  }

  if (ariaDescribedBy !== undefined) {
    ariaProps["aria-describedby"] = ariaDescribedBy;
  }

  if (ariaPressed !== undefined) {
    ariaProps["aria-pressed"] = ariaPressed;
  }

  return (
    <button
      {...ariaProps}
      className={className}
      onClick={callback}
      type={type}
      title={title}
    >
      {children}
    </button>
  );
}

export default Button;
