import { styleClass, type StyledProps } from "@/styles/classes";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, xstyle, type, ...props }: StyledProps<React.ComponentProps<"input">>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(styleClass("componentsUiInputStyle1", xstyle), className)}
      {...props}
    />
  );
}

export { Input };
