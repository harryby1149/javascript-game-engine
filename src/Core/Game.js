import {state} from "./State";
import {draw} from "./Draw/Draw";


export const gameLoop = () => {
    state.frameCount++
    state.scene.mode.calcChanges();
    // draw.drawItemLayer();
    if(state.scrollMap){
        draw.drawMapLayer();
    }
    if(state.animatePlayer){
        draw.drawPlayerLayer();
    }
    if (state.frameCount === 60) {
        state.frameCount = 0;
    }
    state.animationFrame = requestAnimationFrame(gameLoop);
}
