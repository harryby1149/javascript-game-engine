window.game.init = () => {
    const game = window.game;
    const maps = game.maps;
    const state = game.state;
    game.draw.initCanvases();
    const canvas = game.draw.bgCanvas;
    state.frameCount = 0;
    state.transition = true;
    state.pX = canvas.width/2;
    state.pY = canvas.height * (3/5);
    state.previousPX = state.pX;
    state.previousPY = state.pX;
    state.dPX = 5;
    state.dPY = 5;
    state.scaledPW  = 50;
    state.scaledPH = 50;
    state.viewPort = {
        width: 1200,
        height: 900
    };
    state.map = {
        currentMap: maps.estateSample,
        image: new Image()
    };
    state.currentAnimations = {items: {}};
    state.mode = 'exploration';
    state.map.image.onload = function() { 
    const map = state.map.currentMap;
    const mapDimensions = map.mapDimensions;
    let width = state.viewPort.width;
    let height = state.viewPort.height;
    if(state.map.previousMap){
        game.draw.bgCtx.clearRect(state.map.previousMap.display.minX, state.map.previousMap.display.minY, width, height)
    }
    delete state.map.previousMap;
    map.display = {
        minX : (canvas.width - (mapDimensions.width <= 1200 ? mapDimensions.width : 1200) ) / 2,
        minY : (canvas.height - (mapDimensions.height <= 900 ? mapDimensions.height : 900)) / 2,
        maxX : canvas.width - ((canvas.width - (mapDimensions.width <= 1200 ? mapDimensions.width : 1200)) / 2),
        maxY : canvas.height - ((canvas.height - (mapDimensions.height <= 900 ? mapDimensions.height : 900)) / 2),
        mapStartX: state.currentTransition? state.currentTransition.startAtX : 0 ,
        mapStartY: state.currentTransition? state.currentTransition.startAtY : 0,
    }
    game.draw.bgCtx.beginPath();
    game.draw.bgCtx.drawImage(state.map.image, map.display.mapStartX, map.display.mapStartY, width, height,  map.display.minX , map.display.minY, width, height);
    game.draw.bgCtx.closePath();
    state.bounds = []
    if(map.mapBounds) { map.mapBounds.forEach(boundary => state.bounds.push(boundary)) };
    state.currentAnimations.items = Object.assign({}, state.currentAnimations.items, map.mapComponents)
    console.log(state.currentAnimations.items)
    game.draw.drawItems();
    state.transition = false;
    state.currentTransition = null;
    window.game.state.gameLoop();
}
    state.map.image.src = state.map.currentMap.url
};

window.game.init();