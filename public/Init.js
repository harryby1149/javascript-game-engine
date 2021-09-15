window.game.init = () => {
    /**
     * Currently this just loads the default map and intializes the majority of the state variables we use for the exploration gameplay elements.  
     * In the future this will be called from the start menu where, depending on the option selected, we will initialize with the new game sequence
     * or load the save game info.
    */
    const game = window.game;
    const maps = game.maps;
    const state = game.state;
    initCanvases();
    const canvas = game.draw.bgCanvas;
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
        currentMap: maps.estateSample,
        image: new Image()
    };
    
    state.mode = 'exploration';
    window.game[state.mode].inputs.setInput();
    state.map.image.onload = game.mapLoad
    state.map.image.src = state.map.currentMap.url
};

function initCanvases() {
    game.draw.bgCanvas = document.getElementById('background-canvas');
    game.draw.bgCanvas.width = game.draw.bgCanvas.clientWidth;
    game.draw.bgCanvas.height = window.innerHeight;
    game.draw.bgCtx = game.draw.bgCanvas.getContext('2d');
    game.draw.pCanvas = document.getElementById('player-canvas');
    game.draw.pCanvas.width =  game.draw.bgCanvas.width;
    game.draw.pCanvas.height = game.draw.bgCanvas.height;
    game.draw.pCtx = game.draw.pCanvas.getContext('2d');
    game.draw.iCanvas = document.getElementById('item-canvas');
    game.draw.iCanvas.width =  game.draw.bgCanvas.width;
    game.draw.iCanvas.height = game.draw.bgCanvas.height;
    game.draw.iCtx = game.draw.iCanvas.getContext('2d');
}

window.game.init();