import * as stylex from "@stylexjs/stylex";
import { styles } from "@/styles/site.stylex";
import { type StyledProps, type XStyle } from "@/styles/classes";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

const variantStyles = {
  default: styles.badgevariantdefault,
  secondary: styles.badgevariantsecondary,
  destructive: styles.badgevariantdestructive,
  outline: styles.badgevariantoutline,
};
const variantMarkers = {
  default: "sx-badgevariantdefault ui-text-defined",
  secondary: "sx-badgevariantsecondary ui-text-defined",
  destructive: "sx-badgevariantdestructive ui-text-defined",
  outline: "sx-badgevariantoutline ui-text-defined",
};
type Variant = keyof typeof variantStyles;

type VariantOptions = { variant?: Variant | null };
/** Preserve the public class builder while compiling its atomic styles. */
function badgeVariants({
  variant = "default",
  className,
  class: extraClass,
  xstyle,
}: VariantOptions & { className?: ClassValue; class?: ClassValue; xstyle?: XStyle } = {}) {
  return cn(
    stylex.props(variant ? variantStyles[variant] : styles.badgeBase, xstyle).className,
    variant ? variantMarkers[variant] : "sx-badgeBase",
    className,
    extraClass,
  );
}

function Badge({
  className,
  xstyle,
  variant,
  asChild = false,
  ...props
}: StyledProps<React.ComponentProps<"span">> & VariantOptions & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, xstyle }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
