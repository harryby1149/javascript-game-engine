import { draw } from "./Draw/Draw";
import { state } from "./State";
import { gameLoop } from "./Game";

// TODO: branching draw logic depending on scene mode 
export const transitionScene = function() { 
    const {canvas, scene, mapDimensions} = getDisplayConstants();
    // do not transition to current map
    if(state.scene.previousScene == scene) {
        return;
    }
    if(state.scene.previousScene){
        state.bgCtx.clearRect(state.scene.previousScene.display.minX, state.scene.previousScene.display.minY, width, height);
        state.currentAnimations.items = {};
        delete state.scene.previousScene;
    }
    console.log(state.scene)
    state.scene.mode.inputs.clearInput();
    state.scene.mode.inputs.setInput();
    // display object contains metadata around drawing the map object
    // needs to be set on the state map object and not the reference
    state.scene.display = {
        minX : (canvas.width - (mapDimensions.width <= canvas.width ? mapDimensions.width : canvas.width) ) / 2, // the x co-ordinate to start drawing the map
        minY : (canvas.height - (mapDimensions.height <= canvas.height ? mapDimensions.height : canvas.height)) / 2, // the y co-oridnate to start drawing the map
        maxX : canvas.width - ((canvas.width - (mapDimensions.width <= canvas.width ? mapDimensions.width : canvas.width)) / 2), // the width of the viewport 
        maxY : canvas.height - ((canvas.height - (mapDimensions.height <= canvas.height ? mapDimensions.height : canvas.height)) / 2), // the height of the viewport
        mapX: state.currentTransition? state.currentTransition.startAtX : 0 , // x coordinate to start drawing the new map
        mapY: state.currentTransition? state.currentTransition.startAtY : 0 , // y coordinate to start drawing the new map
    }
    console.log('calling drawMapLayer from transition function')
    draw.drawMapLayer();
    console.log("clearing item layer")
    state.iCtx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("cleared item layer")
    state.bounds = {}
    if(scene.mapBounds) { scene.mapBounds.forEach((element, index, array) => {
        state.bounds[index] = element;
    }) };
    state.currentAnimations.items = Object.assign({}, scene.mapComponents)
    if(state.scene.mode.id != "grid"){
        draw.drawItems(true);
        draw.drawPlayerLayer();
    }
    state.transition = false;
    state.currentTransition = null;
    gameLoop();
}

const getDisplayConstants = () => {
    const canvas = state.bgCanvas;
    state.currentAnimations = {items: {}}; 
    const scene = state.scene;
    const mapDimensions = scene.mapDimensions;
   return {canvas, scene, mapDimensions}
}