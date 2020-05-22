window.game.state = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    interactPressed: false
}
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    
    function keyDownHandler(e) {
        switch (e.key) {
            case 'Right':
            case 'ArrowRight':
                window.game.state.rightPressed = true;
                break;
            case 'Left':
            case 'ArrowLeft':
                window.game.state.leftPressed = true;
                break;
            case 'Up':
            case 'ArrowUp':
                window.game.state.upPressed = true;
                break;
            case 'Down':
            case 'ArrowDown':
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
                window.game.state.rightPressed = false;
                break;
            case 'Left':
            case 'ArrowLeft':
                window.game.state.leftPressed = false;
                break;
            case 'Up':
            case 'ArrowUp':
                window.game.state.upPressed = false;
                break;
            case 'Down':
            case 'ArrowDown':
                window.game.state.downPressed = false;
                break;
            case 'e':
            case ' ':
                window.game.state.interactPressed = false;
                break;
        }
    }


    