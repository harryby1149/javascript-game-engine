game.draw = {
    scale: 1,
    drawPlayerLayer: () => {
        const state = window.game.state; 
        //if (frameCount % 5 === 0){
       game.draw.pCtx.clearRect(state.previousPX, state.previousPY, state.scaledPW + 5, state.scaledPH + 5);   
       game.draw.pCtx.beginPath();
       game.draw.pCtx.rect(state.pX, state.pY , state.scaledPW, state.scaledPH);
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
        const state = window.game.state; 
        const currentMap = state.map.currentMap;
        const clearDimensions = {
            minX,
            minY
        } = state.map.previousMap? state.map.previousMap.display : currentMap.display
        game.draw.bgCtx.clearRect(clearDimensions.minX, clearDimensions.minY, state.viewPort.width, state.viewPort.height)
        game.draw.bgCtx.beginPath();
        game.draw.bgCtx.drawImage(state.map.image, currentMap.display.mapX, currentMap.display.mapY, state.viewPort.width, state.viewPort.height,  currentMap.display.minX , currentMap.display.minY, state.viewPort.width, state.viewPort.height);
        game.draw.bgCtx.closePath();
        window.game.scrollMap = false;
    },
    calcItemAnimations: () => {
        const state = window.game.state;
        Object.keys(state.currentAnimations.items).forEach(itemKey => {
            const mapItem = state.currentAnimations.items[itemKey];
            // todo: implement proper animation lookup logic, maybe in utils
            let activeAnimation = mapItem.item.type == 'chest'? 'open' : 'placeholder';
            if( mapItem.animate && mapItem.status + 1 < mapItem.item.animations[activeAnimation].length  
            ){
                mapItem.activeAnimation = activeAnimation;
                mapItem.status++;
            }
            if(mapItem.animate && mapItem.status == mapItem.item.animations.open.length -1){
                mapItem.animate = false;
            }
        })
    },
    drawItems: (init = false) => {
        const state = window.game.state;
        if(!state.map.currentMap.display){
            return;
        }
        Object.keys(state.currentAnimations.items).forEach(key => {
            const currentItem = state.currentAnimations.items[key];
            if (init === true ){
                game.draw.initializeItem(currentItem, key)
            } else {
                if(currentItem.animate || window.game.scrollMap){
                    game.draw.iCtx.clearRect(currentItem.previousX, currentItem.previousY, currentItem.item.metaData.unitWidth, currentItem.item.metaData.unitHeight)
                    game.draw.drawSingleItem(currentItem.image, currentItem)
                }  
            } 
        });
    },
    initializeItem: (stateItem, key) => {
        stateItem.id = key;
        const item = new Image()
        stateItem.activeAnimation = stateItem.start
        item.onload = function() {
            game.draw.drawSingleItem(item, stateItem);
        }
        
        item.src = stateItem.item.src
        stateItem.image = item;
        stateItem.status = 0; 
    },
    drawSingleItem: (image ,element, currentMap = window.game.state.map.currentMap) => {
        const {item: itemDetails, x, y, status, id, activeAnimation} = element;
        const animation = itemDetails.animations[activeAnimation][status];
        const tempDisplayX = (x - currentMap.display.mapX)
         + currentMap.display.minX;
        const tempDisplayY = (y - currentMap.display.mapY)+ currentMap.display.minY;
        const {sx, sy, sw, sh, displayX, displayY} = game.draw.calcSpriteDisplayProperties(tempDisplayX, tempDisplayY, currentMap, animation);
        window.game.state.bounds[id] = ([displayX, displayX + (animation[2]), displayY, displayY + animation[3], id])
        element.previousX = displayX;
        element.previousY = displayY;
        game.draw.iCtx.beginPath();
        game.draw.iCtx.drawImage(image, sx, sy, sw, sh, displayX, displayY, sw, sh);
        game.draw.iCtx.closePath();
    },
    calcSpriteDisplayProperties: (tempDisplayX, tempDisplayY, currentMap, sprite) => {
        const dispProps = {sx: sprite[0], sy: sprite[1],sw: sprite[2] , sh: sprite[3], displayX: tempDisplayX, displayY: tempDisplayY}
            if(tempDisplayX < currentMap.display.minX){
                const delta = currentMap.display.minX - tempDisplayX;
                if (dispProps.sx + delta > dispProps.sw) {
                    dispProps.sw = 0 
                } else {
                    dispProps.displayX += delta;
                    dispProps.sx += delta;
                    dispProps.sw -= delta;
                } 
            }
            if(tempDisplayX + dispProps.sw  >  state.viewPort.width + currentMap.display.minX ){
                const delta = (tempDisplayX + dispProps.sw  ) - (state.viewPort.width + currentMap.display.minX);
                if(dispProps.sw  > delta) {
                    dispProps.sw -= delta;
                } else {
                    dispProps.sw = 0;
                }
            }
            return dispProps;
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
    }
}

