"use client";

import { styleClass, type StyledProps } from "@/styles/classes";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof DialogPrimitive.Overlay>>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(styleClass("componentsUiDialogStyle1", xstyle), className)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  xstyle,
  children,
  showCloseButton = true,
  ...props
}: StyledProps<React.ComponentProps<typeof DialogPrimitive.Content>> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(styleClass("componentsUiDialogStyle2", xstyle), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={styleClass("componentsUiDialogStyle3")}
          >
            <XIcon />
            <span className={styleClass("componentsModeToggleStyle3")}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(styleClass("componentsUiDialogStyle5", xstyle), className)}
      {...props}
    />
  );
}

function DialogFooter({ className, xstyle, ...props }: StyledProps<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(styleClass("componentsUiDialogStyle6", xstyle), className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof DialogPrimitive.Title>>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(styleClass("componentsUiDialogStyle7", xstyle), className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof DialogPrimitive.Description>>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(styleClass("componentsApiDocsPageStyle34", xstyle), className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
