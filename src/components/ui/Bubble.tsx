"use client"

import React, { useState } from 'react'
import * as Popover from '@radix-ui/react-popover';

export const Bubble: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Popover.Root open={true}>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content align='start' side={"right"} className="bg-primary-blue rounded-lg text-white p-2 w-full max-w-sm text-sm">
          <Popover.Arrow color='#035782' />
          Relationship Manager
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export const BubblePopover: React.FC<{ children: React.ReactNode, label: string }> = ({ children, label }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <Popover.Root open={isPopoverOpen}>
      <Popover.Trigger asChild>
        <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          {children}
        </div>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content align='center' side={"right"} className="bg-primary-blue rounded-lg text-white p-2 w-full max-w-sm text-sm">
          <Popover.Arrow color='#035782' />
          {label}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
