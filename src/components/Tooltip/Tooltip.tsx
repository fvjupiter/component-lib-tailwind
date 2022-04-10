import React from "react";
export interface TooltipProps {
  disabled?: any;
  side?: string;
  c_def?: string;
  children?: React.ReactNode;
}

const Tooltip = (p: TooltipProps) => { 
  const getOrigin = () => {
      switch (p.side) {
          case 'top': return 'origin-bottom'
          case 'right': return 'origin-left'
          case 'bottom': return 'origin-top'
          case 'left': return 'origin-right'
          default: return ''
      }
  }
  return <>
    <div className={`
            ${getOrigin()}
            ${!p.disabled && 'group-hover:scale-100'}
            absolute
            scale-0
            min-w-max
            p-2
            rounded-xl
            text-xs font-bold
            duration-300
            ${p.c_def}`}
        >{p.children}
    </div>
  </>
}

export default Tooltip;
