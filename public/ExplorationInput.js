window.game.exploration.inputs = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    interactPressed: false
}

window.game.exploration.inputs.setInput = function() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    
    function keyDownHandler(e) {
        switch (e.key) {
            case 'Right':
            case 'ArrowRight':
            case 'd':
                window.game.state.rightPressed = true;
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                window.game.state.leftPressed = true;
                break;
            case 'Up':
            case 'ArrowUp':
            case 'w':
                window.game.state.upPressed = true;
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                window.game.state.downPressed = true;
                break;
            case 'e':
            case ' ':
                window.game.state.interactPressed = true;
                break;
        }
    }

    function keyUpHandler(e) {
        switch (e.key) {
            case 'Right':
            case 'ArrowRight':
            case 'd':
                window.game.state.rightPressed = false;
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                window.game.state.leftPressed = false;
                break;
            case 'Up':
            case 'ArrowUp':
            case 'w':
                window.game.state.upPressed = false;
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                window.game.state.downPressed = false;
                break;
            case 'e':
            case ' ':
                window.game.state.interactPressed = false;
                break;
        }
    }
}
    