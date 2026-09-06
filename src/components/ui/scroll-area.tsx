"use client";

import { styleClass, type StyledProps } from "@/styles/classes";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  xstyle,
  children,
  ...props
}: StyledProps<React.ComponentProps<typeof ScrollAreaPrimitive.Root>>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(styleClass("componentsUiScrollAreaStyle1", xstyle), className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={styleClass("componentsUiScrollAreaStyle2")}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  xstyle,
  orientation = "vertical",
  ...props
}: StyledProps<React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        styleClass(orientation === "vertical" ? "scrollVertical" : "scrollHorizontal", xstyle),
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={styleClass("componentsUiScrollAreaStyle3")}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
