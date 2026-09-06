import { styleClass, type StyledProps } from "@/styles/classes";
import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card"
      className={cn(styleClass("componentsUiCardStyle1", xstyle), className)}
      {...props}
    />
  );
}

function CardHeader({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card-header"
      className={cn(styleClass("componentsUiCardStyle2", xstyle), className)}
      {...props}
    />
  );
}

function CardTitle({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card-title"
      className={cn(styleClass("componentsUiCardStyle3", xstyle), className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card-description"
      className={cn(styleClass("componentsApiDocsPageStyle34", xstyle), className)}
      {...props}
    />
  );
}

function CardAction({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card-action"
      className={cn(styleClass("componentsUiCardStyle5", xstyle), className)}
      {...props}
    />
  );
}

function CardContent({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card-content"
      className={cn(styleClass("componentsUiCardStyle6", xstyle), className)}
      {...props}
    />
  );
}

function CardFooter({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(styleClass("componentsUiCardStyle7", xstyle), className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
