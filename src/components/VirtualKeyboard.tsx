'use client'

import { cn } from '@/utils/utils'
import { HTMLMotionProps, motion } from 'framer-motion'
import { MoveLeft, PartyPopper } from 'lucide-react'
import React, { memo, MouseEventHandler, useState } from 'react'

type capsContext = true | false
const CapsContext = React.createContext<capsContext>({} as capsContext)

interface KeyProps extends HTMLMotionProps<'button'> {
  label?: string | React.ReactNode
  className?: string
  out?: string
}

export const KeyboardKey = memo(({ label, out, ...props }: KeyProps) => {
  return (
    <motion.button
      {...props}
      className={cn(
        'Keyboard-key-bg min-h-12 min-w-12 select-none rounded-xl p-2',
        props.className
      )}
      onMouseDown={props.onMouseDown}
      layout
    >
      {label}
    </motion.button>
  )
})

export default VirtualKeyboard
