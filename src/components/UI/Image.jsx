function Image({
  imgSrc,
  altText = "",
  className = "",
  ariaDescribedBy = "",
  ...props
}) {
  return (
    <img
      src={imgSrc}
      alt={altText}
      className={className || undefined}
      aria-describedby={ariaDescribedBy || undefined}
      {...props}
    />
  );
}

export default Image;
