import {state} from "./State";

export const draw = {
    scale: 1,
    drawPlayerLayer: () => {
        state.pCtx.clearRect(state.previousPX -5, state.previousPY -5, state.scaledPW + 10, state.scaledPH + 10);   
        state.pCtx.beginPath();
        state.pCtx.rect(state.pX, state.pY , state.scaledPW, state.scaledPH);
        state.pCtx.fillStyle = "red";
        state.pCtx.fill();
        state.pCtx.closePath();
    },
    drawItemLayer: () => {
        draw.calcItemAnimations();
        draw.drawItems();  
    },
    drawMapLayer: () => {
        console.log("in the draw map layer fuction")
        const currentMap = state.map.currentMap;
        const previousMap = state.map.previousMap;
        const clearDimensions = {
            minX: false,
            minY: false
        } 
        console.log('setting the clearDimensions')
        if(previousMap) {
            console.log('setting clear dimensions from previous map');
            clearDimensions.minX = previousMap.display.minX;
            clearDimensions.minY = previousMap.display.minY;
        } else {
            console.log('setting clear dimensions from currentMap')
            clearDimensions.minX = currentMap.display.minX;
            clearDimensions.minY = currentMap.display.minY;
        }
        state.bgCtx.clearRect(clearDimensions.minX, clearDimensions.minY, state.viewPort.width, state.viewPort.height)
        state.bgCtx.beginPath();
        state.bgCtx.drawImage(state.map.image, currentMap.display.mapX, currentMap.display.mapY, state.viewPort.width, state.viewPort.height,  currentMap.display.minX , currentMap.display.minY, state.viewPort.width, state.viewPort.height);
        state.bgCtx.closePath();
        state.scrollMap = false;
    },
    calcItemAnimations: () => {
        const cState = state;
        Object.keys(cState.currentAnimations.items).forEach(itemKey => {
            const mapItem = cState.currentAnimations.items[itemKey];
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
        const cState = state;
        if(!state.map.currentMap.display){
            return;
        }
        Object.keys(state.currentAnimations.items).forEach(key => {
            const currentItem = state.currentAnimations.items[key];
            if (init === true ){
                draw.initializeItem(currentItem, key)
            } else {
                if(currentItem.animate || cState.scrollMap){
                    state.iCtx.clearRect(currentItem.previousX, currentItem.previousY, currentItem.item.metaData.unitWidth, currentItem.item.metaData.unitHeight)
                    draw.drawSingleItem(currentItem.image, currentItem)
                }  
            } 
        });
    },
    initializeItem: (stateItem, key) => {
        stateItem.id = key;
        const item = new Image()
        stateItem.activeAnimation = stateItem.start
        item.onload = function() {
            draw.drawSingleItem(item, stateItem);
        }
        
        item.src = stateItem.item.src
        stateItem.image = item;
        stateItem.status = 0; 
    },
    drawSingleItem: (image ,element, currentMap = state.map.currentMap) => {
        const {item: itemDetails, x, y, status, id, activeAnimation} = element;
        const animation = itemDetails.animations[activeAnimation][status];
        const tempDisplayX = (x - currentMap.display.mapX)
         + currentMap.display.minX;
        const tempDisplayY = (y - currentMap.display.mapY)+ currentMap.display.minY;
        const {sx, sy, sw, sh, displayX, displayY} = draw.calcSpriteDisplayProperties(tempDisplayX, tempDisplayY, currentMap, animation);
        state.bounds[id] = ([displayX, displayX + (animation[2]), displayY, displayY + animation[3], id])
        element.previousX = displayX;
        element.previousY = displayY;
        state.iCtx.beginPath();
        state.iCtx.drawImage(image, sx, sy, sw, sh, displayX, displayY, sw, sh);
        state.iCtx.closePath();
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
    }
}

