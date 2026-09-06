"use client";

import { styleClass, type StyledProps } from "@/styles/classes";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  xstyle,
  orientation = "horizontal",
  decorative = true,
  ...props
}: StyledProps<React.ComponentProps<typeof SeparatorPrimitive.Root>>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(styleClass("componentsUiSeparatorStyle1", xstyle), className)}
      {...props}
    />
  );
}

export { Separator };
