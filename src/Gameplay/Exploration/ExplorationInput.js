import {state} from '../../Core/State'

export const inputs = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    interactPressed: false,
    setInput: function() {
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
    },
    clearInput: function() {
        document.removeEventListener("keydown", keyDownHandler, false);
        document.removeEventListener("keyup", keyUpHandler, false);
    }
}
    
function keyDownHandler(e) {
    switch (e.key) {
        case 'Right':
        case 'ArrowRight':
        case 'd':
            state.rightPressed = true;
            break;
        case 'Left':
        case 'ArrowLeft':
        case 'a':
            state.leftPressed = true;
            break;
        case 'Up':
        case 'ArrowUp':
        case 'w':
            state.upPressed = true;
            break;
        case 'Down':
        case 'ArrowDown':
        case 's':
            state.downPressed = true;
            break;
        case 'e':
        case ' ':
            state.interactPressed = true;
            break;
    }
}


    
    

function keyUpHandler(e) {
    switch (e.key) {
        case 'Right':
        case 'ArrowRight':
        case 'd':
            state.rightPressed = false;
            break;
        case 'Left':
        case 'ArrowLeft':
        case 'a':
            state.leftPressed = false;
            break;
        case 'Up':
        case 'ArrowUp':
        case 'w':
            state.upPressed = false;
            break;
        case 'Down':
        case 'ArrowDown':
        case 's':
            state.downPressed = false;
            break;
        case 'e':
        case ' ':
            state.interactPressed = false;
            break;
        }
    }