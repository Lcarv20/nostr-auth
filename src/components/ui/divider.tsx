import { cx } from "class-variance-authority";
import React from "react";

export default function Divider({
  direction = "horizontal",
  className,
}: {
  direction?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "h-1 bg-muted",
        direction === "horizontal" ? "w-full" : "h-full w-px",
        className,
      )}
    ></div>
  );
}
