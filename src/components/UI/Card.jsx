export default function Card({
  WRAPPER: Wrapper = "li",
  ariaLabel,
  ariaLive,
  ariaRole,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
  children,
}) {
  return (
    <Wrapper
      aria-label={ariaLabel || undefined}
      aria-live={ariaLive !== "off" ? ariaLive : undefined}
      aria-labelledby={ariaLabelledBy || undefined}
      aria-describedby={ariaDescribedBy || undefined}
      role={ariaRole || undefined}
      className={className || undefined}
    >
      {children}
    </Wrapper>
  );
}
