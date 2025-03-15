import {state} from "../State";

export const drawPrerenderedMap = () => {
    console.log("in the draw map layer fuction")
    const currentMap = state.scene;
    const previousScene = state.scene.previousScene;
    clearExistingMap(currentMap, previousScene);    
    state.bgCtx.beginPath();
    state.bgCtx.drawImage(state.scene.image, currentMap.display.mapX, currentMap.display.mapY, state.viewPort.width, state.viewPort.height,  currentMap.display.minX , currentMap.display.minY, state.viewPort.width, state.viewPort.height);
    state.bgCtx.closePath();
    state.scrollMap = false;
}

export const clearExistingMap = (currentMap, previousScene) => {
    const clearDimensions = {
        minX: false,
        minY: false
    } 
    console.log('setting the clearDimensions')
    if(previousScene) {
        console.log('setting clear dimensions from previous map');
        clearDimensions.minX = previousScene.display.minX;
        clearDimensions.minY = previousScene.display.minY;
    } else {
        console.log('setting clear dimensions from currentMap')
        clearDimensions.minX = currentMap.display.minX;
        clearDimensions.minY = currentMap.display.minY;
    }
    state.bgCtx.clearRect(clearDimensions.minX, clearDimensions.minY, state.viewPort.width, state.viewPort.height)
}