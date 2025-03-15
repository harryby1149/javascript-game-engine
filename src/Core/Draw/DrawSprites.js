import {state} from "../State"

"use strict";
export const drawSprites = {
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
        if(!state.scene.display){
            return;
        }
        Object.keys(state.currentAnimations.items).forEach(key => {
            const currentItem = state.currentAnimations.items[key];
            if (init === true ){
                this.initializeItem(currentItem, key)
            } else {
                if(currentItem.animate || cState.scrollMap){
                    state.iCtx.clearRect(currentItem.previousX, currentItem.previousY, currentItem.item.metaData.unitWidth, currentItem.item.metaData.unitHeight)
                    this.drawSingleItem(currentItem.image, currentItem)
                }  
            } 
        });
    },
    initializeItem: (stateItem, key) => {
        stateItem.id = key;
        const item = new Image()
        stateItem.activeAnimation = stateItem.start
        item.onload = function() {
            this.drawSingleItem(item, stateItem);
        }
        
        item.src = stateItem.item.src
        stateItem.image = item;
        stateItem.status = 0; 
    },
    drawSingleItem: (image ,element, currentMap = state.scene) => {
        const {item: itemDetails, x, y, status, id, activeAnimation} = element;
        const animation = itemDetails.animations[activeAnimation][status];
        const tempDisplayX = (x - currentMap.display.mapX)
        + currentMap.display.minX;
        const tempDisplayY = (y - currentMap.display.mapY)+ currentMap.display.minY;
        const {sx, sy, sw, sh, displayX, displayY} = this.calcSpriteDisplayProperties(tempDisplayX, tempDisplayY, currentMap, animation);
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