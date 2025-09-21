function Input({ ariaLabel, ariaDescribedBy, className, onFocus, ...rest }) {
  const ariaProps = {};

  if (ariaLabel) {
    ariaProps["aria-label"] = ariaLabel;
  }

  if (ariaDescribedBy) {
    ariaProps["aria-describedby"] = ariaDescribedBy;
  }

  return (
    <input className={className} onClick={onFocus} {...ariaProps} {...rest} />
  );
}

export default Input;
