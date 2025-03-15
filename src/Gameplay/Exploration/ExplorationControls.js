import {inputs} from './ExplorationInput';
import {state} from '../../Core/State';
import { scenes } from '../../Scenes';

export const exploration = {
    id: "exploration",
    inputs: inputs
};
let pX, dPX, pY, dPY, scene, rightPressed, leftPressed, upPressed, downPressed, interactPressed, scaledPW, scaledPH, bounds, currentAnimations, transition, callOnce = false;

exploration.calcChanges = () => {
    updateCollisionVals()
    if(!transition) {
        state.animatePlayer = false;
        state.previousPX = state.pX;
        state.previousPY = state.pY;
        const currentBounds = []; 
        Object.keys(bounds).forEach(key => {currentBounds.push(bounds[key])});
        if (canMoveRight(currentBounds)) {
            if(canScrollMap('right')){
                state.scrollMap = true;
                state.scene.display.mapX += dPX;
            }else {
                state.animatePlayer = true;
                state.pX += dPX
            } 
        }

        if (canMoveUp(currentBounds)) {
            if(canScrollMap('up')){
                state.scrollMap = true;
                state.scene.display.mapY -= dPY;
            }else {
                state.animatePlayer = true;
                state.pY -= dPY
            } 
        }

        if (canMoveLeft(currentBounds)) {
            if(canScrollMap('left')){
                state.scrollMap = true;
                state.scene.display.mapX -= dPX;
            }else {
                state.animatePlayer = true;
                state.pX -= dPX
            }  
        }

        if (canMoveDown(currentBounds)) {
            if(canScrollMap('down')){
                state.scrollMap = true;
                state.scene.display.mapY += dPY;
            }else {
                state.animatePlayer = true;
                state.pY += dPY
            } 
        }

        if (interactPressed){
            interactWithItem();
        }
        checkForMapTransition();
 }
};

const updateCollisionVals = () => {
    scene = state.scene;
    ({
        pX,
        dPX,
        pY,
        dPY,
        rightPressed,
        leftPressed,
        upPressed,
        downPressed,
        scaledPW,
        scaledPH,
        bounds,
        interactPressed,
        currentAnimations,
        transition
    } = state);
}

const interactWithItem = () => {
    if (callOnce){
        return ;
    }
    callOnce = true;
    if( state.isAdjacent ){
          currentAnimations.items[state.scene.mapComponents[state.isAdjacent].id].animate = true  ;
          callOnce = false;
    }
};

function canMoveRight(boundaries ) {
   const rightDiff = pX + dPX  
   let isRight =  rightPressed && rightDiff < scene.display.maxX - scaledPW ? true : false;
   if (isRight) {
       boundaries.forEach((boundArray, index )=> {
          if ( (rightDiff > boundArray[0] - scaledPW && rightDiff < boundArray[1]) && (pY > boundArray[2] - scaledPH  && pY < boundArray[3]) ) {
            isRight = false;
            state.isAdjacent = boundArray[4]
          }
       })
   }
   return isRight
}

function canMoveLeft(boundaries) {
    const leftDiff = pX - dPX
    let isLeft =  leftPressed && (leftDiff > scene.display.minX || leftDiff >  scene.display.minX - scene.display.mapX)? true : false;
    if (isLeft) {
        boundaries.forEach((boundArray, index )=> {
           if ( (leftDiff > boundArray[0] && leftDiff < boundArray[1]) && (pY > boundArray[2] - scaledPH  && pY < boundArray[3]) ) {
             isLeft = false;
             state.isAdjacent = boundArray[4];
           }
        } )
    }
    return isLeft
 }
 
 function canMoveUp(boundaries) {
    const upDiff = pY - dPY; 
    let isUp = upPressed && upDiff > scene.display.minY ? true : false;
    if (isUp) {
        boundaries.forEach((boundArray, index )=> {
           if ( (pX > boundArray[0] - scaledPW && pX < boundArray[1]) && (upDiff > boundArray[2] - scaledPH  && upDiff < boundArray[3]) ) {
             isUp = false;
             state.isAdjacent = boundArray[4];
           }
        } )
    }
    return isUp
 }

 function canMoveDown(boundaries) {
    const downDiff = pY + dPY; 
    let isDown = downPressed && downDiff < scene.display.maxY - scaledPH ? true : false;
    if (isDown) {
        boundaries.forEach((boundArray, index ) => {
           if ( (pX > boundArray[0] - scaledPW && pX < boundArray[1]) && (downDiff > boundArray[2] - scaledPH  && downDiff < boundArray[3]) ) {
             isDown = false;
           }
        } )
    }
    return isDown
 }

 export function canScrollMap(direction) {
     switch (direction) {
        case 'up':
           return pY - dPY < scene.display.mapY;
        case 'down':
            return pY + dPY > scene.display.mapY && scene.mapDimensions.height > (scene.display.mapY + state.viewPort.height);
        case 'left':
            return pX - dPX < scene.display.mapX + scene.display.minX; 
        case 'right':
            console.log(state.viewPort.width);
            console.log(scene.display.mapX + state.viewPort.width);
            console.log(scene.mapDimensions.width);
            return pX + dPX > scene.display.mapX && scene.display.mapX + state.viewPort.width < scene.mapDimensions.width;
     }

 }

 function checkForMapTransition(){
    if(!scene.transitionPoints){
        return;
    }
     let transitionPoints = scene.transitionPoints;
     transitionPoints.forEach(point => {
         if(touchingTransitionPoint(point)){
            cancelAnimationFrame(state.animationFrame);
            state.transition = true;
            state.currentTransition = point;
            state.scene.previousScene = state.scene.scene;
            state.scene.scene = scenes[point.transitionTo];
            console.log(state.scene.scene)
            state.scene.image.src = state.scene.scene.url;
            updateCollisionVals();
         }
     })
 }

 function checkForCombatTransition() {
     
 }

 function touchingTransitionPoint(point){
    return pX + (state.scaledPW/2) > point.x + scene.display.minX && pX + (state.scaledPW/2) < point.x + scene.display.minX + 100 && pY + (state.scaledPH/2) < point.y + scene.display.minY && pY + (state.scaledPH/2) > point.y + scene.display.minY - 100;
 }

