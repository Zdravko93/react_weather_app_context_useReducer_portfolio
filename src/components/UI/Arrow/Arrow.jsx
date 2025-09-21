import React from "react";

const Arrow = React.memo(function Arrow({
  direction,
  className = "",
  ariaLabel = "Arrow",
}) {
  const isRight = direction === "right";

  // set path based on 'direction' prop
  const path = isRight
    ? "m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    : "m12.75 9-3 3m0 0 3 3m-3-3h7.5M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z";

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="orange"
      className={className}
    >
      <title>{ariaLabel}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
});

export default Arrow;
