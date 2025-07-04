import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    FastForward,
    Fullscreen,
    PauseCircleIcon,
    PlayCircleIcon,
    Settings2,
    Volume1,
    Volume2,
    VolumeX,
    XCircle
} from "lucide-react";
import React from "react";
import { ReactPlayerProps } from "react-player";
import { AudioSlider } from "./audio-slider";
import { VideoSeekSlider } from "./video-skeek-slider";


const playBackRate = [
    { value: .5, label: '.5x' },
    { value: .75, label: '.75x' },
    { value: 1, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 2, label: '2x' }
]

const videoQuality = [
    { value: 360, label: '360p' },
    { value: 480, label: '480p' },
    { value: 720, label: '720p' },
]

const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'mal', label: 'Malayalam' },
]

const PlayerControls: React.FC<ReactPlayerProps> = (props) => {
    const { state, dispatch, playerRef, handleFullscreen } = props;

    const handlePlayBackRateChange = (value: number) => {
        dispatch({ type: "PLAYBACKRATE", payload: value })
    }

    const settings = [
        {
            title: "Speed",
            value: state.playbackRate,
            handleChange: handlePlayBackRateChange,
            varinats: playBackRate
        },
        {
            title: "Quality",
            value: 480,
            handleChange: handlePlayBackRateChange,
            varinats: videoQuality
        },
        {
            title: "Language",
            value: "en",
            handleChange: () => { },
            varinats: languages
        }
    ]

    const handleSettingToggle = () => {
        dispatch({ type: "SETTINGS_TOGGLE" })
    }

    const handleSound = (newValue: number | number[]) => {
        const value = Array.isArray(newValue) ? newValue[0] : newValue;
        dispatch({ type: 'VOLUME', payload: value });
    };

    const handleSeek = (newValue: number | number[]) => {
        const value = Array.isArray(newValue) ? newValue[0] : newValue;
        playerRef.current.seekTo(value as number);
    };

    const handleTogglePlay = () => {
        dispatch({ type: 'TOGGLE_PLAY' })
    }

    const handleSkip = (type: "FORWARD" | "BACKWARD") => {
        const currentTime = state.progress.playedSeconds;
        const SKIP_VALUE = 10;

        if (type == "FORWARD") {
            handleSeek(currentTime + SKIP_VALUE)
        }

        if (type == "BACKWARD") {
            handleSeek(currentTime - SKIP_VALUE)
        }
    }

   

    const renderSettings = () => {
        return (
            <div className={
                cn(
                    "absolute inset-y-0 right-0 transition-opacity ease-in-out duration-1000 overflow-hidden backdrop-brightness-50 z-1  w-[250px]",
                    state.settings ? "opacity-100" : "opacity-0"
                )
            }
            >
                <div className="flex flex-col pt-2 px-2 gap-y-4">
                    <div className="text-white p-1" >
                        <XCircle onClick={handleSettingToggle} className="pointer-events-auto cursor-pointer" />
                    </div>
                    {settings.map((config) => (
                        <div className="space-y-2" key={config.value}>
                            <p>{config.title}</p>
                            <div className="flex flex-wrap gap-y-2 items-center gap-x-1">
                                {config.varinats.map((variant) => (
                                    <Badge onClick={() => config.handleChange(variant.value as number)} variant={variant.value == config.value ? "destructive" : 'outline'} key={variant.value} className="cursor-pointer pointer-events-auto">{variant.label}</Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderSeeklider = () => {
        return (
            <VideoSeekSlider
                min={0}
                max={state.duration}
                value={[state.progress.playedSeconds]}
                step={0.01}
                onValueChange={handleSeek}
            />
        )
    }

    const renderPlayButton = () => {
        if (state.playing) {
            return (
                <PauseCircleIcon strokeWidth={1} onClick={handleTogglePlay} className="w-10 h-10" />
            )
        }

        return <PlayCircleIcon strokeWidth={1} onClick={handleTogglePlay} className="w-10 h-10" />
    }

    const renderSkipVideo = () => {
        return (
            <div className="absolute opacity-0 transition-opacity ease-in-out duration-1000 group-hover:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                <div className="flex items-center md:gap-x-20 gap-x-10">
                    <div className="backdrop-brightness-75 p-2 rounded-full" onClick={() => handleSkip("BACKWARD")}>
                        <FastForward className="rotate-180" />
                    </div>
                    {/* <div className="backdrop-brightness-75 p-2 rounded-full">
                       {renderPlayButton()}
                    </div> */}
                    <div className="backdrop-brightness-75 p-2 rounded-full" onClick={() => handleSkip("FORWARD")}>
                        <FastForward />
                    </div>
                </div>
            </div>
        )
    }

    const renderSoundSlider = () => {
        return (
            <div className="flex items-center gap-x-1 relative group/audio">
                <AudioSlider
                    min={0}
                    max={1}
                    step={0.01}
                    value={[state.volume]}
                    onValueChange={handleSound}
                    className="w-[100px]"
                />
                {state.volume == 0 ? <VolumeX /> : state.volume < .5 ? <Volume1 /> : <Volume2 />}
            </div>
        )
    }

    const renderDurationText = () => {
        return (
            <div>
                <span>{formatDuration(state.progress.playedSeconds)}</span>
                <span>{"/"}{formatDuration(state.duration)}</span>
            </div>
        )
    }

    const renderFullScreenButton = () => {
        return (
            <div className="flex items-center gap-x-2">
                <Fullscreen onClick={handleFullscreen} />
                <Settings2 onClick={handleSettingToggle} />
            </div>
        )
    }

    return (
        <>
            {renderSkipVideo()}
            {renderSettings()}
            <div className={cn(
                'absolute p-2 box-border backdrop-brightness-75 bottom-0 left-0 w-full text-white',
                'rounded-es-2 rounded-ee-2 opacity-0 transition-opacity ease-in-out duration-1000 group-hover:opacity-100',
            )}>
                <div className="px-1">
                    {renderSeeklider()}
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                    <div className="flex flex-row items-center gap-x-2">
                        {renderPlayButton()}
                        {renderSoundSlider()}
                        {renderDurationText()}
                    </div>
                    <div className="">
                        {renderFullScreenButton()}
                    </div>
                </div>
            </div>
        </>
    )
}

const formatDuration = (time: number) => {
    const numberFormat = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2
    })
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);

    if (hours === 0) {
        return `${minutes}:${numberFormat.format(seconds)}`
    }

    return `${hours}:${numberFormat.format(minutes)}:${numberFormat.format(seconds)}`
}

export default PlayerControls;