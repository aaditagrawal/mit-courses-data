"use client";

import { styles } from "@/styles/site.stylex";
import { styleClass, type StyledProps } from "@/styles/classes";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Command({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive>>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(styleClass("componentsUiCommandStyle1", xstyle), className)}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  xstyle,
  showCloseButton = true,
  shouldFilter,
  ...props
}: StyledProps<React.ComponentProps<typeof Dialog>> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  shouldFilter?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader
        xstyle={styles.componentsModeToggleStyle3}
        className="sx-componentsModeToggleStyle3"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        xstyle={[styles.componentsUiCommandStyle3, xstyle]}
        className={cn("sx-componentsUiCommandStyle3", className)}
        showCloseButton={showCloseButton}
      >
        <Command
          xstyle={styles.componentsUiCommandStyle4}
          className="sx-componentsUiCommandStyle4"
          shouldFilter={shouldFilter}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive.Input>>) {
  return (
    <div data-slot="command-input-wrapper" className={styleClass("componentsUiCommandStyle5")}>
      <SearchIcon className={styleClass("componentsUiCommandStyle6")} />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(styleClass("componentsUiCommandStyle7", xstyle), className)}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive.List>>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(styleClass("componentsUiCommandStyle8", xstyle), className)}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive.Empty>>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={styleClass("componentsUiCommandStyle9")}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive.Group>>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(styleClass("componentsUiCommandStyle10", xstyle), className)}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive.Separator>>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(styleClass("componentsUiCommandStyle11", xstyle), className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<typeof CommandPrimitive.Item>>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(styleClass("componentsUiCommandStyle12", xstyle), className)}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  xstyle,
  ...props
}: StyledProps<React.ComponentProps<"span">>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(styleClass("componentsUiCommandStyle13", xstyle), className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
