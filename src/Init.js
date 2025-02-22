import {state} from "./Core/State";
import {exploration} from "./Gameplay/Exploration/ExplorationControls";
import {transitionScene} from "./Core/Transition";
import { scenes } from "./Scenes";


export const init = () => {
    /**
     * Currently this just loads the default map and intializes the majority of the state variables we use for the exploration gameplay elements.  
     * In the future this will be called from the start menu where, depending on the option selected, we will initialize with the new game sequence
     * or load the save game info.
    */
   console.log('calling init canvases')
    initCanvases();
    const canvas = state.bgCanvas;
    state.frameCount = 0; // used by the draw functions to pace animations
    state.transition = true;
    state.pX = canvas.width/2;
    state.pY = canvas.height * (3/5);
    state.previousPX = state.pX;
    state.previousPY = state.pY;
    state.dPX = 5;
    state.dPY = 5;
    state.scaledPW  = 50;
    state.scaledPH = 50;
    state.viewPort = {
        height: window.innerHeight,
        width: window.innerWidth
    }
    state.map = {
        currentMap: scenes.citybuilderSample,
        image: new Image()
    };
    
    state.mode = scenes.citybuilderSample.mode;
    console.log("setting onload function");
    // if background is pre-rendered image
    if(state.map.image.src) {
        // init scene when image is loaded
        state.map.image.onload = transitionScene;
        state.map.image.src = state.map.currentMap.url;
    } else {
        // init scene immediately
        transitionScene();
    }
};

function initCanvases() {
    state.bgCanvas = document.getElementById('background-canvas');
    state.bgCanvas.width = state.bgCanvas.clientWidth;
    state.bgCanvas.height = window.innerHeight;
    state.bgCtx = state.bgCanvas.getContext('2d');
    state.pCanvas = document.getElementById('player-canvas');
    state.pCanvas.width =  state.bgCanvas.width;
    state.pCanvas.height = state.bgCanvas.height;
    state.pCtx = state.pCanvas.getContext('2d');
    state.iCanvas = document.getElementById('item-canvas');
    state.iCanvas.width =  state.bgCanvas.width;
    state.iCanvas.height = state.bgCanvas.height;
    state.iCtx = state.iCanvas.getContext('2d');
}