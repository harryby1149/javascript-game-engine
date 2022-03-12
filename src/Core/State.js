 import { scenes } from '../Scenes/index'

 // initialize state object with defaul values
 // todo remove overlap with init.js
 export let state = {
    frameCount:  0, // used by the draw functions to pace animations
    transition : true,
    animatePlayer: false,
    scrollMap: false,
    pX : 0,
    pY : 0,
    previousPX : 0,
    previousPY : 0,
    dPX : 0,
    dPY : 0,
    scaledPW  : 50,
    scaledPH : 50,
    viewPort : {
        height: window.innerHeight,
        width: window.innerWidth
    },
    map : {
        currentMap: scenes.estateSample,
        image: new Image()
    },
    mode : -1,
}
