let state = window.game.state;
window.game.exploration = {};
let pX, dPX, pY, dPY, currentMap, rightPressed, leftPressed, upPressed, downPressed, interactPressed, scaledPW, scaledPH, bounds, currentAnimations, transition, callOnce = false;

window.game.exploration.calcChanges = () => {
    updateCollisionVals()
    if(!transition) {
        state.previousPX = state.pX;
        state.previousPY = state.pY
        if (canMoveRight(bounds)) {
            state.pX += dPX;
        }

        if (canMoveUp(bounds)) {
            state.pY -= dPY
        }

        if (canMoveLeft(bounds)) {
            state.pX -= dPX 
        }

        if (canMoveDown(bounds)) {
            state.pY += dPY
        }

        if (interactPressed){
            interactWithItem();
        }
        checkForMapTransition();
 }
};

const updateCollisionVals = () => {
    state = window.game.state;
    currentMap = state.map.currentMap;
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
          currentAnimations.items[state.map.currentMap.mapComponents[state.isAdjacent].id].animate = true  ;
          callOnce = false;
    }
};

function canMoveRight(boundaries ) {
   const rightDiff = pX + dPX  
   let isRight =  rightPressed && rightDiff < currentMap.display.maxX - scaledPW ? true : false;
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
    let isLeft =  leftPressed && leftDiff > currentMap.display.minX ? true : false;
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
    let isUp = upPressed && upDiff > currentMap.display.minY ? true : false;
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
    let isDown = downPressed && downDiff < currentMap.display.maxY - scaledPH ? true : false;
    if (isDown) {
        boundaries.forEach((boundArray, index ) => {
           if ( (pX > boundArray[0] - scaledPW && pX < boundArray[1]) && (downDiff > boundArray[2] - scaledPH  && downDiff < boundArray[3]) ) {
             isDown = false;
           }
        } )
    }
    return isDown
 }

 function checkForMapTransition(){
     let transitionPoints = currentMap.transitionPoints;
     transitionPoints.forEach(point => {
         if(touchingTransitionPoint(point)){
            cancelAnimationFrame(state.animationFrame);
            state.transition = true;
            state.currentTransition = point;
            state.map.previousMap = state.map.currentMap;
            state.map.currentMap = window.game.maps[point.transitionTo];
            state.map.image.src = state.map.currentMap.url;
            updateCollisionVals();
         }
     })
 }

 function touchingTransitionPoint(point){
    return state.pX + (state.scaledPW/2) > point.x + currentMap.display.minX && state.pX + (state.scaledPW/2) < point.x + currentMap.display.minX + 100 && state.pY + (state.scaledPH/2) < point.y + currentMap.display.minY && state.pY + (state.scaledPH/2) > point.y + currentMap.display.minY - 100;
 }