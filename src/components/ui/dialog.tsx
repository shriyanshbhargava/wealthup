"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as React from "react"

import { Cross2Icon } from "@radix-ui/react-icons"
import { cn } from "@/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-md rounded-3xl sm:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-[rgba(3,87,130,0.90)] shadow-[4px_4px_4px_0px_#035782] text-white p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.6457 8.62718L12.7874 11.4844L15.6457 14.3416C15.7263 14.4222 15.7902 14.5179 15.8339 14.6233C15.8775 14.7286 15.9 14.8415 15.9 14.9555C15.9 15.0695 15.8775 15.1825 15.8339 15.2878C15.7902 15.3931 15.7263 15.4889 15.6457 15.5695C15.565 15.6501 15.4693 15.7141 15.364 15.7577C15.2586 15.8013 15.1457 15.8238 15.0317 15.8238C14.9177 15.8238 14.8048 15.8013 14.6994 15.7577C14.5941 15.7141 14.4984 15.6501 14.4177 15.5695L11.5605 12.7112L8.70336 15.5695C8.62273 15.6501 8.52701 15.7141 8.42167 15.7577C8.31633 15.8013 8.20342 15.8238 8.0894 15.8238C7.97537 15.8238 7.86247 15.8013 7.75712 15.7577C7.65178 15.7141 7.55606 15.6501 7.47544 15.5695C7.39481 15.4889 7.33085 15.3931 7.28722 15.2878C7.24358 15.1825 7.22113 15.0695 7.22113 14.9555C7.22113 14.8415 7.24358 14.7286 7.28722 14.6233C7.33085 14.5179 7.39481 14.4222 7.47544 14.3416L10.3337 11.4844L7.47544 8.62718C7.3126 8.46435 7.22113 8.2435 7.22113 8.01322C7.22113 7.78294 7.3126 7.56209 7.47544 7.39926C7.63827 7.23643 7.85912 7.14495 8.0894 7.14495C8.31968 7.14495 8.54052 7.23643 8.70336 7.39926L11.5605 10.2575L14.4177 7.39926C14.4984 7.31863 14.5941 7.25468 14.6994 7.21104C14.8048 7.16741 14.9177 7.14495 15.0317 7.14495C15.1457 7.14495 15.2586 7.16741 15.364 7.21104C15.4693 7.25468 15.565 7.31863 15.6457 7.39926C15.7263 7.47989 15.7902 7.5756 15.8339 7.68095C15.8775 7.78629 15.9 7.8992 15.9 8.01322C15.9 8.12724 15.8775 8.24015 15.8339 8.34549C15.7902 8.45084 15.7263 8.54655 15.6457 8.62718ZM22.8418 11.4844C22.8418 13.7156 22.1802 15.8967 20.9406 17.7519C19.701 19.6071 17.9391 21.053 15.8777 21.9069C13.8163 22.7607 11.548 22.9841 9.35969 22.5489C7.17134 22.1136 5.16121 21.0391 3.5835 19.4614C2.00579 17.8837 0.931357 15.8736 0.496068 13.6852C0.0607785 11.4969 0.284185 9.2286 1.13804 7.16723C1.99189 5.10585 3.43783 3.34396 5.29302 2.10436C7.14822 0.864759 9.32933 0.203125 11.5605 0.203125C14.5516 0.206284 17.4191 1.39585 19.5341 3.51081C21.6491 5.62577 22.8386 8.49337 22.8418 11.4844ZM21.1062 11.4844C21.1062 9.59642 20.5464 7.75086 19.4975 6.18108C18.4486 4.6113 16.9578 3.38781 15.2135 2.66532C13.4693 1.94283 11.55 1.7538 9.69828 2.12212C7.8466 2.49044 6.14573 3.39958 4.81074 4.73456C3.47575 6.06955 2.56662 7.77043 2.1983 9.6221C1.82997 11.4738 2.01901 13.3931 2.7415 15.1373C3.46399 16.8816 4.68748 18.3724 6.25726 19.4213C7.82704 20.4702 9.67259 21.03 11.5605 21.03C14.0913 21.0272 16.5176 20.0205 18.3072 18.231C20.0967 16.4415 21.1033 14.0152 21.1062 11.4844Z" fill="white"/>
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
