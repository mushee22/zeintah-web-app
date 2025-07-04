import { cn } from '@/lib/utils';
import React from 'react';
import { ReactPlayerProps } from 'react-player';

interface Props extends ReactPlayerProps {
  title?: string
}

const PlayerOverlay: React.FC<Props> = (props) => {
  const { state, } = props;

  return (
    <div className={cn(
      'absolute w-full box-border pointer-events-none flex flex-col justify-end left-0 top-0',
      `${state.light ? 'bottom-0' : 'md:bottom-24 bottom-12'}`,
      `${state.light || state.playing ? 'bg-transparent' : 'bg-blend-overlay'}`,
      `${state.playing ? 'opacity-0' : 'opacity-100'}`,
      'transition-opacity duration-1000 ease-in-out',
      'rounded-ss-md rounded-se-md'
    )}>
      <div className={cn(
        state.light ? "pl-14 pb-14 w-auto" : "pl-6 pb-6 w-full",
      )}>
        {/* <div className='fade-in-10'>
          <Badge variant='destructive'># Video</Badge>
        </div> */}
        {/* <div className='fade-in-10'>
          <Typography variant="title">{title}</Typography>
        </div> */}
        {/* <div className='fade-in-10'>
          <Typography variant="title"> 2022 </Typography>
        </div> */}
      </div>
    </div>
  )
}

export default PlayerOverlay