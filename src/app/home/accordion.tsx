"use client"

import { Accordion as Acc, AccordionContainer } from '@/components/ui/Accordion'

import React from 'react'

export const Accordion = () => {
  return (
    <AccordionContainer>
        <AccordionContainer.HomeItem title="Something goes here" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus corporis cum sit molestias nemo praesentium beatae id modi velit, quia tempore quaerat temporibus doloribus eum aliquid! Recusandae, illo ipsa." />
        <AccordionContainer.HomeItem title="Something goes here" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus corporis cum sit molestias nemo praesentium beatae id modi velit, quia tempore quaerat temporibus doloribus eum aliquid! Recusandae, illo ipsa." />
        <AccordionContainer.HomeItem title="Something goes here" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus corporis cum sit molestias nemo praesentium beatae id modi velit, quia tempore quaerat temporibus doloribus eum aliquid! Recusandae, illo ipsa." />
        <AccordionContainer.HomeItem title="Something goes here" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus corporis cum sit molestias nemo praesentium beatae id modi velit, quia tempore quaerat temporibus doloribus eum aliquid! Recusandae, illo ipsa." />
    </AccordionContainer>
  )
}
