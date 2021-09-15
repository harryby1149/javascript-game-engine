window.game.mapLoad = function() { 
    const state = window.game.state;
    const canvas = game.draw.bgCanvas;
    state.currentAnimations = {items: {}}; 
    const map = state.map.currentMap;
    const mapDimensions = map.mapDimensions;
    let width = state.viewPort.width;
    let height = state.viewPort.height;
    if(state.map.previousMap == map) {
        return;
    }
    if(state.map.previousMap){
        game.draw.bgCtx.clearRect(state.map.previousMap.display.minX, state.map.previousMap.display.minY, width, height);
        state.currentAnimations.items = {};
    }
    delete state.map.previousMap;
    // display object contains metadata around drawing the map object
    map.display = {
        minX : (canvas.width - (mapDimensions.width <= canvas.width ? mapDimensions.width : canvas.width) ) / 2, // the x co-ordinate to start drawing the map
        minY : (canvas.height - (mapDimensions.height <= canvas.height ? mapDimensions.height : canvas.height)) / 2, // the y co-oridnate to start drawing the map
        maxX : canvas.width - ((canvas.width - (mapDimensions.width <= canvas.width ? mapDimensions.width : canvas.width)) / 2), // the width of the viewport 
        maxY : canvas.height - ((canvas.height - (mapDimensions.height <= canvas.height ? mapDimensions.height : canvas.height)) / 2), // the height of the viewport
        mapX: state.currentTransition? state.currentTransition.startAtX : 0 , // x coordinate to start drawing the new map
        mapY: state.currentTransition? state.currentTransition.startAtY : 0 , // y coordinate to start drawing the new map
    }
    game.draw.drawMapLayer();
    game.draw.iCtx.clearRect(0, 0, canvas.width, canvas.height);
    state.bounds = {}
    if(map.mapBounds) { map.mapBounds.forEach((element, index, array) => {
        state.bounds[index] = element;
    }) };
    state.currentAnimations.items = Object.assign({}, map.mapComponents)
    game.draw.drawItems(true);
    game.draw.drawPlayerLayer();
    state.transition = false;
    state.currentTransition = null;
    window.game.state.gameLoop();
}

window.game.clearInput = function() {
    document.removeEventListener('keydown');
    document.removeEventListener('keyup');
}

window.game.setInput = function(inputLogic) {
    inputLogic.setInput();
}
