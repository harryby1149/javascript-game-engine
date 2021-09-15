window.game.state.gameLoop = () => {
    const state = window.game.state;
    state.frameCount++
    window.game[state.mode].calcChanges();
    window.game.draw.drawItemLayer();
    if(window.game.scrollMap){
        game.draw.drawMapLayer();
    }
    if(window.game.animatePlayer){
        game.draw.drawPlayerLayer();
    }
    if (state.frameCount === 60) {
        state.frameCount = 0;
    }
    window.game.state.animationFrame = requestAnimationFrame(window.game.state.gameLoop);
}
