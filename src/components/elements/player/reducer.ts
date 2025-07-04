import { ReactPlayerProps } from "react-player";

interface IntialState extends ReactPlayerProps {
    duration?: number,
    progress?: {
        playedSeconds: 0
    },
    fileReady?: boolean
}

const INITIAL_STATE: IntialState = {
    playing: false,
    controls: true,
    volume: 0.8,
    light: true,
    progress: {
        playedSeconds: 0,
    },
    duration: 0,
    loading: true,
    settings: false,
    playbackRate: 1,
    fileReady: false,
};

const reducer = (state: IntialState, action: IntialState) => {
    switch (action.type) {
        case "READY":
            return { ...state, loading: false, fileReady: true }
        case "BUFFERING":
            return { ...state, loading: true }
        case "PLAY":
            return { ...state, playing: true }
        case "PAUSE":
            return { ...state, playing: false }
        case "TOGGLE_PLAY":
            return { ...state, playing: !state.playing }
        case 'DURATION':
            return { ...state, duration: action.payload };
        case 'SEEK':
            return { ...state, progress: { playedSeconds: action.payload } }
        case 'VOLUME':
            return { ...state, volume: action.payload };
        case 'LIGHT':
            return { ...state, light: action.payload };
        case "SETTINGS_ON":
            return { ...state, settings: true};   
        case "SETTINGS_OFF":
                return { ...state, settings: false};      
        case "SETTINGS_TOGGLE":
                    return { ...state, settings: !state.settings};  
        case "PLAYBACKRATE":
            return { ...state, playbackRate: action.payload }                  
        default:
            return state;
    }
}

export { INITIAL_STATE, reducer };
