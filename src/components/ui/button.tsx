"use client";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/styles/site.stylex";
import { type StyledProps, type XStyle } from "@/styles/classes";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

const variantStyles = {
  default: styles.buttonvariantdefault,
  destructive: styles.buttonvariantdestructive,
  outline: styles.buttonvariantoutline,
  secondary: styles.buttonvariantsecondary,
  ghost: styles.buttonvariantghost,
  link: styles.buttonvariantlink,
};
const variantMarkers = {
  default: "sx-buttonvariantdefault ui-text-defined",
  destructive: "sx-buttonvariantdestructive ui-text-defined",
  outline: "sx-buttonvariantoutline ui-text-defined",
  secondary: "sx-buttonvariantsecondary ui-text-defined",
  ghost: "sx-buttonvariantghost ui-text-defined",
  link: "sx-buttonvariantlink ui-text-defined",
};
const sizeStyles = {
  default: styles.buttonsizedefault,
  sm: styles.buttonsizesm,
  lg: styles.buttonsizelg,
  icon: styles.buttonsizeicon,
  "icon-sm": styles.buttonsizeicon_sm,
  "icon-lg": styles.buttonsizeicon_lg,
};
const sizeMarkers = {
  default: "sx-buttonsizedefault",
  sm: "sx-buttonsizesm",
  lg: "sx-buttonsizelg",
  icon: "sx-buttonsizeicon ui-size-defined",
  "icon-sm": "sx-buttonsizeicon_sm ui-size-defined",
  "icon-lg": "sx-buttonsizeicon_lg ui-size-defined",
};
type Variant = keyof typeof variantStyles;
type Size = keyof typeof sizeStyles;
type VariantOptions = { variant?: Variant | null; size?: Size | null };
/** Preserve the public class builder while compiling its atomic styles. */
function buttonVariants({
  variant = "default",
  size = "default",
  className,
  class: extraClass,
  xstyle,
}: VariantOptions & { className?: ClassValue; class?: ClassValue; xstyle?: XStyle } = {}) {
  return cn(
    stylex.props(
      variant ? variantStyles[variant] : styles.buttonBase,
      size && sizeStyles[size],
      xstyle,
    ).className,
    variant ? variantMarkers[variant] : "sx-buttonBase",
    size && sizeMarkers[size],
    className,
    extraClass,
  );
}

function Button({
  className,
  xstyle,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: StyledProps<React.ComponentProps<"button">> &
  VariantOptions & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className, xstyle }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
