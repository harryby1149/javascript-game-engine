const game = window.game;
const maps = game.maps;
const utils = game.utils;
let state = game.state;
state.mode = 'exploration';
state.currentAnimations = {};
state.currentAnimations.items = {}
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
state.previousPX = state.pX;
state.previousPY = state.pX;
state.dPX = 5;
state.dPY = 5;
state.scaledPW  = 50;
state.scaledPH = 50;
const halfSPW = scaledPW /2;
const halfSPH = scaledPH /2
state.transition = true;
let frameCount = 0;
state.map = {};
state.map.currentMap = maps.estateSample;
state.map.image = new Image();
state.map.image.onload = function() {
    const map = state.map.currentMap;
    const mapDimensions = map.mapDimensions;
    const imgRatio = parseInt(mapDimensions.width) / parseInt(mapDimensions.height);
    let width = canvas.clientWidth;
    let height = width / imgRatio
    if(height > canvas.clientHeight) {
        height = canvas.clientHeight
        width = height * imgRatio;
    }
    if (mapDimensions.width <= canvas.width && mapDimensions.height <= canvas.height){
        scale = 1
    } else {
        scale = (canvas.width * canvas.height) / (mapDimensions.width * mapDimensions.height)
    }
    state.scaledPW *= scale;
    state.scaledPH *= scale;
    map.display = {
        minX : (canvas.width - (mapDimensions.width <= 1200 ? mapDimensions.width : 1200) ) / 2,
        minY : (canvas.height - (mapDimensions.height <= 900 ? mapDimensions.height : 900)) / 2,
        maxX : canvas.width - ((canvas.width - (mapDimensions.width <= 1200 ? mapDimensions.width : 1200)) / 2),
        maxY : canvas.height - ((canvas.height - (mapDimensions.height <= 900 ? mapDimensions.height : 900)) / 2)
    }
    ctx.drawImage(state.map.image, map.display.minX , map.display.minY, width, height);
    state.bounds = []
    map.mapBounds.forEach(boundary => state.bounds.push(boundary));
    state.currentAnimations.items = Object.assign({}, state.currentAnimations.items, map.mapComponents)
    console.log(state.currentAnimations.items)
    drawItems();
    state.transition = false;
    draw()
}

state.map.image.src = state.map.currentMap.url;

function draw() {
    frameCount++
    game[state.mode].calcChanges();
    drawItemLayer();
    drawplayerLayer();
    if (frameCount === 60) {
        frameCount = 0;
    }
    state.animationFrame = requestAnimationFrame(draw);
}

function drawplayerLayer() { 
    //if (frameCount % 5 === 0){
    playerCtx.clearRect(state.previousPX, state.previousPY, state.scaledPW + 5, state.scaledPH + 5);   
    playerCtx.beginPath();
    playerCtx.rect(state.pX, state.pY , scaledPW, scaledPH);
    playerCtx.fillStyle = "red";
    playerCtx.fill();
    playerCtx.closePath();
    //}
};

function drawItemLayer() {
    calcItemAnimations();
    drawItems();  
}

function calcItemAnimations(){
    Object.keys(state.currentAnimations.items).forEach(itemKey => {
        const mapItem = state.currentAnimations.items[itemKey];
        // todo: implement proper animation lookup logic, maybe in utils
        let activeAnimation = mapItem.item.type == 'chest'? 'open' : 'placeholder';
        if( mapItem.animate && mapItem.status + 1 < mapItem.item.animations[activeAnimation].length  
        ){
            mapItem.status++;
        }
        if(mapItem.animate && mapItem.status == mapItem.item.animations.open.length -1){
            mapItem.animate = false
        }
    })
}

function drawItems() {
    Object.keys(state.currentAnimations.items).forEach(key => {
        const currentItem = state.currentAnimations.items[key];
        if (state.transition){
            initializeItem(currentItem, key)
        } else {
            if(currentItem.animate){
                console.log(currentItem.x, currentItem.y, currentItem.item.metaData.unitWidth, currentItem.item.metaData.unitHeight)
            itemCtx.clearRect(currentItem.x + state.map.currentMap.display.minX, currentItem.y + state.map.currentMap.display.miny, currentItem.item.metaData.unitWidth, currentItem.item.metaData.unitHeight)
            drawSingleItem(currentItem.image, currentItem)
            }  
        } 
    });
}

function initializeItem (stateItem, key) {
    stateItem.id = key;
    const item = new Image()
    item.onload = function() {
        drawSingleItem(item, stateItem, true);
    }
    item.src = stateItem.item.src
    stateItem.image = item;
    stateItem.status = 0; 
}

function drawSingleItem(image ,{item: itemDetails, start, x, y, animate, status, id} = element, init = false, currentMap = state.map.currentMap){
    const animations = itemDetails.animations;
    const currentFrame = !animate ? start: status;
    const displayX = x + currentMap.display.minX;
    const displayY = y + currentMap.display.minY;
    console.log(displayX, displayY)
    itemCtx.beginPath();
    if(init) {
        state.bounds.push([displayX, displayX + (animations.open[currentFrame][2]), displayY, displayY + animations.open[currentFrame][3], id])
    };
    itemCtx.drawImage(image, animations.open[currentFrame][0], animations.open[currentFrame][1], animations.open[currentFrame][2], animations.open[currentFrame][3], displayX, displayY, animations.open[currentFrame][2], animations.open[currentFrame][3] );
    itemCtx.closePath();
}