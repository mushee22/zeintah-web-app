'use client'

import { PlayCircleIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
// import screenfull from 'screenfull';
import useLearningProgress from '@/hook/use-learning-progress';
import PlayerControls from './player-controls';
import PlayerOverlay from './player-overlay';
import { INITIAL_STATE, reducer } from './reducer';

interface Props extends ReactPlayerProps {
    title?: string,
    videoId?: number,
    moduleId?: number,
    watchedDuration?: number,
    isCompleted?: boolean,
    // subtitles?:EcoInvestVideoSubtitle[]
    onEnded?: () => void
}

// const BASE_FILE_URL = 'https://d1lgcwguvq7h1b.cloudfront.net/'

const Player: React.FC<Props> = (props) => {

    const { url = '', title = "", config, watchedDuration, onEnded } = props;
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    const [isVideoEnded, setVideoEnded] = React.useState<boolean>(false)

    const playerRef = React.useRef<ReactPlayer>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const unmount = React.useRef<boolean>(false);


    const { onUpdateVideoProgress } = useLearningProgress()


    useEffect(() => {
        return () => {
            unmount.current = true
        }
    }, [])

    useEffect(() => {
        if (playerRef.current && state?.fileReady && props.videoId && !isVideoEnded) {
            if (watchedDuration) {
                playerRef.current.seekTo(watchedDuration, 'seconds'); // Seek to 100 seconds
            }
        }
    }, [props.watchedDuration, state.fileReady, props.videoId, isVideoEnded]);

    useEffect(() => {
        // return () => {
        //     if (!unmount.current) return
        //     if (state.progress?.playedSeconds && state.progress?.playedSeconds > 0) {
        //         onUpdateVideoProgress({
        //             videoId: props.videoId,
        //             progress: state.progress?.playedSeconds,
        //             isCompleted: props?.isCompleted ?? false
        //         })
        //     }
        // }
    }, [state.progress?.playedSeconds,])

    const handlePreview = () => {
        dispatch({ type: "PLAY" })
        dispatch({ type: "LIGHT", payload: false })
    }

    const handlePause = () => {
        dispatch({ type: "PAUSE" })
    }

    const handlePlay = async () => {
        dispatch({ type: "PLAY" })
    }

    const handleEnded = () => {
        dispatch({ type: 'LIGHT', payload: true });
        playerRef.current?.showPreview();
        setVideoEnded(true)
        onUpdateVideoProgress({
            videoId: props.videoId,
            progress: state.progress?.playedSeconds,
            isCompleted: true
        })
        if (onEnded) {
            onEnded()
        }
    };


    const handleProgress = (progress: { playedSeconds: number }) => {
        dispatch({ type: 'SEEK', payload: progress.playedSeconds });
    };

    const handleDuration = (duration: number) => {
        dispatch({ type: 'DURATION', payload: duration });
    };

    const handleFileReady = () => {
        dispatch({ type: "READY" })
    }

    const handleBuffering = () => {
        dispatch({ type: "BUFFERING" })
        console.log(isVideoEnded)
    }


    return (

        <div className='relative aspect-video max-w-[1000px] w-[100%] group video-container rounded-md shadow-lg' ref={wrapperRef}>
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
                light={isVideoEnded ? props.light : watchedDuration ? false : props.light}
                // light={props.light}
                config={{
                    file: {
                        ...config?.file,
                        // tracks:props.subtitles?.map((subtitle, index) => (
                        //     {
                        //         label: subtitle.label,
                        //         kind: 'subtitles',
                        //         src: BASE_FILE_URL + subtitle.source,
                        //         srcLang: subtitle.lang,
                        //         default: index == 0
                        //     }
                        // )),
                        attributes: {
                            controlsList: 'nodownload',
                            crossOrigin: 'true'
                        },
                    }
                }}
                playIcon={<PlayCircleIcon strokeWidth={1} size={24} className='w-12 h-12 text-white' />}
                controls={state.controls}
                loop={state.loop}
                muted={state.muted}
                playing={state.playing}
                playbackRate={state.playbackRate}
                volume={state.volume}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
                onDuration={handleDuration}
                onProgress={handleProgress}
                onClickPreview={handlePreview}
                onReady={handleFileReady}
                onBuffer={handleBuffering}
                onBufferEnd={handleFileReady}
            />
            {/* <PlayerLoading state={state} /> */}
            <PlayerOverlay state={state} title={title} />
            {!state.controls && !state.light && (
                <PlayerControls
                    state={state}
                    dispatch={dispatch}
                    playerRef={playerRef}
                    wrapperRef={wrapperRef}
                />
            )}
        </div>
    );
};

export default Player;
