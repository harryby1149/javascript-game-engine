let state = window.game.state;
let pX, dPX, pY, dPY, currentMap, rightPressed, leftPressed, upPressed, downPressed, scaledPW, scaledPH, bounds;


window.game.utils.updateCollisionVals = () => {
    state = window.game.state;
    ({
        pX,
        dPX,
        pY,
        dPY,
        currentMap,
        rightPressed,
        leftPressed,
        upPressed,
        downPressed,
        scaledPW,
        scaledPH,
        bounds
    } = state);
}
window.game.utils.calcChanges = () => {
    if (canMoveRight(bounds)) {
        state.pX += dPX
    }

    if (canMoveUp(bounds)) {
        state.pY -= dPY
    }

    if (canMoveLeft(bounds)) {
        state.pX -= dPX 
    }

    if (canMoveDown(bounds) ) {
        state.pY += dPY
    }
};

function canMoveRight(boundaries ) {
   const rightDiff = pX + dPX  
   let isRight =  rightPressed && rightDiff < currentMap.display.maxX - scaledPW ? true : false;
   if (isRight) {
       boundaries.forEach(boundArray => {
          if ( (rightDiff > boundArray[0] - scaledPW && rightDiff < boundArray[1]) && (pY > boundArray[2] - scaledPH  && pY < boundArray[3]) ) {
            isRight = false
          }
       } )
   }
   return isRight
}

function canMoveLeft(boundaries) {
    const leftDiff = pX - dPX 
    let isLeft =  leftPressed && leftDiff > currentMap.display.minX ? true : false;
    if (isLeft) {
        boundaries.forEach(boundArray => {
           if ( (leftDiff > boundArray[0] && leftDiff < boundArray[1]) && (pY > boundArray[2] - scaledPH  && pY < boundArray[3]) ) {
             isLeft = false
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
             isUp = false
           }
        } )
    }
    return isUp
 }

 function canMoveDown(boundaries) {
    const downDiff = pY + dPY; 
    let isDown = downPressed && downDiff < currentMap.display.maxY - scaledPH ? true : false;
    if (isDown) {
        boundaries.forEach(boundArray => {
           if ( (pX > boundArray[0] - scaledPW && pX < boundArray[1]) && (downDiff > boundArray[2] - scaledPH  && downDiff < boundArray[3]) ) {
             isDown = false
           }
        } )
    }
    return isDown
 }
