const maps = window.game.maps;
const utils = window.game.utils;
let state = window.game.state;
const canvas = document.getElementById('background-canvas');
canvas.width = canvas.clientWidth;
canvas.height = 900;
const ctx = canvas.getContext('2d');
const playerCanvas = document.getElementById('player-canvas');
playerCanvas.width = canvas.width;
playerCanvas.height = canvas.height;
const playerCtx = playerCanvas.getContext('2d');
const itemCanvas = document.getElementById('item-canvas');
itemCanvas.width = canvas.width;
itemCanvas.height = canvas.height;
const itemCtx = itemCanvas.getContext('2d');
let scale;
state.pX = canvas.width/2;
state.pY = canvas.height * (3/5);
state.dPX = 4;
state.dPY = 4;
state.scaledPW  = 50;
state.scaledPH = 50;
const halfSPW = scaledPW /2;
const halfSPH = scaledPH /2
let transition = true;
let mapDrawn = false;
state.currentMap = maps.estateSample;
let currentBackgroundImage = new Image();
currentBackgroundImage.onload = function() {
    const map = state.currentMap.mapDimensions;
    const imgRatio = parseInt(map.width) / parseInt(map.height);
    let width = canvas.clientWidth;
    let height = width / imgRatio
    if(height > canvas.clientHeight) {
        height = canvas.clientHeight
        width = height * imgRatio;
    }
    if (state.currentMap.mapDimensions.width <= canvas.width && state.currentMap.mapDimensions.height <= canvas.height){
        scale = 1
    } else {
        scale = (canvas.width * canvas.height) / (state.currentMap.mapDimensions.width * state.currentMap.mapDimensions.height)
    }
    state.scaledPW *= scale;
    state.scaledPH *= scale;
    state.currentMap.display = {
        minX : (canvas.width - map.width) / 2,
        minY : (canvas.height - map.height) / 2,
        maxX : canvas.width - ((canvas.width - map.width) / 2),
        maxY : canvas.height - ((canvas.height - map.height) / 2)
    }
    ctx.drawImage( currentBackgroundImage, state.currentMap.display.minX , state.currentMap.display.minY, width, height);
    state.bounds = state.currentMap.mapBounds;
    drawItemLayer();
    transition = false;
    mapDrawn = true;
}
currentBackgroundImage.src = state.currentMap.url;

function drawplayerLayer() {    
        playerCtx.clearRect(0, 0, canvas.width, canvas.height);
        utils.updateCollisionVals();
        utils.calcChanges();  
        drawPlayer()
        requestAnimationFrame(drawplayerLayer)
};

function draw() {
    drawplayerLayer();
}

function drawPlayer() {
    playerCtx.beginPath();
    playerCtx.rect(state.pX, state.pY , scaledPW, scaledPH);
    playerCtx.fillStyle = "red";
    playerCtx.fill();
    playerCtx.closePath();
}

function getMapDetails(){
   transition == true;
}


function drawItemLayer() {
    itemCtx.clearRect(0, 0, canvas.width, canvas.height)
    drawItems();
}

function drawItems() {
    state.currentMap.mapComponents.forEach(element => {
        itemCtx.beginPath();
        const item = new Image()
        item.onload = function() {
            drawSingleItem(item, element);
        }
        item.src = element.item.src
    });
}

function drawSingleItem(item ,{item: itemDetails, status, x, y} = element, currentMap = state.currentMap){
    const animations = itemDetails.animations;
    const currentFrame = itemDetails.metaData.status[status];
    const displayX = x + currentMap.display.minX;
    const displayY = y + currentMap.display.minY;
    state.bounds.push([displayX, displayX + (animations[currentFrame][2]), displayY, displayY + animations[currentFrame][3]]);
    itemCtx.drawImage(item, animations[currentFrame][0], animations[currentFrame][1], animations[currentFrame][2], animations[currentFrame][3], displayX, displayY, animations[currentFrame][2], animations[currentFrame][3] );
    itemCtx.closePath();
}


draw();