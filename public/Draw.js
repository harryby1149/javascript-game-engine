game.draw = {
    scale: 1,
    drawplayerLayer: () => {
        const state = window.game.state; 
        //if (frameCount % 5 === 0){
       game.draw.pCtx.clearRect(state.previousPX, state.previousPY, state.scaledPW + 5, state.scaledPH + 5);   
       game.draw.pCtx.beginPath();
       game.draw.pCtx.rect(state.pX, state.pY , scaledPW, scaledPH);
       game.draw.pCtx.fillStyle = "red";
       game.draw.pCtx.fill();
       game.draw.pCtx.closePath();
        //}
    },
    drawItemLayer: () => {
        game.draw.calcItemAnimations();
        game.draw.drawItems();  
    },
    drawMapLayer: () => {

    },
    calcItemAnimations: () => {
        const state = window.game.state;
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
    },
    drawItems: () => {
        const state = window.game.state;
        Object.keys(state.currentAnimations.items).forEach(key => {
            const currentItem = state.currentAnimations.items[key];
            if (state.transition){
                game.draw.initializeItem(currentItem, key)
            } else {
                if(currentItem.animate){
                    game.draw.iCtx.clearRect(currentItem.x + state.map.currentMap.display.minX, currentItem.y + state.map.currentMap.display.miny, currentItem.item.metaData.unitWidth, currentItem.item.metaData.unitHeight)
                    game.draw.drawSingleItem(currentItem.image, currentItem)
                }  
            } 
        });
    },
    initializeItem: (stateItem, key) => {
        stateItem.id = key;
        const item = new Image()
        item.onload = function() {
            game.draw.drawSingleItem(item, stateItem, true);
        }
        item.src = stateItem.item.src
        stateItem.image = item;
        stateItem.status = 0; 
    },
    drawSingleItem: (image ,{item: itemDetails, start, x, y, animate, status, id} = element, init = false, currentMap = state.map.currentMap) => {
        const animations = itemDetails.animations;
        const currentFrame = !animate ? start: status;``
        const displayX = x + currentMap.display.minX;
        const displayY = y + currentMap.display.minY;
        game.draw.iCtx.beginPath();
        if(init) {
            state.bounds.push([displayX, displayX + (animations.open[currentFrame][2]), displayY, displayY + animations.open[currentFrame][3], id])
        };
        game.draw.iCtx.drawImage(image, animations.open[currentFrame][0], animations.open[currentFrame][1], animations.open[currentFrame][2], animations.open[currentFrame][3], displayX, displayY, animations.open[currentFrame][2], animations.open[currentFrame][3] );
        game.draw.iCtx.closePath();
    },
    initCanvases: () => {
        game.draw.bgCanvas = document.getElementById('background-canvas');
        game.draw.bgCanvas.width = game.draw.bgCanvas.clientWidth;
        game.draw.bgCanvas.height = 900;
        game.draw.bgCtx = game.draw.bgCanvas.getContext('2d');
        game.draw.pCanvas = document.getElementById('player-canvas');
        game.draw.pCanvas.width =  game.draw.bgCanvas.width;
        game.draw.pCanvas.height = game.draw.bgCanvas.height;
        game.draw.pCtx = game.draw.pCanvas.getContext('2d');
        game.draw.iCanvas = document.getElementById('item-canvas');
        game.draw.iCanvas.width =  game.draw.bgCanvas.width;
        game.draw.iCanvas.height = game.draw.bgCanvas.height;
        game.draw.iCtx = game.draw.iCanvas.getContext('2d');
    },
    scrollMap: () => {}
}

