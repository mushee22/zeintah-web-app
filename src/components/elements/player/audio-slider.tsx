import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/lib/utils"

const AudioSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group/seek",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 group-hover/seek:h-2 cursor-pointer w-full grow overflow-hidden rounded-full bg-white">
      <SliderPrimitive.Range className="absolute h-full bg-destructive-300" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full  bg-white  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
AudioSlider.displayName = SliderPrimitive.Root.displayName

export { AudioSlider }
